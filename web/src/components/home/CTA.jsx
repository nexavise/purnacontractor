import { NavLink } from "react-router-dom";
import { IoArrowForward } from "react-icons/io5";

export default function CTA() {
  return (
    <section className="cta">
      <div className="cta__container">
        <h1 className="cta__title">Ready to Transform Your Space?</h1>

        <p className="cta__description">
          Get an accurate estimate for your painting project. Fill out the form
          and we'll get back to you within 24 hours with a detailed quote.
        </p>

        <div className="cta__actions">
          <NavLink to="/quote">
            {" "}
            <button className="cta__button cta__button--primary">
              Get a Quote{" "}
              <span className="cta__arrow">
                <IoArrowForward />
              </span>
            </button>
          </NavLink>

          <NavLink to="/contact">
            <button className="cta__button cta__button--secondary">
              Contact Us
            </button>
          </NavLink>
        </div>
      </div>
    </section>
  );
}
