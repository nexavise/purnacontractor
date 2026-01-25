import "../styles/Contact.css";
import {
  FaWhatsapp,
  FaEnvelope,
  FaPhoneAlt,
  FaCheckCircle,
} from "react-icons/fa";
import { FaMapMarkerAlt } from "react-icons/fa";
import { ImSpinner2 } from "react-icons/im";
import { useState, useEffect } from "react";
import { IoTimeOutline } from "react-icons/io5";

import EnquiryModal from "../components/home/EnquiryModal";
import SEO from "../components/SEO";
import { useNavigate } from "react-router-dom";
import Turnstile from "react-turnstile";

const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";

export default function Contact() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const [token, setToken] = useState(null);
  const [tsResetKey, setTsResetKey] = useState(0); //

  const [status, setStatus] = useState("idle");
  const [showSuccess, setShowSuccess] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  useEffect(() => {
    if (showSuccess) {
      requestAnimationFrame(() => {
        window.scrollTo(0, 0);
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
      });
    }
  }, [showSuccess]);

  /* ================= VALIDATION ================= */
  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "phone") {
      if (!/^\d*$/.test(value)) return;
      if (value.length > 10) return;
    }

    setFormData({ ...formData, [name]: value });
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      alert("Please verify you are human.");
      return;
    }

    if (formData.phone.length !== 10) {
      alert("Phone number must be 10 digits");
      return;
    }

    if (!isValidEmail(formData.email)) {
      alert("Please enter a valid email");
      return;
    }

    setStatus("loading");

    const handleSubmit = async (e) => {
  e.preventDefault();

  if (!token) {
    alert("Please verify you are human.");
    return;
  }

  setStatus("loading");

  try {
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...formData, turnstileToken: token }),
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data?.message || "Failed");

    setStatus("success");
    setShowSuccess(true);

    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    });

    setToken(null);
    setTsResetKey((k) => k + 1);

    setTimeout(() => {
      setShowSuccess(false);
      setStatus("idle");
      navigate("/");
    }, 3000);
  } catch (err) {
    alert(err.message || "Failed to send message");
    setStatus("idle");

    // reset turnstile on failure
    setToken(null);
    setTsResetKey((k) => k + 1);
  }
};


  const [satellite, setSatellite] = useState(false);

  const address = "A-115/2 Raju Park Devli Road Khanpur New Delhi 110062";

  const mapSrc = satellite
    ? `https://www.google.com/maps?q=${encodeURIComponent(address)}&t=k&output=embed`
    : `https://www.google.com/maps?q=${encodeURIComponent(address)}&output=embed`;

  return (
    <>
      <SEO
        title="Contact Us | Purna Contractor"
        description="Contact Purna Contractor for construction and renovation inquiries."
        url="https://www.purnacontractor.com/contact"
      />

      <motion.section
        className="contact-page"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {showSuccess && (
          <div className="quote-suc1">
            <motion.div
              className="quote-success"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <FaCheckCircle size={70} color="#2ecc71" />
              <h2>Message Sent!</h2>
              <p>We'll contact you shortly.</p>
            </motion.div>
          </div>
        )}

        {/* HERO */}
        <motion.div
          className="contact-hero"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="hero-overlay">
            <h1>Contact Us</h1>
            <p>We'd love to hear from you. Get in touch today!</p>
          </div>
          <button className="enquiry-btn" onClick={() => setOpen(true)}>
            For Enquiry
          </button>
        </motion.div>

        {open && <EnquiryModal onClose={() => setOpen(false)} />}

        <div className="contact-two">
          <motion.div
            className="contact-card"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="contact-three">
              <motion.div
                className="contact-form"
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <h2>Send Us a Message</h2>

                {!showSuccess && (
                  <form onSubmit={handleSubmit}>
                    <input
                      name="name"
                      placeholder="Full Name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                    />

                    <input
                      name="email"
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
                      name="subject"
                      placeholder="Subject"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                    />

                    <textarea
                      name="message"
                      rows="4"
                      placeholder="Message"
                      value={formData.message}
                      onChange={handleChange}
                    />
                    <Turnstile
                      key={tsResetKey}
                      sitekey={import.meta.env.VITE_TURNSTILE_SITE_KEY}
                      onVerify={(t) => setToken(t)}
                      onExpire={() => {
                        setToken(null);
                        alert("Verification expired. Please verify again.");
                      }}
                      onError={() => {
                        setToken(null);
                        alert(
                          "Turnstile failed to load. Please refresh the page.",
                        );
                      }}
                    />

                    <button
                      className="send-btn"
                      type="submit"
                      disabled={status === "loading" || !token}
                    >
                      {status === "loading" ? (
                        <>
                          <ImSpinner2 className="spinner" /> Sending...
                        </>
                      ) : (
                        <>
                          <FaEnvelope /> Send Message
                        </>
                      )}
                    </button>
                  </form>
                )}
              </motion.div>
              <motion.div
                className="contact-info"
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <h2>Our Location</h2>

                <div className="map-wrapper">
                  <iframe title="map" src={mapSrc} loading="lazy"></iframe>

                  <motion.button
                    className="satellite-btn"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: 0.7 }}
                    onClick={() => setSatellite(!satellite)}
                  >
                    {satellite ? "Map View" : "Satellite View"}
                  </motion.button>

                  <div className="map-address">
                    <FaMapMarkerAlt className="map-icon" />
                    <span>
                      A-115/2, Raju Park, Devli Road, Khanpur, New Delhi -
                      110062
                    </span>
                  </div>
                </div>

                <div className="why-us">
                  <h3>Why Contact Us?</h3>
                  <ul>
                    <li>
                      <FaCheckCircle className="check-icon" /> Free consultation
                      and estimates
                    </li>
                    <li>
                      <FaCheckCircle className="check-icon" /> Quick response
                      time
                    </li>
                    <li>
                      <FaCheckCircle className="check-icon" /> Expert advice and
                      recommendations
                    </li>
                    <li>
                      <FaCheckCircle className="check-icon" /> Flexible
                      scheduling options
                    </li>
                    <li>
                      <FaCheckCircle className="check-icon" /> No obligation
                      quotes
                    </li>
                  </ul>
                </div>
              </motion.div>{" "}
            </div>

            <div>
              <div className="quick-contact">
                <a
                  href="https://wa.me/919213742903?text=hii"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button className="whatsapp">
                    <FaWhatsapp /> WhatsApp
                  </button>
                </a>

                <a
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=yourmail@gmail.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button className="gmail">
                    <FaEnvelope /> Gmail
                  </button>
                </a>

                {isMobile ? (
                  <a href="tel:+919213742903">
                    <button className="phone">
                      <FaPhoneAlt /> +91 92137 42903
                    </button>
                  </a>
                ) : (
                  <button className="phone" style={{ cursor: "default" }}>
                    <FaPhoneAlt /> +91 92137 42903
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </div>

        <div className="faq">
          <h2>Frequently Asked Questions</h2>
          <p>Quick answers to common questions</p>

          <div className="faq-item">
            <h4>How quickly can you start my project?</h4>
            <p>
              We typically can start most projects within 1–2 weeks. For urgent
              work, expedited scheduling is available.
            </p>
          </div>

          <div className="faq-item">
            <h4>Do you provide free estimates?</h4>
            <p>
              Yes! We offer free, no-obligation estimates via phone, email, or
              in-person consultation.
            </p>
          </div>

          <div className="faq-item">
            <h4>Are you licensed and insured?</h4>
            <p>Absolutely. We are fully licensed, bonded, and insured.</p>
          </div>

          <div className="faq-item">
            <h4>What payment methods do you accept?</h4>
            <p>
              We accept cash, credit cards, checks, and electronic transfers.
            </p>
          </div>
        </div>

        <div className="contact-four">
          <h3>Contact Us Through</h3>

          <div>
            <div className="quick-contact">
              <a
                href="https://wa.me/919213742903?text=hii"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="whatsapp">
                  <FaWhatsapp /> WhatsApp
                </button>
              </a>

              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=purnapainter@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="gmail">
                  <FaEnvelope /> Gmail
                </button>
              </a>

              {isMobile ? (
                <a href="tel:+919213742903">
                  <button className="phone">
                    <FaPhoneAlt /> +91 92137 42903
                  </button>
                </a>
              ) : (
                <button className="phone" style={{ cursor: "default" }}>
                  <FaPhoneAlt /> +91 92137 42903
                </button>
              )}
            </div>
          </div>
        </div>
      </motion.section>
    </>
  );
}
