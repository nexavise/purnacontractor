import { Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./pages/ScrollToTop";

import Home from "./pages/Home";
import Services from "./pages/Services";
import Work from "./pages/Work";
import Contact from "./pages/Contact";
import Quote from "./pages/Quote";
import DifferentService from "./pages/DifferentService";

function App() {
  return (
    <>
      <ScrollToTop />
      <Navbar />

      <Routes>
        {/* MAIN PAGES */}
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/work" element={<Work />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/quote" element={<Quote />} />

        <Route path="/services/:serviceSlug" element={<DifferentService />} />
        
      </Routes>

      <Footer />
    </>
  );
}

export default App;
