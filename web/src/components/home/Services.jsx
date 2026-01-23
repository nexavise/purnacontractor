import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

import service1 from "../../images/home/service1.jpg";
import service2 from "../../images/home/service2.jpg";
import service3 from "../../images/home/service3.jpg";

const initialServices = [
  { image: service1, title: "Residential Painting" },
  { image: service2, title: "Commercial Painting" },
  { image: service3, title: "Interior Painting" },
];

export default function Services() {
  const [services, setServices] = useState(initialServices);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimating(true);

      setTimeout(() => {
        setServices((prev) => [...prev.slice(1), prev[0]]);
        setAnimating(false);
      }, 400); // match CSS animation duration
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="services-section">
      <h2>Our Services</h2>

      <div className="h-service-grid">
        {services.map((service, index) => (
          <div
            className={`service-card ${animating ? "swap-out" : "swap-in"}`}
            key={index}
          >
            <div className="service-card-inner">
              <img src={service.image} alt={service.title} />
              <span>{service.title}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="services-btn-wrapper">
        <NavLink to="/services" className="services-btn">
          View all Services
        </NavLink>
      </div>
    </section>
  );
}
