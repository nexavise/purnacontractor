import "../styles/Footer.css";
import {
  FaFacebookF,
  FaWhatsapp,
  FaInstagram,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { NavLink } from "react-router-dom"; // ✅ FIX

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-col">
          <h3>PURNA CONTRACTORS</h3>
          <p>
            Professional painting services for residential and commercial
            clients. Quality work, competitive pricing, and exceptional customer
            service.
          </p>

          <div className="social-icons">
            <a href="https://www.facebook.com/profile.php?id=61585996025242"  target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook">
              <FaFacebookF />
            </a>
            <a
              href="https://wa.me/919213742903?text=hii"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
            >
              <FaWhatsapp />
            </a>
            <a
              href="https://www.instagram.com/purnacontractor"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <FaInstagram />
            </a>
          </div>
        </div>

        <div className="footer-col">
          <h4>Quick Links</h4>
          <ul>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/services">Services</NavLink>
            </li>
            <li>
              <NavLink to="/work">Our Work</NavLink>
            </li>
            <li>
              <NavLink to="/contact">Contact</NavLink>
            </li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Our Services</h4>
          <ul>
            <NavLink to="/services/interior-painting">
              <li>Interior Painting</li>
            </NavLink>

            <NavLink to="/services/exterior-painting">
              <li>Exterior Painting</li>
            </NavLink>

             <NavLink to="/services/texture-painting">
                <li>Texture Painting</li>
              </NavLink>

            <NavLink to="/services/waterproofing">
                <li> Waterproofing</li>
              </NavLink>

          

            <NavLink to="/services/stencil-design">
              <li>Stencil Design</li>
            </NavLink>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Contact Info</h4>

          <p>
            <FaPhoneAlt className="footer-col-icon" /> +91 92137 42903
          </p>
          <p>
            <FaEnvelope className="footer-col-icon" /> purnapainter@gmail.com
          </p>
          <p>
            <FaMapMarkerAlt className="footer-col-icon" /> A115/2 Raju park
            devli road khanpur New Delhi 110062
          </p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2025 PURNA CONTRACTORS. All rights reserved.</p>
        <p>Design & Developed by Nexavise Consulting PVT. LTD. </p>
        <div className="footer-links">
          <NavLink to="/privacy-policy">Privacy Policy</NavLink>
          <NavLink to="/terms">Terms of Service</NavLink>

          <NavLink to="/quote">
            <button className="footer-cta">Get a Quote</button>
          </NavLink>
        </div>
      </div>
    </footer>
  );
}
