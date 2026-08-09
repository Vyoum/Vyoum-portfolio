import Navbar from "./components/Navbar";
import ColumnGrid from "./components/ColumnGrid";
import UntanglingProjects from "./components/UntanglingProjects";
import FeaturedReview from "./components/FeaturedReview";
import Services from "./components/Services";
import WorkHistory from "./components/WorkHistory";
import About from "./components/About";
import Pricing from "./components/Pricing";
import Testimonials from "./components/Testimonials";
import FAQ from "./components/FAQ";
import BlogPreview from "./components/BlogPreview";
import Footer from "./components/Footer";
import FloatingCTA from "./components/FloatingCTA";

export default function HomePage() {
  return (
    <>
      <ColumnGrid />
      <Navbar />
      <main>
        {/* Hero + project pile→grid: one scroll-scrubbed section, same card stack */}
        <UntanglingProjects />
        <FeaturedReview />
        <div className="gridRule" aria-hidden="true" />
        <Services />
        <About />
        <div className="gridRule" aria-hidden="true" />
        <WorkHistory />
        <Pricing />
        <Testimonials />
        <FAQ />
        <BlogPreview />
      </main>
      <Footer />
      <FloatingCTA />
    </>
  );
}
