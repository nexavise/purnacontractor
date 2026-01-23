import { useParams, Navigate } from "react-router-dom";
import { useState, useEffect, lazy, Suspense } from "react";
import { FaCheckCircle, FaCalendarAlt } from "react-icons/fa";
import servicesData from "../components/data/servicesData";
import "../styles/Dservice.css";

import { LazyMotion, domAnimation, m, useReducedMotion } from "framer-motion";

const EnquiryModal = lazy(() => import("../components/home/EnquiryModal"));

export default function DifferentService() {
  /* ---------------- HOOKS FIRST (ALWAYS) ---------------- */
  const { serviceSlug } = useParams();
  const shouldReduceMotion = useReducedMotion();

  const [open, setOpen] = useState(false);
  const [bgReady, setBgReady] = useState(false);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadedImages, setLoadedImages] = useState({});

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    date: "",
    details: "",
  });

  /* ---------------- DATA ---------------- */
  const service = servicesData[serviceSlug];

  /* ---------------- EFFECTS ---------------- */
  useEffect(() => {
    if (!service) return;

    service.cards.forEach((card, index) => {
      const img = new Image();
      img.src = card.image;

      const markLoaded = () =>
        setLoadedImages((prev) => ({ ...prev, [index]: true }));

      if (img.decode) {
        img.decode().then(markLoaded).catch(markLoaded);
      } else {
        img.onload = markLoaded;
      }
    });
  }, [service]);

  useEffect(() => {
  if (!success) return;

  const timer = setTimeout(() => {
    setSuccess(false);
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      date: "",
      details: "",
    });
  }, 5000);

  return () => clearTimeout(timer);
}, [success]);

  /* ---------------- EARLY RETURN (SAFE) ---------------- */
  if (!service) return <Navigate to="/" />;

  /* ---------------- HELPERS ---------------- */
  const getTomorrowDate = () => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split("T")[0];
  };

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/visit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          phone: formData.phone,
          service: service.title,
          date: formData.date,
          description: formData.details,
        }),
      });

      const data = await res.json();
      if (data.success) setSuccess(true);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- MOTION VARIANTS ---------------- */
  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.45, ease: "easeOut" },
    },
  };

  const stagger = {
    visible: { transition: { staggerChildren: 0.08 } },
  };

  const slideInRight = {
    hidden: { opacity: 0, x: 40 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.45, ease: "easeOut" },
    },
  };

  /* ---------------- RENDER ---------------- */
  return (
    <LazyMotion features={domAnimation}>
      <m.section
        className={`ds-page ${bgReady ? "bg-loaded" : ""}`}
        style={{ "--bg-url": `url(${service.pageBg})` }}
      >
        <button className="enquiry-btn" onClick={() => setOpen(true)}>
          For Enquiry
        </button>

        {open && (
          <Suspense fallback={null}>
            <EnquiryModal onClose={() => setOpen(false)} />
          </Suspense>
        )}

        <div className="ds-overlay">
          <m.div
            className="ds-grid"
            variants={stagger}
            initial="hidden"
            animate="visible"
          >
            {/* LEFT */}
            <div>
              <m.div className="ds-hero" variants={fadeUp}>
                <h1>{service.title}</h1>
                <p>{service.desc}</p>
              </m.div>

              <m.div className="ds-cards" variants={stagger}>
                {service.cards.map((card, i) => {
                  const isLoaded = loadedImages[i];

                  return (
                    <m.div
                      key={i}
                      className={`ds-card ${!isLoaded ? "is-loading" : ""}`}
                      variants={fadeUp}
                      whileHover={shouldReduceMotion ? {} : { y: -6 }}
                    >
                      {!isLoaded && <div className="ds-skeleton" />}

                      <div
                        className="ds-card-bg"
                        style={{
                          backgroundImage: loadedImages[i]
                            ? `url(${card.image})`
                            : "none",
                          opacity: loadedImages[i] ? 1 : 0,
                        }}
                      />

                      {!loadedImages[i] && <div className="ds-skeleton" />}

                      {/* <img
                        src={card.image}
                        alt=""
                        loading="lazy"
                        decoding="async"
                        style={{ display: "none" }}
                        onLoad={() =>
                          setLoadedImages((prev) => ({
                            ...prev,
                            [i]: true,
                          }))
                        }
                      /> */}

                      <div className="ds-card-overlay">
                        <h3>{card.title}</h3>
                        <p>{card.desc}</p>
                      </div>
                    </m.div>
                  );
                })}
              </m.div>
            </div>

            {/* RIGHT */}
            <m.div
              className={`ds-form ${success ? "ds-success" : ""}`}
              variants={slideInRight}
              initial="hidden"
              animate="visible"
            >
              <h2 className={`ds-form-title ${success ? "success-mode" : ""}`}>
                {success ? (
                  <div className="success-title">
                    <FaCheckCircle className="ds-icon success" />
                    <span>Request Sent Successfully</span>
                    <small>We'll contact you shortly</small>
                  </div>
                ) : (
                  <>
                    <FaCalendarAlt className="ds-icon" />
                    Book a Site Visit
                  </>
                )}
              </h2>

              {!success && (
                <form onSubmit={handleSubmit}>
                  <div className="ds-row">
                    <input
                      name="firstName"
                      placeholder="First Name"
                      required
                      onChange={handleChange}
                    />
                    <input
                      name="lastName"
                      placeholder="Last Name"
                      required
                      onChange={handleChange}
                    />
                  </div>

                  <input
                    name="email"
                    type="email"
                    placeholder="Email"
                    required
                    onChange={handleChange}
                  />
                  <input
                    name="phone"
                    placeholder="Phone"
                    required
                    onChange={handleChange}
                  />
                  <input
                    name="date"
                    type="date"
                    min={getTomorrowDate()}
                    required
                    onChange={handleChange}
                  />
                  <textarea
                    name="details"
                    placeholder="Project Details"
                    onChange={handleChange}
                  />

                  <m.button whileTap={{ scale: 0.96 }} disabled={loading}>
                    {loading ? "Sending..." : "Request Visit"}
                  </m.button>
                </form>
              )}
            </m.div>
          </m.div>
        </div>
      </m.section>
    </LazyMotion>
  );
}
