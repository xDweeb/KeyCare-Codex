import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

// --- Professional SVG Icons ---
const RobotIcon = () => (
  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const PenIcon = () => (
  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
  </svg>
);

const GlobeIcon = () => (
  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const LockIcon = () => (
  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
  </svg>
);

const PaletteIcon = () => (
  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
  </svg>
);

const WifiOffIcon = () => (
  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3l18 18M12.635 6.365a9.001 9.001 0 015.657 1.635m-8.486-.635a9.002 9.002 0 00-5.657 1.635m9.379 2.192a5.002 5.002 0 012.343 1.292m-5.657-.292a5.002 5.002 0 00-2.343 1.292m3.182 1.415a1.998 1.998 0 01.768.417" />
  </svg>
);

export default function Features() {
  const { t } = useTranslation();

  const features = [
    { key: 'aiDetection', icon: <RobotIcon />, color: 'text-blue-400', bg: 'bg-blue-500/10' },
    { key: 'smartRewrite', icon: <PenIcon />, color: 'text-purple-400', bg: 'bg-purple-500/10' },
    { key: 'multiLanguage', icon: <GlobeIcon />, color: 'text-green-400', bg: 'bg-green-500/10' },
    { key: 'privacyFirst', icon: <LockIcon />, color: 'text-red-400', bg: 'bg-red-500/10' },
    { key: 'customizable', icon: <PaletteIcon />, color: 'text-yellow-400', bg: 'bg-yellow-500/10' },
    { key: 'offline', icon: <WifiOffIcon />, color: 'text-gray-400', bg: 'bg-gray-500/10' },
  ];

  return (
    <section id="features" className="py-24 bg-dark-600 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-primary-500/5 rounded-full blur-[100px] -translate-y-1/2" />
      
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-primary-400 font-semibold tracking-wider text-sm uppercase mb-2 block">
            {t('features.subtitle') /* Assuming subtitle is short like "Why KeyCare?" */}
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">
            {t('features.title')}
          </h2>
          <div className="w-20 h-1.5 bg-primary-500 mx-auto rounded-full"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.key}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="group relative p-8 bg-dark-500 rounded-3xl border border-dark-400 hover:border-primary-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-primary-500/10"
            >
              <div className={`w-14 h-14 rounded-2xl ${feature.bg} ${feature.color} flex items-center justify-center mb-6 text-2xl group-hover:scale-110 transition-transform duration-300`}>
                {feature.icon}
              </div>
              
              <h3 className="text-xl font-bold mb-3 text-white group-hover:text-primary-400 transition-colors">
                {t(`features.items.${feature.key}.title`)}
              </h3>
              
              <p className="text-gray-400 leading-relaxed">
                {t(`features.items.${feature.key}.description`)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}