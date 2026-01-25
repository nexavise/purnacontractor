import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaBars, FaTimes, FaChevronDown } from "react-icons/fa";
import "../styles/Navbar.css";
import logo from "../images/logo.png";
import { useLocation } from "react-router-dom";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const location = useLocation();

  const isServicesRoute = location.pathname.startsWith("/services/");

  const closeAll = () => {
    setMenuOpen(false);
    setDropdownOpen(false);
  };

  return (
    <nav className="navbar">
      {/* LOGO */}
      <div className="navbar-logo">
        <NavLink to="/" onClick={closeAll}>
          <img src={logo} alt="Purina Contractors" className="logo-img" />
        </NavLink>
      </div>

      {/* HAMBURGER */}
      <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* LINKS */}
      <ul className={`navbar-links ${menuOpen ? "open" : ""}`}>
        <li>
          <NavLink to="/" onClick={closeAll}>
            Home
          </NavLink>
        </li>

        <NavLink to="/services" end onClick={closeAll}>
          Services
        </NavLink>

        <li>
          <NavLink to="/work" onClick={closeAll}>
            Our Works
          </NavLink>
        </li>

        {/* DROPDOWN */}
        <li className={`nav-dropdown ${dropdownOpen ? "open" : ""} `}>
          <span
            className={`nav-dropdown-toggle ${
              dropdownOpen || isServicesRoute ? "active" : ""
            }`}
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            Our Services in Delhi <FaChevronDown />
          </span>

          <ul className="nav-dropdown-menu">
            <NavLink to="/services/interior-painting" onClick={closeAll}>
              <li>Interior Painting</li>
            </NavLink>

            <NavLink to="/services/exterior-painting" onClick={closeAll}>
              <li>Exterior Painting</li>
            </NavLink>

            <NavLink to="/services/texture-painting" onClick={closeAll}>
              <li>Texture Painting</li>
            </NavLink>

            <NavLink to="/services/waterproofing" onClick={closeAll}>
              <li>Waterproofing</li>
            </NavLink>

            <NavLink to="/services/special-effect" onClick={closeAll}>
              <li>Special effect</li>
            </NavLink>

            <NavLink to="/services/wood-polishing" onClick={closeAll}>
              <li>Wood Polishing</li>
            </NavLink>

            <NavLink to="/services/metal-painting" onClick={closeAll}>
              <li>Metal Painting</li>
            </NavLink>

            <NavLink to="/services/wall-putty" onClick={closeAll}>
              <li>Wall Putty</li>
            </NavLink>
          </ul>
        </li>

        <li>
          <NavLink to="/contact" onClick={closeAll}>
            Contact
          </NavLink>
        </li>

        {/* MOBILE CTA */}
        <li className="mobile-cta">
          <NavLink to="/quote" onClick={closeAll}>
            <button className="quote-btn">Get a Quote</button>
          </NavLink>
        </li>
      </ul>

      {/* DESKTOP CTA */}
      <NavLink to="/quote" className="desktop-cta">
        <button className="quote-btn">Get a Quote</button>
      </NavLink>
    </nav>
  );
}
