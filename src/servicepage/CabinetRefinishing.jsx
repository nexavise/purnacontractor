// import SEO from "../components/SEO";
// import "../styles/ServicePage.css";

// export default function CabinetRefinishing() {
//   return (
//     <>
//       <SEO
//         title="Cabinet Refinishing Services | Purna Contractor"
//         description="Professional cabinet refinishing and repainting services."
//         keywords="cabinet refinishing, kitchen cabinets, furniture painting"
//         url="https://www.purnacontractor.com/services/cabinet-refinishing"
//       />

// <section className="service-page">
//   <div className="service-container">
//     <div className="service-hero">
//       <h1>Cabinet Refinishing</h1>
//       <p>
//         Give your cabinets a brand-new look without replacement.
//       </p>
//     </div>

//     <div className="service-content">
//       <div className="service-box">
//         <h3>Kitchen Cabinets</h3>
//         <p>Durable finishes for daily use.</p>
//       </div>

//       <div className="service-box">
//         <h3>Wardrobes & Furniture</h3>
//         <p>Restore beauty and shine.</p>
//       </div>

//       <div className="service-box">
//         <h3>Polish & Repainting</h3>
//         <p>Cost-effective cabinet upgrades.</p>
//       </div>
//     </div>
//   </div>
// </section>
//     </>
//   );
// }

import SEO from "../components/SEO";
import "../styles/ServicePage.css";
import { useState } from "react";
import EnquiryModal from "../components/home/EnquiryModal";

export default function InteriorPainting() {
  const [open, setOpen] = useState(false);

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
        title="Exterior Painting Services | Purna Contractor"
        description="Exterior painting services for homes and buildings."
        keywords="exterior painting, building painting, waterproof coating"
        url="https://www.purnacontractor.com/services/exterior-painting"
      />

      <section className={`exterar-service-page`}>
        <button className="enquiry-btn" onClick={() => setOpen(true)}>
          For Enquiry
        </button>

        {open && <EnquiryModal onClose={() => setOpen(false)} />}

        <div className="service-container service-grid">
          {/* LEFT CONTENT */}
          <div className="service-container">
            <div className="service-hero">
              <h1>Cabinet Refinishing</h1>
              <p>Give your cabinets a brand-new look without replacement.</p>
            </div>

            <div className="service-content">
              <div className="service-box">
                <h3>Kitchen Cabinets</h3>
                <p>Durable finishes for daily use.</p>
              </div>

              <div className="service-box">
                <h3>Wardrobes & Furniture</h3>
                <p>Restore beauty and shine.</p>
              </div>

              <div className="service-box">
                <h3>Polish & Repainting</h3>
                <p>Cost-effective cabinet upgrades.</p>
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
