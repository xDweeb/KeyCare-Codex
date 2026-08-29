import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

// --- Icons ---
const KeyboardIcon = () => (
  <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
  </svg>
);

const ScanIcon = () => (
  <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
  </svg>
);

const MagicIcon = () => (
  <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
);

export default function HowItWorks() {
  const { t } = useTranslation();

  const steps = [
    { key: 'type', icon: <KeyboardIcon />, color: 'from-blue-500 to-indigo-600', shadow: 'shadow-blue-500/20' },
    { key: 'detect', icon: <ScanIcon />, color: 'from-orange-500 to-red-500', shadow: 'shadow-orange-500/20' },
    { key: 'rewrite', icon: <MagicIcon />, color: 'from-primary-500 to-emerald-500', shadow: 'shadow-primary-500/20' },
  ];

  return (
    <section className="py-24 bg-dark-600 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 relative">
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">
            {t('howItWorks.title')}
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            {t('howItWorks.subtitle')}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 relative">
          {steps.map((step, index) => (
            <motion.div
              key={step.key}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="relative"
            >
              {/* Connector Line (Hidden on Mobile) */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-10 ltr:left-1/2 rtl:right-1/2 w-full h-0.5 bg-dark-400 -z-10">
                  <div className="absolute inset-0 bg-gradient-to-r rtl:bg-gradient-to-l from-transparent via-primary-500/50 to-transparent opacity-50" />
                </div>
              )}

              <div className="relative z-10 flex flex-col items-center text-center group">
                
                {/* Step Number (Background) */}
                <div className="absolute -top-10 text-[8rem] font-bold text-dark-500/30 select-none pointer-events-none -z-10 group-hover:text-dark-500/50 transition-colors">
                  0{index + 1}
                </div>

                {/* Icon Circle */}
                <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center mb-8 shadow-xl ${step.shadow} group-hover:scale-110 transition-transform duration-300 ring-4 ring-dark-600`}>
                  {step.icon}
                </div>

                <h3 className="text-2xl font-bold mb-4 text-white">
                  {t(`howItWorks.steps.${step.key}.title`)}
                </h3>
                
                <p className="text-gray-400 leading-relaxed max-w-xs mx-auto">
                  {t(`howItWorks.steps.${step.key}.description`)}
                </p>

                {/* Pulse Effect for current step */}
                <div className={`absolute inset-0 bg-gradient-to-br ${step.color} opacity-0 group-hover:opacity-5 blur-2xl transition-opacity duration-500 rounded-full`} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}