import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

// Professional Icons (SVG components for cleaner code)
const ShieldIcon = () => (
  <svg className="w-5 h-5 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
);

const BoltIcon = () => (
  <svg className="w-5 h-5 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
);

const GlobeIcon = () => (
  <svg className="w-5 h-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const AndroidIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M17.523 15.3414C17.523 15.3414 17.523 15.3414 17.523 15.3414C17.523 15.3414 17.523 15.3414 17.523 15.3414C17.523 15.3414 17.523 15.3414 17.523 15.3414ZM6.47696 15.3414C6.47696 15.3414 6.47696 15.3414 6.47696 15.3414C6.47696 15.3414 6.47696 15.3414 6.47696 15.3414C6.47696 15.3414 6.47696 15.3414 6.47696 15.3414ZM12.0001 0.602051L12.0001 0.602051C5.69806 0.602051 0.612061 5.37805 0.612061 11.2321H23.3881C23.3881 5.37805 18.3021 0.602051 12.0001 0.602051ZM5.52606 3.44405L6.96006 1.43405C7.05606 1.30205 7.02606 1.11605 6.89406 1.02005C6.76206 0.924051 6.57606 0.954051 6.48006 1.08605L5.03406 3.10805C5.19006 3.21005 5.35806 3.32405 5.52606 3.44405ZM18.4741 3.44405L17.0401 1.43405C16.9441 1.30205 16.9741 1.11605 17.1061 1.02005C17.2381 0.924051 17.4241 0.954051 17.5201 1.08605L18.9661 3.10805C18.8101 3.21005 18.6421 3.32405 18.4741 3.44405ZM17.2001 8.23205C16.7581 8.23205 16.4001 7.87405 16.4001 7.43205C16.4001 6.99005 16.7581 6.63205 17.2001 6.63205C17.6421 6.63205 18.0001 6.99005 18.0001 7.43205C18.0001 7.87405 17.6421 8.23205 17.2001 8.23205ZM6.80006 8.23205C6.35806 8.23205 6.00006 7.87405 6.00006 7.43205C6.00006 6.99005 6.35806 6.63205 6.80006 6.63205C7.24206 6.63205 7.60006 6.99005 7.60006 7.43205C7.60006 7.87405 7.24206 8.23205 6.80006 8.23205Z" />
    <path d="M12 17C12 17 12 17 12 17C12 17 12 17 12 17L12 17ZM12 17L12 17L12 17L12 17Z" />
  </svg>
);

export default function Hero() {
  const { t } = useTranslation();

  const badges = [
    { key: 'privacy', icon: <ShieldIcon />, label: 'Privacy First' },
    { key: 'realtime', icon: <BoltIcon />, label: 'Real-time' },
    { key: 'multilingual', icon: <GlobeIcon />, label: 'Multilingual' },
  ];

  return (
    <section className="relative min-h-[90vh] flex items-center pt-20 pb-8 overflow-hidden bg-dark-600">
      {/* Background Gradients */}
      <div className="absolute top-0 start-0 w-[400px] h-[400px] bg-primary-500/10 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 end-0 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[100px] translate-x-1/2 translate-y-1/2" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Trust Badges - Pills Style */}
            <div className="flex flex-wrap gap-2 mb-6">
              {badges.map((badge, index) => (
                <motion.div
                  key={badge.key}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + (index * 0.1) }}
                  className="flex items-center gap-2 px-3 py-1 rounded-full bg-dark-500/50 border border-dark-400 text-xs font-medium text-gray-300 backdrop-blur-sm"
                >
                  {badge.icon}
                  <span>{t(`hero.badges.${badge.key}`)}</span>
                </motion.div>
              ))}
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4 text-white tracking-tight">
              {t('hero.title')}
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-emerald-400">
                {t('hero.titleHighlight')}
              </span>
            </h1>

            <p className="text-base md:text-lg text-gray-400 mb-6 max-w-xl leading-relaxed">
              {t('hero.subtitle')}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <motion.a
                href={`${import.meta.env.BASE_URL}downloads/KeyCare-latest.apk`}
                download
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group relative px-6 py-3 bg-primary-500 text-dark-900 rounded-xl font-bold flex items-center gap-2 shadow-[0_0_20px_rgba(0,229,196,0.3)] hover:shadow-[0_0_30px_rgba(0,229,196,0.5)] transition-all text-sm"
              >
                <AndroidIcon />
                <span>{t('hero.downloadApk')}</span>
                <svg className="w-5 h-5 rtl:rotate-180 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </motion.a>

              <motion.a
                href="#beta"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-6 py-3 bg-dark-500 text-white rounded-xl font-semibold border border-dark-400 hover:bg-dark-400 transition-colors text-sm"
              >
                {t('hero.joinBeta')}
              </motion.a>
            </div>

            <p className="text-xs text-gray-500 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              {t('hero.androidOnly')}
            </p>
          </motion.div>

          {/* Hero Image/Animation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative lg:h-[450px] flex items-center justify-center"
          >
            {/* Glow behind phone */}
            <div className="absolute inset-0 bg-gradient-to-tr from-primary-500/20 to-purple-500/20 blur-[50px] rounded-full z-0" />

            {/* Phone Mockup Container */}
            <div className="relative z-10 w-[220px] md:w-[260px] rotate-[-6deg] hover:rotate-0 transition-transform duration-700 ease-out">
              <div className="bg-dark-800 rounded-[2.5rem] p-2 shadow-2xl border-4 border-dark-400 ring-1 ring-white/10">
                <div className="bg-dark-900 rounded-[2rem] overflow-hidden aspect-[9/19] relative">
                  {/* Dynamic Image with better fallback */}
                  <img
                    src={`${import.meta.env.BASE_URL}assets/herophone.png`}
                    alt="KeyCare Interface"
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Fake UI Status Bar */}
                  <div className="absolute top-0 inset-x-0 h-6 bg-black/50 flex items-center justify-between px-6">
                    <div className="w-12 h-3 bg-black rounded-b-lg mx-auto"></div>
                  </div>
                </div>
              </div>

              {/* Floating Glass Cards - RTL Optimized */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-16 -end-8 md:-end-12 backdrop-blur-md bg-dark-600/80 border border-white/10 p-3 rounded-xl shadow-xl flex items-center gap-2 z-20"
              >
                <div className="p-1.5 bg-purple-500/20 rounded-lg text-purple-400">
                  <span className="text-base">✨</span>
                </div>
                <div>
                  <div className="text-[10px] text-gray-400">Power</div>
                  <div className="text-xs font-bold text-white">AI Assistant</div>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-24 -start-6 md:-start-10 backdrop-blur-md bg-dark-600/80 border border-white/10 p-3 rounded-xl shadow-xl flex items-center gap-2 z-20"
              >
                <div className="p-1.5 bg-green-500/20 rounded-lg text-green-400">
                  <ShieldIcon />
                </div>
                <div>
                  <div className="text-[10px] text-gray-400">Status</div>
                  <div className="text-xs font-bold text-white">100% Secure</div>
                </div>
              </motion.div>

            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}