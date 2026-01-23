import { useState } from "react";
import EnquiryModal from "../home/EnquiryModal";
export default function ServicesHero() {
  const [open, setOpen] = useState(false);
  return (
    <>
      {" "}
      <section className="services-hero">
        <div className="services-hero-overlay" />

        <div className="services-hero-content">
          <h1>Our Painting Services</h1>
          <p>
            Comprehensive painting solutions for residential and commercial
            clients. Quality craftsmanship and attention to detail in every
            project.
          </p>
        </div>
         <button className="enquiry-btn s-btn" onClick={() => setOpen(true)}>
          For Enquiry
        </button>
      </section>
      {open && <EnquiryModal onClose={() => setOpen(false)} />}
    </>
  );
}
