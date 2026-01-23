import SEO from "../components/SEO";
import "../styles/ServicePage.css";
import EnquiryModal from "../components/home/EnquiryModal";
import { useState } from "react";


export default function ResidentialPainting() {
    const [open, setOpen] = useState(false);
  
  return (
    <>
      <SEO
        title="Residential Painting Services | Purna Contractor"
        description="Professional residential painting services for homes, apartments, and villas by Purna Contractor."
        keywords="residential painting, house painting, home painters"
        url="https://www.purnacontractor.com/services/residential-painting"
      />

      <section className="service-page">
         <button className="enquiry-btn" onClick={() => setOpen(true)}>
                    For Enquiry
                  </button>
                {open && <EnquiryModal onClose={() => setOpen(false)} />}
        
        <div className="service-container">
          <div className="service-hero">
            <h1>Residential Painting</h1>
            <p>
              Enhance your home with expert residential painting services
              designed for beauty, durability, and comfort.
            </p>
          </div>

          <div className="service-content">
            <div className="service-box">
              <h3>Interior Home Painting</h3>
              <p>Premium finishes for living rooms, bedrooms, kitchens, and more.</p>
            </div>

            <div className="service-box">
              <h3>Exterior Home Painting</h3>
              <p>Weather-resistant coatings to protect and beautify your home.</p>
            </div>

            <div className="service-box">
              <h3>Color Consultation</h3>
              <p>Professional guidance to choose the perfect color combinations.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
