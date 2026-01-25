import { useEffect, useRef, useState } from "react";

export default function Stats() {
  const [counts, setCounts] = useState({
    clients: 0,
    experience: 0,
    projects: 0,
  });

  const [hasStarted, setHasStarted] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.3 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;

    const targets = {
      clients: 500,
      experience: 25,
      projects: 1000,
    };

    const duration = 4000;
    const interval = 16;
    const steps = duration / interval;

    let step = 0;

    const timer = setInterval(() => {
      step++;

      setCounts({
        clients: Math.min(
          Math.ceil((targets.clients / steps) * step),
          targets.clients,
        ),
        experience: Math.min(
          Math.ceil((targets.experience / steps) * step),
          targets.experience,
        ),
        projects: Math.min(
          Math.ceil((targets.projects / steps) * step),
          targets.projects,
        ),
      });

      if (step >= steps) clearInterval(timer);
    }, interval);

    return () => clearInterval(timer);
  }, [hasStarted]);

  return (
    <section className="stats-section" ref={sectionRef}>
      <div className="stats-box">
        <div className="stat">
          <h3>{counts.clients}+</h3>
          <p>Happy Clients</p>
        </div>

        <div className="stat">
          <h3>{counts.experience}+</h3>
          <p>Years Experience</p>
        </div>

        <div className="stat">
          <h3>{counts.projects}+</h3>
          <p>Projects Completed</p>
        </div>

        <div className="stat">
          <h3>24/7</h3>
          <p>On-site Support Available</p>
        </div>
      </div>
    </section>
  );
}
