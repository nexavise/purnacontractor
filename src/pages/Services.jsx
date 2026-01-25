import Process from "../components/services/Process";
import ServiceList from "../components/services/ServiceList";
import ServicesCTA from "../components/services/ServicesCTA";
import ServicesHero from "../components/services/ServicesHero";
import SEO from "../components/SEO";

import "../styles/Services.css";


export default function Services() {
  return (
    <>
      <SEO
        title="Construction Services | Purna Contractor"
        description="Explore our construction, renovation, interior, and custom building services."
        keywords="construction services, renovation, interior work"
        url="https://www.purnacontractor.com/services"
      />

    <main className="services-page">
      <ServicesHero />
      <ServiceList />
      <Process />
      <ServicesCTA />
    </main>
    </>
  );
}
