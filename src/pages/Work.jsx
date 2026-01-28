import "../styles/work.css";
import { useState } from "react";
import SEO from "../components/SEO";
import EnquiryModal from "../components/home/EnquiryModal";

/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";

import AnimatedServiceImage from "../components/services/AnimatedServiceImage";


// Images
import work1 from "../images/ourwork/interar-1.jpeg";
import work2 from "../images/ourwork/interar-2.jpeg";
import work3 from "../images/ourwork/exterar-1.jpeg";
import work4 from "../images/ourwork/interar-3.jpeg";
import work5 from "../images/ourwork/commersial1.jpeg";
import work6 from "../images/ourwork/residential-3.jpeg";
import work7 from "../images/ourwork/residential-1.jpeg";
import work8 from "../images/ourwork/work6.jpg";
import work9 from "../images/ourwork/commersial-2.jpeg";
import work10 from "../images/ourwork/commersial-3.jpeg";
import work11 from "../images/ourwork/commersial-4.jpeg";
import work13 from "../images/ourwork/interar-4.jpeg";
import work14 from "../images/ourwork/interar-5.jpeg";
import work15 from "../images/ourwork/interar-6.jpeg";
import CTA from "../components/home/CTA";

const categories = ["All", "Residential", "Commercial", "Interior", "Exterior"];

const works = [
  {
    id: 1,
    title: "Modern d Accent Wall Finish",
    category: "Interior",
    image: work1,
  },
  {
    id: 2,
    title: "Classic Indoor Wall Painting",
    category: "Interior",
    image: work2,
  },
  {
    id: 3,
    title: "Weatherproof Exterior Wall Design",
    category: "Exterior",
    image: work3,
  },
  {
    id: 4,
    title: "Classic Indoor Wall Painting",
    category: "Interior",
    image: work4,
  },
  {
    id: 5,
    title: "Corporate Office Wall Design",
    category: "Commercial",
    image: work5,
  },
  {
    id: 6,
    title: "Residential Luxury Wall Painting",
    category: "Residential",
    image: work6,
  },
  {
    id: 7,
    title: "Residential Luxury Wall Painting",
    category: "Residential",
    image: work7,
  },
  {
    id: 8,
    title: "Residential Luxury Wall Painting",
    category: "Residential",
    image: work8,
  },
  {
    id: 9,
    title: "Commercial Space Modern Finish",
    category: "Commercial",
    image: work9,
  },
  {
    id: 10,
    title: "Commercial Space Modern Finish",
    category: "Commercial",
    image: work10,
  },
  {
    id: 11,
    title: "Business Interior Wall Décor",
    category: "Commercial",
    image: work11,
  },
  {
    id: 13,
    title: "-Dapple Wall Painting Design",
    category: "Interior",
    image: work13,
  },
  {
    id: 14,
    title: "Elegant Interior Paint Design",
    category: "Interior",
    image: work14,
  },
  {
    id: 15,
    title: "Premium Decorative Wall",
    category: "Interior",
    image: work15,
  },
];

/* ================= ANIMATION VARIANTS ================= */
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

const formStagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const stagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.2 },
  },
};

export default function Work() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [open, setOpen] = useState(false);

  // ✅ FILTER + LIMIT (CONSISTENT)
  const filtered =
    activeCategory === "All"
      ? works.slice(0, 6)
      : works.filter((w) => w.category === activeCategory).slice(0, 6);

  // ✅ SPLIT INTO 2 COLUMNS
  const leftCol = filtered.filter((_, i) => i % 2 === 0);
  const rightCol = filtered.filter((_, i) => i % 2 !== 0);

  return (
    <>
      {/* ✅ SEO ONCE */}
      <SEO
        title="Our Projects | Purna Contractor"
        description="View completed residential and commercial construction projects by Purna Contractor."
        keywords="construction projects, painting work, interior, exterior"
        url="https://www.purnacontractor.com/work"
      />

      <section className="work-page">
        <motion.h1  initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}>OUR WORK</motion.h1>

        {/* FILTERS */}
        < motion.div className="work-filters"  initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}>
          {categories.map((cat) => (
            <button
              key={cat}
              className={activeCategory === cat ? "active" : ""}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* GRID */}
        <motion.div
          className="work-row"
          key={activeCategory}
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="work-col">
            {leftCol.map((item, index) => (
              <WorkCard
                key={`${activeCategory}-${item.id}`}
                item={item}
                index={index}
              />
            ))}
          </div>

          <div className="work-col">
            {rightCol.map((item) => (
              <WorkCard key={`${activeCategory}-${item.id}`} item={item} />
            ))}
          </div>
        </motion.div>

         <CTA />
      </section>

      <button className="enquiry-btn" onClick={() => setOpen(true)}>
        For Enquiry
      </button>

      {open && <EnquiryModal onClose={() => setOpen(false)} />}
    </>
  );
}

function WorkCard({ item }) {
  return (
    <div className="work-card">
      <div className="work-img-wrap">
        {/* <img src={item.image} alt={item.title} /> */}
          <AnimatedServiceImage className="ser-img" src={item.image} alt={item.title} />
      </div>
      <div className="work-overlay">{item.title}</div>
    </div>
  );
}


