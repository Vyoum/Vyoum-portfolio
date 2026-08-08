import About from "./components/About";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import PortfolioSections, { Footer } from "./components/PortfolioSections";
import Pricing from "./components/Pricing";
import Testimonials from "./components/Testimonials";
import WorkHistory from "./components/WorkHistory";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <PortfolioSections />
        <WorkHistory />
        <About />
        <Pricing />
        <Testimonials />
      </main>
      <Footer />
    </>
  );
}
