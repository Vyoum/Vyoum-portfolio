import Navbar from "./components/Navbar";
import UntanglingProjects from "./components/UntanglingProjects";
import WorkHistory from "./components/WorkHistory";
import About from "./components/About";
import Pricing from "./components/Pricing";
import Testimonials from "./components/Testimonials";
import FAQ from "./components/FAQ";
import BlogPreview from "./components/BlogPreview";
import Footer from "./components/Footer";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero + project pile→grid live in one scroll-scrubbed wrapper */}
        <UntanglingProjects />
        <WorkHistory />
        <About />
        <Pricing />
        <Testimonials />
        <FAQ />
        <BlogPreview />
      </main>
      <Footer />
    </>
  );
}
