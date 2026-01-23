import "../styles/Quote.css";
import {
  FaFileAlt,
  FaCheckCircle,
  FaRocket,
  FaCalculator,
} from "react-icons/fa";
import SEO from "../components/SEO";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import EnquiryModal from "../components/home/EnquiryModal";

/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";

/* ================= ANIMATION VARIANTS ================= */
const fade = ({
  direction = "up", // "up" | "down" | "left" | "right"
  distance = 40,
  duration = 0.7,
  delay = 0,
} = {}) => {
  const axis = direction === "up" || direction === "down" ? "y" : "x";

  const value =
    direction === "up" || direction === "left" ? distance : -distance;

  return {
    hidden: {
      opacity: 0,
      [axis]: value,
    },
    visible: {
      opacity: 1,
      [axis]: 0,
      transition: {
        duration,
        delay,
        ease: "easeOut",
      },
    },
  };
};

const formStagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const stagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.2 },
  },
};

/* ================= COMPONENT ================= */
export default function Quote() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    projectType: "",
    serviceType: "",
    propertyType: "",
    squareFootage: "",
    rooms: "",
    timeframe: "",
    budget: "",
    message: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const fullNameRef = useRef(null);
  const phoneRef = useRef(null);
  const emailRef = useRef(null);

  /* ================= SCROLL TO TOP ON SUCCESS ================= */
  useEffect(() => {
    if (success) {
      // wait for DOM to update before scrolling
      requestAnimationFrame(() => {
        window.scrollTo(0, 0);
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
      });
    }
  }, [success]);

  /* ================= HELPERS ================= */
  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Phone: digits only, max 10
    if (name === "phone") {
      if (!/^\d*$/.test(value)) return;
      if (value.length > 10) return;
    }

    setError("");
    setFormData({ ...formData, [name]: value });
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.fullName.trim()) {
      setError("Please enter your full name.");
      fullNameRef.current.focus();
      return;
    }

    if (formData.phone.length !== 10) {
      setError("Phone number must be exactly 10 digits.");
      phoneRef.current.focus();
      return;
    }

    if (formData.email && !isValidEmail(formData.email)) {
      setError("Please enter a valid email address.");
      emailRef.current.focus();
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed");

      setSuccess(true);

      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (err) {
      setError("Failed to send quote request");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SEO
        title="Get a Quote | Purna Contractor"
        description="Request a free construction or renovation quote."
      />

      <section className="quote-page">
        <button className="enquiry-btn" onClick={() => setOpen(true)}>
          For Enquiry
        </button>
        {open && <EnquiryModal onClose={() => setOpen(false)} />}

        {/* ================= SUCCESS ================= */}
        {success && (
          <div className="quote-suc1">
            <motion.div
              className="quote-success"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <FaCheckCircle size={70} color="#2ecc71" />
              <h2>Quote Request Sent!</h2>
              <p>Redirecting to home…</p>
            </motion.div>
          </div>
        )}

        {/* ================= HERO + FORM ================= */}
        {!success && (
          <>
            <div className="quote-hero">
              <motion.div
                className="quote-overlay"
                variants={fade({ direction: "up", duration: 0.8 })}
                initial="hidden"
                animate="visible"
              >
                <h1>Request a Free Quote</h1>
                <p>Fill out the form and we'll contact you within 24 hours.</p>
              </motion.div>
            </div>

            <motion.form
              className="quote-form-wrapper"
              onSubmit={handleSubmit}
              variants={fade({ direction: "up", duration: 0.8 })}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              {error && <p className="form-error">{error}</p>}

              <motion.div
                className="form-card"
                variants={fade({ direction: "up", duration: 0.8 })}
              >
                <h3>Personal Information</h3>

                <div className="form-grid">
                  <input
                    ref={fullNameRef}
                    name="fullName"
                    placeholder="Full Name *"
                    value={formData.fullName}
                    onChange={handleChange}
                  />

                  <input
                    ref={emailRef}
                    name="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleChange}
                  />

                  <input
                    ref={phoneRef}
                    name="phone"
                    placeholder="Phone Number *"
                    value={formData.phone}
                    onChange={handleChange}
                    maxLength={10}
                  />

                  <input
                    name="address"
                    placeholder="Project Address"
                    value={formData.address}
                    onChange={handleChange}
                  />
                </div>
              </motion.div>

              <motion.div
                className="form-card"
                variants={fade({ direction: "up", duration: 0.8 })}
              >
                <h3>Project Details</h3>
                <div className="form-grid">
                  <input
                    name="projectType"
                    placeholder="Project Type"
                    onChange={handleChange}
                  />
                  <input
                    name="serviceType"
                    placeholder="Service Type"
                    onChange={handleChange}
                  />
                  <input
                    name="propertyType"
                    placeholder="Property Type"
                    onChange={handleChange}
                  />
                  <input
                    name="squareFootage"
                    placeholder="Square Footage"
                    onChange={handleChange}
                  />
                  <input
                    name="rooms"
                    placeholder="Rooms"
                    onChange={handleChange}
                  />
                  <input
                    name="timeframe"
                    placeholder="Timeframe"
                    onChange={handleChange}
                  />
                  <input
                    className="full"
                    name="budget"
                    placeholder="Budget"
                    onChange={handleChange}
                  />
                </div>
              </motion.div>

              <div className="form-card">
                <h3>Additional Information</h3>
                <textarea
                  rows="5"
                  name="message"
                  placeholder="Describe your project..."
                  value={formData.message}
                  onChange={handleChange}
                />
              </div>

              <motion.button
                className="quote-submit"
                type="submit"
                disabled={loading}
              >
                <FaCalculator />
                {loading ? " Sending..." : " Get a Quote"}
              </motion.button>
            </motion.form>
          </>
        )}

        {/* ================= PROCESS ================= */}
        <div className="quote-process">
          <motion.h2
            className="process-title"
            variants={fade({ direction: "up", duration: 0.8 })}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            Our Process
          </motion.h2>

          <div className="process-wrapper">
            {/* CURVE SVG */}
            <svg
              className="process-line"
              width="984"
              height="128"
              viewBox="0 0 984 128"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3.95117 3.95215C52.7512 3.95215 52.7512 3.95215 101.551 3.95215C150.351 3.95215 247.951 123.952 296.751 123.952C345.551 123.952 443.151 3.95215 491.951 3.95215C540.751 3.95215 638.351 123.952 687.151 123.952C735.951 123.952 833.551 3.95215 882.351 3.95215H979.951"
                stroke="#FDC700"
                strokeWidth="7.9"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            {/* q-step 01 */}
            <motion.div
              className="q-step q-step-1"
              variants={fade({ direction: "up", duration: 0.8 })}
              initial="hidden"
              whileInView="visible"
            >
              <div className="circle">01</div>
              <div className="q-step-content">
                <h4>STEP 01</h4>
                <h3>Review</h3>
                <p>Analyzing your project requirements.</p>
              </div>
            </motion.div>

            {/* q-step 02 */}
            <motion.div
              className="q-step q-step-2"
              variants={fade({ direction: "down", duration: 0.8 , delay : 0.25})}
              initial="hidden"
              whileInView="visible"
            >
              <div className="circle">02</div>
              <div className="q-step-content">
                <h4>STEP 02</h4>
                <h3>Contact</h3>
                <p>Discovery call to understand your goals.</p>
              </div>
            </motion.div>

            {/* q-step 03 */}
            <motion.div
              className="q-step q-step-3"
              variants={fade({ direction: "up", duration: 0.8, delay: 0.50 })}
              initial="hidden"
              whileInView="visible"
            >
              <div className="circle">03</div>
              <div className="q-step-content">
                <h4>STEP 03</h4>
                <h3>Execution</h3>
                <p>Transparent pricing & timelines.</p>
              </div>
            </motion.div>

            {/* q-step 04 */}
            <motion.div
              className="q-step q-step-4"
              variants={fade({ direction: "down", duration: 0.8, delay: 0.75 })}
              initial="hidden"
              whileInView="visible"
            >
              <div className="circle">04</div>
              <div className="q-step-content">
                <h4>STEP 04</h4>
                <h3>Final Inspection</h3>
                <p>Quality assurance before completion.</p>
              </div>
            </motion.div>

            {/* q-step 05 */}
            <motion.div
              className="q-step q-step-5"
              variants={fade({ direction: "up", duration: 0.8, delay: 1.0 })}
              initial="hidden"
              whileInView="visible"
            >
              <div className="circle">05</div>
              <div className="q-step-content">
                <h4>STEP 05</h4>
                <h3>Launch</h3>
                <p>Project delivery & handover.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
