import { Footer } from "./components/footer";
import { HeroSection } from "./components/hero";
import { Navbar } from "./components/navbar";

const LandingPage = () => {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <Footer />
    </main>
  );
};

export default LandingPage;
