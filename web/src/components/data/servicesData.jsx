/* ===== IMPORT SERVICE BACKGROUNDS ===== */
import interiorBg from "../../images/services/interor1.jpg";
import exteriorBg from "../../images/services/exterar.jpg";
import exteror2 from "../../images/services/exterar2.jpg";

import exteror3 from "../../images/services/exterar3.jpg";

// /* ===== IMPORT CARD IMAGES ===== */
import work3 from "../../images/ourwork/work3.png";
import work4 from "../../images/ourwork/work4.png";
import work13 from "../../images/ourwork/work13.png";
import work14 from "../../images/ourwork/work14.png";

import texture1 from "../../images/differentserv/texture1.jpg";
import texture2 from "../../images/differentserv/texture2.jpg";
import texture3 from "../../images/differentserv/texture3.jpg";
import textureBg from "../../images/differentserv/maintexture.jpg";

import waterproofBg from "../../images/differentserv/mainrooftop.jpg";
import rooftop1 from "../../images/differentserv/rooftop1.jpg";
import rooftop2 from "../../images/differentserv/rooftop2.jpg";
import rooftop3 from "../../images/differentserv/rooftop3.jpg";

import stencilBg from "../../images/differentserv/Mainstencil.jpg";
import stencil1 from "../../images/differentserv/Stencil1.jpg";
import stencil2 from "../../images/differentserv/Stencil2.jpg";
import stencil3 from "../../images/differentserv/Stencil3.jpg";

import woodBg from "../../images/differentserv/Mainwood.jpg";
import wood1 from "../../images/differentserv/wood1.jpg";
import wood2 from "../../images/differentserv/wood2.jpg";
import wood3 from "../../images/differentserv/wood3.jpg";

import metalBg from "../../images/differentserv/Mainmetal.jpg";
import metal1 from "../../images/differentserv/metal1.jpg";
import metal2 from "../../images/differentserv/metal2.jpg";
import metal3 from "../../images/differentserv/metal3.jpg";

import puttyBg from "../../images/differentserv/Mainwallputty.png";
import putty1 from "../../images/differentserv/wallputty1.jpg";
import putty2 from "../../images/differentserv/wallputty2.png";
import putty3 from "../../images/differentserv/wallputty3.png";


/* ===== SERVICES DATA ===== */
const servicesData = {
  "interior-painting": {
    pageBg: interiorBg,
    title: "Interior Painting",
    desc: "Transform your interiors with modern textures and flawless finishes.",
    cards: [
      { title: "Wall & Ceiling Painting", desc: "Smooth, long-lasting finishes.", image: work4 },
      { title: "Texture Walls", desc: "Designer textured interiors.", image: work13 },
      { title: "Repainting", desc: "Fresh coats for old interiors.", image: work14 },
    ],
  },

  "exterior-painting": {
    pageBg: exteriorBg,
    title: "Exterior Painting",
    desc: "Weather-resistant exterior painting services.",
    cards: [
      { title: "Building Exterior", desc: "Durable exterior coating.", image: work3 },
      { title: "Weather Protection", desc: "Rain & UV protection.", image:  exteror2},
      { title: "Premium Finish", desc: "Long-lasting exterior look.", image: exteror3 },
    ],
  },

  "texture-painting": {
    pageBg: textureBg,
    title: "Texture Painting",
    desc: "Add depth, luxury, and modern appeal to your walls.",
    cards: [
      { title: "Royal Texture", desc: "Premium textures.", image: texture1 },
      { title: "3D Texture", desc: "Modern 3D wall effects.", image: texture2 },
      { title: "Custom Texture", desc: "Tailor-made designs.", image: texture3 },
    ],
  },

  "waterproofing": {
    pageBg: waterproofBg,
    title: "Waterproofing",
    desc: "Protect your home from leakage and dampness.",
    cards: [
      { title: "Terrace Waterproofing", desc: "Long-lasting protection.", image: rooftop1 },
      { title: "Bathroom Waterproofing", desc: "Leak-proof solutions.", image: rooftop2 },
      { title: "Basement Treatment", desc: "Complete seepage control.", image: rooftop3 },
    ],
  },

  "stencil-design": {
    pageBg: stencilBg,
    title: "Stencil Design",
    desc: "Creative stencil wall designs for stylish interiors.",
    cards: [
      { title: "Modern Patterns", desc: "Trendy stencil designs.", image: stencil1 },
      { title: "Floral Designs", desc: "Elegant patterns.", image: stencil2 },
      { title: "Custom Artwork", desc: "Personalized wall art.", image: stencil3 },
    ],
  },

  "wood-polishing": {
    pageBg: woodBg,
    title: "Wood Polishing",
    desc: "Restore shine and durability to wooden surfaces.",
    cards: [
      { title: "Furniture Polishing", desc: "Smooth glossy finish.", image: wood1 },
      { title: "Door Polish", desc: "Long-lasting protection.", image: wood2 },
      { title: "PU Finish", desc: "Premium coating.", image: wood3 },
    ],
  },

  "metal-painting": {
    pageBg: metalBg,
    title: "Metal Painting",
    desc: "Anti-rust and durable metal painting services.",
    cards: [
      { title: "Gate Painting", desc: "Rust-free coating.", image: metal1 },
      { title: "Grill Painting", desc: "Weather resistant.", image: metal2 },
      { title: "Industrial Finish", desc: "Heavy-duty protection.", image: metal3 },
    ],
  },

  "wall-putty": {
    pageBg: puttyBg,
    title: "Wall Putty",
    desc: "Perfect smooth walls for flawless painting.",
    cards: [
      { title: "Surface Leveling", desc: "Crack-free smooth walls.", image: putty1 },
      { title: "Interior Putty", desc: "Strong paint base.", image: putty2 },
      { title: "Exterior Putty", desc: "Weather resistant.", image: putty3 },
    ],
  },

};

export default servicesData;
