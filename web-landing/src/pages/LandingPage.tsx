import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import HowItWorks from '../components/HowItWorks';
import Features from '../components/Features';
import Screenshots from '../components/Screenshots';
import BetaSignup from '../components/BetaSignup';
import Team from '../components/Team';
import FAQ from '../components/FAQ';
import Footer from '../components/Footer';

/** Preserved landing composition. It is intentionally not part of public routing. */
export default function LandingPage() {
  return (
    <div className="min-h-screen bg-dark-600 text-white">
      <Navbar />
      <main>
        <Hero />
        <HowItWorks />
        <Features />
        <Screenshots />
        <BetaSignup />
        <Team />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}
