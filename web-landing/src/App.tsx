import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { updateDocumentDirection } from './i18n/i18n';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import HowItWorks from './components/HowItWorks';
import Features from './components/Features';
import Screenshots from './components/Screenshots';
import BetaSignup from './components/BetaSignup';
import Team from './components/Team';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import QRLinks from './components/QRLinks';

// Simple path-based routing for SPA
function useRoute() {
  const [path, setPath] = useState(window.location.pathname);

  useEffect(() => {
    const handlePopState = () => setPath(window.location.pathname);
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  return path;
}

function App() {
  const { i18n } = useTranslation();
  const path = useRoute();

  useEffect(() => {
    // Update direction when language changes
    updateDocumentDirection(i18n.language);
  }, [i18n.language]);

  // Check if we're on the /qr route
  const isQRPage = path === '/qr' || path === '/qr/' || path.endsWith('/qr') || path.endsWith('/qr/');

  // Render QR Links page
  if (isQRPage) {
    return <QRLinks />;
  }

  // Render main landing page
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

export default App;
