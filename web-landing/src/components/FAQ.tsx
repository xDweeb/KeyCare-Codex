import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';

// Modern Plus/Minus Icon for Accordion
const AccordionIcon = ({ isOpen }: { isOpen: boolean }) => (
  <motion.div
    animate={{ rotate: isOpen ? 45 : 0 }}
    transition={{ duration: 0.3 }}
    className={`w-8 h-8 rounded-full flex items-center justify-center border transition-colors ${
      isOpen 
        ? 'bg-primary-500 border-primary-500 text-dark-900' 
        : 'bg-dark-600 border-dark-400 text-gray-400 group-hover:border-primary-500 group-hover:text-primary-500'
    }`}
  >
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
    </svg>
  </motion.div>
);

export default function FAQ() {
  const { t } = useTranslation();
  const [openIndex, setOpenIndex] = useState<number | null>(0); // Open first question by default?

  // Ensure you have these keys in your translation files (q1 to q6)
  const faqKeys = ['q1', 'q2', 'q3', 'q4', 'q5', 'q6'];

  return (
    <section id="faq" className="py-24 bg-dark-600 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[120px] -translate-x-1/2 translate-y-1/2" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-primary-400 font-semibold tracking-wider text-sm uppercase mb-2 block">
            {t('faq.label') || 'Support'}
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">
            {t('faq.title')}
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            {t('faq.subtitle')}
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqKeys.map((key, index) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div 
                className={`group rounded-2xl border transition-all duration-300 ${
                  openIndex === index 
                    ? 'bg-dark-500 border-primary-500/50 shadow-lg shadow-primary-500/5' 
                    : 'bg-dark-500/50 border-dark-400 hover:border-dark-300'
                }`}
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full flex items-center justify-between p-6 text-start focus:outline-none"
                >
                  <span className={`text-lg font-semibold pe-4 transition-colors ${
                    openIndex === index ? 'text-white' : 'text-gray-300 group-hover:text-white'
                  }`}>
                    {t(`faq.items.${key}.question`)}
                  </span>
                  
                  <div className="flex-shrink-0 ms-2">
                    <AccordionIcon isOpen={openIndex === index} />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 pt-0 text-gray-400 leading-relaxed border-t border-transparent">
                         {/* Adding a subtle separator if needed via border-top */}
                        <div className="h-px w-full bg-dark-400/50 mb-4"></div>
                        {t(`faq.items.${key}.answer`)}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}