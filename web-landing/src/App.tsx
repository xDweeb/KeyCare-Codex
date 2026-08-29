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
import KeyCareApp from './pages/KeyCareApp';

function usePathname() {
  const [pathname, setPathname] = useState(window.location.pathname);

  useEffect(() => {
    const updatePath = () => setPathname(window.location.pathname);
    window.addEventListener('popstate', updatePath);
    return () => window.removeEventListener('popstate', updatePath);
  }, []);

  return pathname.replace(/\/+$/, '') || '/';
}

function LandingPage() {
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

function App() {
  const { i18n } = useTranslation();
  const pathname = usePathname();

  useEffect(() => updateDocumentDirection(i18n.resolvedLanguage || i18n.language), [i18n.language, i18n.resolvedLanguage]);

  if (pathname === '/app' || pathname === '/privacy' || pathname === '/terms') return <KeyCareApp />;
  if (pathname === '/qr') return <QRLinks />;
  return <LandingPage />;
}

export default App;
