import SEO from "../components/SEO";
import "../styles/ServicePage.css";
import { useEffect, useState } from "react";
import EnquiryModal from "../components/home/EnquiryModal";

export default function InteriorPainting() {
  const [open, setOpen] = useState(false);
  const [bgLoaded, setBgLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = "/images/services/interor-paint.jpg"; // SAME path as CSS

    img.onload = () => {
      setBgLoaded(true);
    };
  }, []);

  const getTomorrowDate = () => {
    const today = new Date();
    const tomorrow = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() + 1,
    );

    const yyyy = tomorrow.getFullYear();
    const mm = String(tomorrow.getMonth() + 1).padStart(2, "0");
    const dd = String(tomorrow.getDate()).padStart(2, "0");

    return `${yyyy}-${mm}-${dd}`;
  };

  const minDate = getTomorrowDate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    date: "",
    details: "",
  });

  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

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
          service: "Interior Painting",
          date: formData.date,
          description: formData.details,
        }),
      });

      const data = await res.json();

      if (data.success) {
        setSuccess(true);
      }
    } catch (error) {
      console.error("Submit error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SEO
        title="Interior Painting Services | Purna Contractor"
        description="Interior wall, ceiling, and texture painting services."
        keywords="interior painting, wall painting, texture painting"
        url="https://www.purnacontractor.com/services/interior-painting"
      />

      <section
        className={`interior-service-page ${bgLoaded ? "bg-loaded" : "bg-loading"}`}
      >
        <button className="enquiry-btn" onClick={() => setOpen(true)}>
          For Enquiry
        </button>

        {open && <EnquiryModal onClose={() => setOpen(false)} />}

        <div className="service-container service-grid">
          {/* LEFT CONTENT */}
          <div className="service-left">
            <div className="service-hero">
              <h1>Interior Painting</h1>
              <p>
                Transform your interiors with modern textures and flawless
                finishes.
              </p>
            </div>

            <div className="service-content">
              <div className="service-box intear1">
                <h3>Wall & Ceiling Painting</h3>
                <p>Smooth, long-lasting interior finishes.</p>
              </div>

              <div className="service-box intear2">
                <h3>Texture & Designer Walls</h3>
                <p>Unique designs to elevate your interiors.</p>
              </div>

              <div className="service-box intear3">
                <h3>Repainting Services</h3>
                <p>Fresh coats to revive old interiors.</p>
              </div>
            </div>
          </div>

          {/* RIGHT FORM */}
          <div className={`service-form ${success ? "success-animation" : ""}`}>
            <h2>{success ? "Request Sent 🎉" : "Book a Site Visit"}</h2>

            {!success && (
              <form onSubmit={handleSubmit}>
                <div className="form-row">
                  <input
                    name="firstName"
                    placeholder="First Name"
                    onChange={handleChange}
                    required
                  />
                  <input
                    name="lastName"
                    placeholder="Last Name"
                    onChange={handleChange}
                    required
                  />
                </div>

                <input
                  name="email"
                  type="email"
                  placeholder="Email Address"
                  onChange={handleChange}
                  required
                />
                <input
                  name="phone"
                  placeholder="Contact Number"
                  onChange={handleChange}
                  required
                />
                <input
                  name="date"
                  type="date"
                  min={minDate}
                  onChange={handleChange}
                  required
                />

                <textarea
                  name="details"
                  placeholder="Project Details"
                  onChange={handleChange}
                />

                <button type="submit" disabled={loading}>
                  {loading ? "Sending..." : "Request Visit"}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
