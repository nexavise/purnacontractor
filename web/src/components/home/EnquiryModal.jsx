import { useState } from "react";
import { IoClose, IoArrowForward, IoCheckmarkCircle } from "react-icons/io5";
import "../../styles/EnquiryModel.css";

export default function EnquiryModal({ onClose }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    service: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setSuccess(true);
        setTimeout(() => onClose(), 2500);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          <IoClose size={22} />
        </button>

        {success ? (
          <div className="success-animation">
            <IoCheckmarkCircle size={72} />
            <h3>Enquiry Sent!</h3>
            <p>We'll get back to you shortly.</p>
          </div>
        ) : (
          <>
            <div className="modal-left">
              <h2>Let's Build Something Great</h2>
              <p>Transforming architectural vision into reality.</p>
            </div>

            <div className="modal-right">
              <h3>Project Enquiry</h3>

              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  onChange={handleChange}
                  required
                />

                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  onChange={handleChange}
                  required
                />

                <select
                  name="service"
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Service</option>
                  <option>Residential Painting</option>
                  <option>Commercial Painting</option>
                  <option>Interior Painting</option>
                  <option>Exterior Painting</option>
                </select>

                <textarea
                  name="description"
                  placeholder="Project Description"
                  onChange={handleChange}
                />

                <button type="submit" className="submit-btn" disabled={loading}>
                  {loading ? "Sending..." : <>Send Enquiry <IoArrowForward /></>}
                </button>
              </form>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
