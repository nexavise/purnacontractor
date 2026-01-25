import SEO from "../components/SEO";
import "../styles/ServicePage.css";

export default function CommercialPainting() {
  return (
    <>
      <SEO
        title="Commercial Painting Services | Purna Contractor"
        description="High-quality commercial painting services for offices, shops, and buildings."
        keywords="commercial painting, office painting, industrial painters"
        url="https://www.purnacontractor.com/services/commercial-painting"
      />

      <section className="service-page">
        <div className="service-container">
          <div className="service-hero">
            <h1>Commercial Painting</h1>
            <p>
              Professional painting solutions tailored for commercial and
              industrial spaces.
            </p>
          </div>

          <div className="service-content">
            <div className="service-box">
              <h3>Office & Corporate Painting</h3>
              <p>Create a professional and productive work environment.</p>
            </div>

            <div className="service-box">
              <h3>Retail & Showrooms</h3>
              <p>Eye-catching finishes that enhance brand presence.</p>
            </div>

            <div className="service-box">
              <h3>Industrial Painting</h3>
              <p>Durable coatings for factories and warehouses.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
