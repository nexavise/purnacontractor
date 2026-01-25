import { useParams, Navigate } from "react-router-dom";
import { useState, useEffect, lazy, Suspense } from "react";
import { FaCheckCircle, FaCalendarAlt } from "react-icons/fa";
import { IoTimeOutline } from "react-icons/io5";
import Turnstile from "react-turnstile";

import servicesData from "../components/data/servicesData";
import "../styles/Dservice.css";

import AnimatedServiceImage from "../components/services/AnimatedServiceImage";

import { LazyMotion, domAnimation, m, useReducedMotion } from "framer-motion";

const EnquiryModal = lazy(() => import("../components/home/EnquiryModal"));

export default function DifferentService() {
  /* ---------------- HOOKS FIRST (ALWAYS) ---------------- */
  const { serviceSlug } = useParams();
  const shouldReduceMotion = useReducedMotion();

  /* ---------------- STATES ---------------- */
  const [open, setOpen] = useState(false);
  const [bgReady, setBgReady] = useState(false);

  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const [token, setToken] = useState(null);
  const [tsResetKey, setTsResetKey] = useState(0);

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

  // Background image preload (for smooth bg)
  useEffect(() => {
    if (!service?.pageBg) return;

    const img = new Image();
    img.src = service.pageBg;
    img.onload = () => setBgReady(true);
  }, [service]);

  // Reset success state after 5 seconds
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

    if (!token) {
      alert("Please verify you are human.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/visit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          phone: formData.phone,
          service: service.title,
          date: formData.date,
          description: formData.details,
          turnstileToken: token, // ✅ added
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.message || "Failed to send visit request");
      }

      if (data.success) {
        setSuccess(true);

        setToken(null);
        setTsResetKey((k) => k + 1);
      }
    } catch (err) {
      console.error(err);

      setToken(null);
      setTsResetKey((k) => k + 1);
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
                {service.cards.map((card, i) => (
                  <m.div
                    key={i}
                    className="ds-card"
                    variants={fadeUp}
                    whileHover={shouldReduceMotion ? {} : { y: -6 }}
                  >
                    {/* ✅ Animated image loader */}
                    <AnimatedServiceImage src={card.image} alt={card.title} />

                    <div className="ds-card-overlay">
                      <h3>{card.title}</h3>
                      <p>{card.desc}</p>
                    </div>
                  </m.div>
                ))}
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
                      value={formData.firstName}
                      onChange={handleChange}
                    />
                    <input
                      name="lastName"
                      placeholder="Last Name"
                      required
                      value={formData.lastName}
                      onChange={handleChange}
                    />
                  </div>

                  <input
                    name="email"
                    type="email"
                    placeholder="Email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                  />

                  <input
                    name="phone"
                    placeholder="Phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                  />

                  <input
                    name="date"
                    type="date"
                    min={getTomorrowDate()}
                    required
                    value={formData.date}
                    onChange={handleChange}
                  />

                  <textarea
                    name="details"
                    placeholder="Project Details"
                    value={formData.details}
                    onChange={handleChange}
                  />
                  <Turnstile
                    key={tsResetKey}
                    sitekey={import.meta.env.VITE_TURNSTILE_SITE_KEY}
                    onVerify={(t) => setToken(t)}
                    onExpire={() => setToken(null)}
                    onError={() => {
                      setToken(null);
                      alert("Turnstile failed to load. Please refresh.");
                    }}
                  />
                  <m.button
                    whileTap={{ scale: 0.96 }}
                    disabled={loading || !token}
                  >
                    {loading ? (
                      "Sending..."
                    ) : !token ? (
                      <>
                        Wait a second... <IoTimeOutline />
                      </>
                    ) : (
                      "Request Visit"
                    )}
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
