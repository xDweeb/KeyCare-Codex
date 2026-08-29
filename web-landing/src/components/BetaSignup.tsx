import { useState, FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from '../utils/motion';

// --- Icons ---
const RocketIcon = () => (
  <svg className="w-8 h-8 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
);

const LockIcon = () => (
  <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
  </svg>
);

const CheckCircleIcon = () => (
  <svg className="w-16 h-16 text-green-500 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const MailIcon = () => (
  <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

export default function BetaSignup() {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error' | 'config-error'>('idle');

  const formspreeUrl = import.meta.env.VITE_FORMSPREE_URL;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!formspreeUrl) {
      setStatus('config-error');
      return;
    }

    setStatus('loading');

    try {
      const response = await fetch(formspreeUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setStatus('success');
        setEmail('');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <section id="beta" className="py-24 relative overflow-hidden bg-dark-600">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-primary-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <div className="relative bg-dark-500/50 backdrop-blur-xl border border-dark-400 rounded-3xl p-8 md:p-12 shadow-2xl overflow-hidden">
            
            {/* Decorative Top Border */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary-500 to-transparent opacity-50" />

            <div className="text-center mb-10">
              <div className="w-16 h-16 mx-auto mb-6 bg-dark-400 rounded-2xl flex items-center justify-center ring-1 ring-white/10 shadow-lg">
                <RocketIcon />
              </div>

              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
                {t('beta.title')}
              </h2>
              <p className="text-gray-400 max-w-lg mx-auto text-lg">
                {t('beta.subtitle')}
              </p>
            </div>

            <div className="max-w-md mx-auto">
              <AnimatePresence mode="wait">
                {status === 'success' ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="text-center py-8 bg-green-500/10 border border-green-500/20 rounded-2xl"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200, damping: 10 }}
                    >
                      <CheckCircleIcon />
                    </motion.div>
                    <h3 className="text-xl font-bold text-white mt-4 mb-2">You're on the list!</h3>
                    <p className="text-green-400">{t('beta.success')}</p>
                  </motion.div>
                ) : status === 'config-error' ? (
                  <motion.div 
                    key="error"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-4 text-center"
                  >
                    <p className="text-yellow-500 font-medium">{t('beta.configError')}</p>
                    <p className="text-xs text-yellow-500/70 mt-1">Check your .env file</p>
                  </motion.div>
                ) : (
                  <motion.form 
                    key="form"
                    onSubmit={handleSubmit} 
                    className="space-y-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="relative group">
                      <div className="absolute inset-y-0 start-0 ps-4 flex items-center pointer-events-none">
                        <MailIcon />
                      </div>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder={t('beta.emailPlaceholder') || "Enter your email address"}
                        required
                        disabled={!formspreeUrl || status === 'loading'}
                        className="w-full bg-dark-600 text-white placeholder-gray-500 border border-dark-300 rounded-xl py-4 ps-12 pe-4 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all shadow-inner disabled:opacity-50 disabled:cursor-not-allowed"
                      />
                    </div>
                    
                    <button
                      type="submit"
                      disabled={status === 'loading' || !formspreeUrl}
                      className="w-full bg-primary-500 hover:bg-primary-400 text-dark-900 font-bold py-4 rounded-xl shadow-[0_0_20px_rgba(0,229,196,0.3)] hover:shadow-[0_0_30px_rgba(0,229,196,0.5)] transition-all transform active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {status === 'loading' ? (
                        <>
                          <svg className="animate-spin h-5 w-5 text-dark-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          <span>{t('beta.submitting')}</span>
                        </>
                      ) : (
                        <span>{t('beta.submit')}</span>
                      )}
                    </button>

                    {status === 'error' && (
                      <motion.p 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-red-400 text-sm text-center bg-red-500/10 py-2 rounded-lg"
                      >
                        {t('beta.error')}
                      </motion.p>
                    )}

                    <div className="flex items-center justify-center gap-2 text-dark-300 text-sm pt-2">
                      <LockIcon />
                      <p>{t('beta.privacyNote')}</p>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
