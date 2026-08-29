import { motion } from '../utils/motion';

// ============================================
// 🔧 EDIT YOUR LINKS HERE
// ============================================
const LINKS_CONFIG = {
  // Changed to point to your local APK file in the public/downloads folder
  directDownload: '/downloads/KeyCare-latest.apk', 
  website: 'https://key-care.app',
  instagram: 'https://instagram.com/keycare.app',
  tiktok: '', 
  linkedin: '',
  email: 'mailto:contact@keycare.email',
  waitlist: 'https://key-care.app/#beta',
};
// ============================================

// --- ICONS ---

const AndroidIcon = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.523 15.3414c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.5511 0 .9993.4482.9993.9993.0001.5511-.4482.9997-.9993.9997zm-11.046 0c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.5511 0 .9993.4482.9993.9993 0 .5511-.4482.9997-.9993.9997zM11.9999.6017c-6.3018 0-11.388 4.7758-11.388 10.6303h22.776C23.388 5.3775 18.302.6017 11.9999.6017zm5.526 2.8423l1.434-1.991c.196-.2721.129-.6521-.148-.842-.267-.1971-.652-.1321-.842.148l-1.442 2.001c-1.378-.629-2.898-.988-4.528-.988-1.63 0-3.151.36-4.528.989L5.928.76c-.196-.273-.575-.344-.842-.148-.277.197-.338.577-.148.842l1.434 1.991C2.56 5.337 0 8.65 0 12.4414h24c0-3.7914-2.56-7.1044-6.474-9.9974z"/>
  </svg>
);

const WebsiteIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
  </svg>
);

const InstagramIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

const EmailIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const WaitlistIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

// --- LINKS DATA ---
const links = [
  {
    id: 'download',
    label: 'Download APK',
    subLabel: 'Direct Install (Android)',
    url: LINKS_CONFIG.directDownload,
    icon: <AndroidIcon />,
    primary: true,
  },
  {
    id: 'website',
    label: 'Visit Website',
    url: LINKS_CONFIG.website,
    icon: <WebsiteIcon />,
  },
  {
    id: 'instagram',
    label: 'Follow us on Instagram',
    url: LINKS_CONFIG.instagram,
    icon: <InstagramIcon />,
    show: !!LINKS_CONFIG.instagram,
  },
  {
    id: 'email',
    label: 'Contact Support',
    url: LINKS_CONFIG.email,
    icon: <EmailIcon />,
  },
  {
    id: 'waitlist',
    label: 'Join Beta Program',
    url: LINKS_CONFIG.waitlist,
    icon: <WaitlistIcon />,
  },
].filter(link => link.show !== false && link.url);

// --- ANIMATION VARIANTS ---
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function QRLinks() {
  return (
    <>
      <title>KeyCare Quick Links</title>
      <meta name="description" content="Download KeyCare APK and connect with us." />
      
      {/* Background with Ambient Glow */}
      <div className="fixed inset-0 bg-[#0a0a0a] overflow-hidden -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#00E5C4]/10 blur-[120px] rounded-full mix-blend-screen animate-pulse" style={{ animationDuration: '4s' }} />
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-purple-500/10 blur-[120px] rounded-full mix-blend-screen" />
      </div>

      <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12 relative z-10 font-sans">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="w-full max-w-sm flex flex-col items-center"
        >
          {/* Brand Header */}
          <motion.div variants={itemVariants} className="flex flex-col items-center mb-10">
            <div className="relative group">
              {/* Glow effect behind logo */}
              <div className="absolute -inset-1 bg-gradient-to-r from-[#00E5C4] to-emerald-600 rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
              <img 
                src={`${import.meta.env.BASE_URL}assets/logo.png`}
                alt="KeyCare" 
                className="relative w-24 h-24 rounded-2xl shadow-2xl object-cover ring-1 ring-white/10"
              />
            </div>
            <h1 className="text-3xl font-bold text-white mt-6 tracking-tight">KeyCare</h1>
            <p className="text-gray-400 text-sm mt-2 font-medium">Smart AI Keyboard</p>
          </motion.div>

          {/* Links Container */}
          <div className="w-full space-y-4">
            {links.map((link) => (
              <motion.a
                key={link.id}
                variants={itemVariants}
                href={link.url}
                download={link.id === 'download'} // Forces download for the APK
                target={link.url.startsWith('mailto:') ? '_self' : '_blank'}
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className={`
                  relative overflow-hidden group w-full flex items-center gap-4 p-4 rounded-2xl
                  border transition-all duration-300 backdrop-blur-md
                  ${link.primary 
                    ? 'bg-[#00E5C4] border-[#00E5C4] shadow-[0_0_20px_rgba(0,229,196,0.2)] hover:shadow-[0_0_30px_rgba(0,229,196,0.4)]' 
                    : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-[#00E5C4]/30'
                  }
                `}
              >
                {/* Icon Container */}
                <div className={`
                  flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-xl
                  transition-colors duration-300
                  ${link.primary 
                    ? 'bg-black/10 text-[#052e27]' 
                    : 'bg-white/5 text-[#00E5C4] group-hover:scale-110'
                  }
                `}>
                  {link.icon}
                </div>

                {/* Text */}
                <div className="flex-1 flex flex-col justify-center">
                  <span className={`font-bold text-base ${link.primary ? 'text-[#052e27]' : 'text-white'}`}>
                    {link.label}
                  </span>
                  {link.subLabel && (
                     <span className="text-[#052e27]/70 text-xs font-semibold">
                       {link.subLabel}
                     </span>
                  )}
                </div>

                {/* Arrow Icon */}
                <svg 
                  className={`w-5 h-5 transform transition-transform duration-300 group-hover:translate-x-1 ${link.primary ? 'text-[#052e27]' : 'text-gray-500 group-hover:text-[#00E5C4]'}`} 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>

                {/* Shimmer Effect for Primary Button */}
                {link.primary && (
                  <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent z-20" />
                )}
              </motion.a>
            ))}
          </div>

          {/* Footer */}
          <motion.div
            variants={itemVariants}
            className="mt-12 flex flex-col items-center gap-4"
          >
            <div className="flex gap-2">
               {/* Small Social Dots */}
               <div className="w-2 h-2 rounded-full bg-[#00E5C4]/50 animate-pulse"></div>
               <div className="w-2 h-2 rounded-full bg-[#00E5C4]/30"></div>
               <div className="w-2 h-2 rounded-full bg-[#00E5C4]/10"></div>
            </div>
            
            <p className="text-gray-600 text-xs text-center font-medium">
              <span className="text-gray-400">Built with Codex</span>
            </p>
          </motion.div>

        </motion.div>
      </div>
    </>
  );
}
