import { NavLink } from "react-router-dom";
import { IoArrowForward } from "react-icons/io5";

export default function scta() {
  return (
    <section className="scta">
      <div className="scta__container">
        <h1 className="scta__title">
          Ready to Get Started?
        </h1>

        <p className="scta__description">
          Contact us today for free consultation and quote
        </p>

        <div className="scta__actions">
         <NavLink to="/quote"> <button className="scta__button scta__button--primary">
            Get a Quote <span className="scta__arrow"><IoArrowForward /></span>
          </button></NavLink>

          <NavLink to="/contact"><button className="scta__button scta__button--secondary">
            Contact Us
          </button></NavLink>
        </div>
      </div>
    </section>
  );
}
