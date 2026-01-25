import { useState, useEffect } from "react";
import EnquiryModal from "./EnquiryModal";

export default function Hero() {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");

  const word = "PROFESSIONAL";
  const typingSpeed = 150;
  const deletingSpeed = 150;
  const pauseAfterType = 1200;
  const pauseAfterDelete = 800;

  useEffect(() => {
    let index = 0;
    let isDeleting = false;
    let timeoutId;

    const handleTyping = () => {
      if (!isDeleting) {
        // Typing
        setText(word.slice(0, index + 1));
        index++;

        if (index === word.length) {
          timeoutId = setTimeout(() => {
            isDeleting = true;
            handleTyping();
          }, pauseAfterType);
          return;
        }
      } else {
        // Deleting
        setText(word.slice(0, index - 1));
        index--;

        if (index === 0) {
          timeoutId = setTimeout(() => {
            isDeleting = false;
            handleTyping();
          }, pauseAfterDelete);
          return;
        }
      }

      timeoutId = setTimeout(
        handleTyping,
        isDeleting ? deletingSpeed : typingSpeed
      );
    };

    handleTyping();

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <>
      <section className="hero">
        <div className="hero-content">
          <h1>
            <span className="typing">{text}</span>{" "}
            PAINTING <br /> SERVICES YOU CAN TRUST
          </h1>

          <p>
            Transform your space with expert craftsmanship and premium quality
            paints. Serving residential and commercial clients with excellence.
          </p>
        </div>

        <button className="enquiry-btn" onClick={() => setOpen(true)}>
          For Enquiry
        </button>
      </section>

      {open && <EnquiryModal onClose={() => setOpen(false)} />}
    </>
  );
}
