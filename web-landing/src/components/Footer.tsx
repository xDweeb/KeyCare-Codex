import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

// --- Social Icons ---
const GithubIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
);

const TwitterIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
);

const LinkedinIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
);

export default function Footer() {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: <GithubIcon />, href: "https://github.com", label: "GitHub" },
    { icon: <TwitterIcon />, href: "https://twitter.com", label: "X (Twitter)" },
    { icon: <LinkedinIcon />, href: "https://linkedin.com", label: "LinkedIn" },
  ];

  return (
    <footer className="bg-dark-900 border-t border-dark-500 pt-16 pb-8">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          {/* Brand Column */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="md:col-span-2"
          >
            <div className="flex items-center gap-3 mb-6">
              <img 
                src={`${import.meta.env.BASE_URL}assets/logo.png`}
                alt="KeyCare" 
                className="w-10 h-10 rounded-xl"
              />
              <span className="text-2xl font-bold text-white tracking-tight">KeyCare</span>
            </div>
            <p className="text-gray-400 max-w-sm mb-6 leading-relaxed">
              {t('footer.tagline') || "Empowering safe communication with AI-driven protection against cyberbullying."}
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social, idx) => (
                <a 
                  key={idx}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-dark-600 flex items-center justify-center text-gray-400 hover:bg-primary-500 hover:text-dark-900 transition-all duration-300"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ delay: 0.1 }}
          >
            <h3 className="text-white font-bold mb-6">{t('footer.links')}</h3>
            <ul className="space-y-4">
              {['features', 'howItWorks', 'beta', 'team'].map((item) => (
                <li key={item}>
                  <a href={`#${item}`} className="text-gray-400 hover:text-primary-500 transition-colors">
                    {t(`nav.${item}`)}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Legal / Contact */}
          <motion.div
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ delay: 0.2 }}
          >
            <h3 className="text-white font-bold mb-6">{t('footer.contact')}</h3>
            <ul className="space-y-4">
              <li>
                <a href="mailto:contact@keycare.email" className="text-gray-400 hover:text-primary-500 transition-colors flex items-center gap-2">
                  <span>📧</span> contact@keycare.email
                </a>
              </li>
              <li>
                <a href="/privacy" className="text-gray-400 hover:text-primary-500 transition-colors">
                  {t('footer.privacy')}
                </a>
              </li>
              <li>
                <a href="/terms" className="text-gray-400 hover:text-primary-500 transition-colors">
                  {t('footer.terms')}
                </a>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="pt-8 border-t border-dark-600 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500"
        >
          <p>© {currentYear} KeyCare. All rights reserved.</p>
          
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500"></span>
              System Operational
            </span>
            <span>Built with Codex</span>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
