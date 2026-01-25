
import "../styles/Home.css";
import SEO from "../components/SEO";
import Hero from "../components/home/Hero";
import Stats from "../components/home/Stats";
import Services from "../components/home/Services";
import Work from "../components/home/Work";
import Testimonials from "../components/home/Testimonials";
import CTA from "../components/home/CTA";
export default function Home() {
  return (
    <>
      <SEO
        title="Purna Contractor | Construction & Renovation Experts"
        description="Purna Contractor offers professional construction, renovation, and interior services with trusted workmanship and timely delivery."
        keywords="construction company, contractor, renovation services, interior contractor"
        url="https://www.purnacontractor.com/"
      />
      <main className="home">
        <h1 className="visually-hidden">
          Purna Contractor - Trusted Construction & Renovation Company
        </h1>
        <Hero /> 
        <Stats /> 
        <Services /> 
        <Work /> 
        <Testimonials />
         <CTA />
      </main> 
    </>
  );
}
