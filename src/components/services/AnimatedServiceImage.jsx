import { useState } from "react";
/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";

import "../../styles/imgload.css";

export default function AnimatedServiceImage({ src, alt }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="animated-service-img-wrapper">
      {!loaded && <div className="img-skeleton"></div>}

      <motion.img
        src={src}
        alt={alt}
        onLoad={() => setLoaded(true)}
        initial={{ opacity: 0, scale: 0.85 }}
        animate={loaded ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.5, type: "spring", stiffness: 180 }}
        className="animated-service-img"
        style={{ display: loaded ? "block" : "none" }}
      />
    </div>
  );
}
