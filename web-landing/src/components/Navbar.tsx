import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';

// Language Data
const languages = [
  { code: 'en', name: 'EN', dir: 'ltr' },
  { code: 'fr', name: 'FR', dir: 'ltr' },
  { code: 'ar', name: 'AR', dir: 'rtl' },
];

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);

  // Handle Scroll Effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Change Language & Direction
  const changeLanguage = (langCode: string) => {
    const selectedLang = languages.find(l => l.code === langCode);
    i18n.changeLanguage(langCode);
    document.documentElement.dir = selectedLang?.dir || 'ltr';
    document.documentElement.lang = langCode;
    setIsLangMenuOpen(false);
    setIsMobileMenuOpen(false);
  };

  const currentLang = languages.find(l => l.code === i18n.language) || languages[0];

  const navLinks = [
    { href: '#features', label: t('nav.features') },
    { href: '#howItWorks', label: t('nav.howItWorks') }, // Fixed anchor
    { href: '#screenshots', label: t('nav.screenshots') },
    { href: '#beta', label: t('nav.beta') },
    { href: '#team', label: t('nav.team') },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-dark-900/80 backdrop-blur-md shadow-lg py-3 border-b border-white/5' 
          : 'bg-transparent py-5 lg:py-6'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between">
          
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 group">
             <img 
               src={`${import.meta.env.BASE_URL}assets/logo.png`}
               alt="KeyCare" 
               className="w-8 h-8 md:w-10 md:h-10 rounded-lg shadow-lg shadow-primary-500/20 group-hover:scale-110 transition-transform"
             />
            <span className="text-xl md:text-2xl font-bold text-white tracking-tight group-hover:text-primary-400 transition-colors">
              KeyCare
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 px-3 py-2 rounded-lg transition-all"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            
            {/* Language Switcher */}
            <div className="relative">
              <button
                onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                className="flex items-center gap-2 bg-dark-800/50 hover:bg-dark-700 border border-white/10 px-3 py-2 rounded-full transition-colors"
              >
                <span className="text-xs font-bold text-gray-300 uppercase">{currentLang.name}</span>
                <svg className={`w-3 h-3 text-gray-400 transition-transform ${isLangMenuOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              <AnimatePresence>
                {isLangMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute top-full mt-2 end-0 min-w-[140px] bg-dark-800 border border-dark-600 rounded-xl shadow-xl overflow-hidden py-1"
                  >
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => changeLanguage(lang.code)}
                        className={`flex items-center gap-3 w-full px-4 py-2 text-sm hover:bg-dark-700 transition-colors ${
                          i18n.language === lang.code ? 'text-primary-500 font-semibold bg-primary-500/10' : 'text-gray-300'
                        }`}
                      >
                        <span>{lang.name}</span>
                        {i18n.language === lang.code && (
                          <span className="ms-auto w-1.5 h-1.5 rounded-full bg-primary-500"></span>
                        )}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Desktop Download Button */}
            <a 
              href="/downloads/KeyCare-latest.apk"
              className="hidden lg:flex bg-primary-500 hover:bg-primary-400 text-dark-900 text-sm font-bold px-5 py-2.5 rounded-full transition-all shadow-lg shadow-primary-500/20 hover:shadow-primary-500/40 active:scale-95"
            >
              Download
            </a>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-gray-300 hover:bg-white/10 rounded-lg transition-colors"
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-dark-900/95 backdrop-blur-xl border-t border-white/5 overflow-hidden"
          >
            <div className="container mx-auto px-4 py-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block text-lg font-medium text-gray-300 hover:text-primary-500 hover:bg-white/5 px-4 py-3 rounded-xl transition-all"
                >
                  {link.label}
                </a>
              ))}
              <hr className="border-white/10 my-2" />
              <a
                href="/downloads/KeyCare-latest.apk"
                className="block text-center bg-primary-500 text-dark-900 font-bold text-lg px-4 py-3 rounded-xl"
              >
                {t('hero.downloadApk') || 'Download App'}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}