import { useState, useEffect } from "react";
import {
  FaQuoteLeft,
  FaStar,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

const testimonials = [
  {
    dec: "Interior Painting",
    text: "Outstanding job on our home. They were professional, punctual, and the quality of work exceeded our expectations. Our living room looks absolutely stunning!",
    name: "Aarav Sharma",
  },
  {
    dec: "Exterior Painting",
    text: "They did a fantastic job painting our commercial space, giving it a modern and professional look. The quality of work and attention to detail truly enhanced our workplace environment.",
    name: "Rohan Patel",
  },
  {
    dec: "Texture Painting",
    text: "The painting work done for my kids’ room was excellent, with vibrant colors and a clean, smooth finish. The team was professional and completed the work on time.",
    name: "Priya Verma",
  },
];

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const [animate, setAnimate] = useState(true);

  const prevIndex = (active - 1 + testimonials.length) % testimonials.length;
  const nextIndex = (active + 1) % testimonials.length;

  const change = (index) => {
    setAnimate(false);

    setTimeout(() => {
      setActive(index);
      setAnimate(true);
    }, 350); // must match CSS text animation
  };

  useEffect(() => {
    const interval = setInterval(() => {
      change((active + 1) % testimonials.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [active]);

  return (
    <section className="testimonials">
      <h2>Testimonials</h2>

      <div className="testimonial-wrapper">
        <button className="nav-btn left" onClick={() => change(prevIndex)}>
          <FaChevronLeft />
        </button>

        <div className="testimonial-card faded">
          <FaQuoteLeft className="quote-icon" />

          <div className="stars">
            {[...Array(5)].map((_, i) => (
              <FaStar key={i} />
            ))}
          </div>
          <p className="service">{testimonials[prevIndex].dec}</p>
          <p className="text">{testimonials[prevIndex].text}</p>
          <span className="name">{testimonials[prevIndex].name}</span>
        </div>

        <div className="testimonial-card active">
          <FaQuoteLeft className="quote-icon" />

          <div className="stars">
            {[...Array(5)].map((_, i) => (
              <FaStar key={i} />
            ))}
          </div>

          <p className={`service ${animate ? "in" : "out"}`}>
            {testimonials[active].dec}
          </p>
          <p className={`text ${animate ? "in" : "out"}`}>
            {testimonials[active].text}
          </p>

          <span className={`name ${animate ? "in" : "out"}`}>
            {testimonials[active].name}
          </span>
        </div>

        <div className="testimonial-card faded">
          <FaQuoteLeft className="quote-icon" />
          <p className="service">Interior Painting</p>

          <div className="stars">
            {[...Array(5)].map((_, i) => (
              <FaStar key={i} />
            ))}
          </div>
          
          <p className="service">{testimonials[prevIndex].dec}</p>
          <p className="text">{testimonials[nextIndex].text}</p>
          <span className="name">{testimonials[nextIndex].name}</span>
        </div>

        <button className="nav-btn right" onClick={() => change(nextIndex)}>
          <FaChevronRight />
        </button>
      </div>
    </section>
  );
}
