import { useTranslation } from 'react-i18next';
import { motion } from '../utils/motion';

// --- Social Icons ---
const LinkedinIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
);

const GithubIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
);

const EmailIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
);

export default function Team() {
  const { t } = useTranslation();

  const members = [
    { 
      key: 'taibi', 
      image: 'taibi.png',
      linkedin: '#',
      github: '#',
    },
    { 
      key: 'mohammed', 
      image: 'mohammed.png',
      linkedin: '#',
      github: '#',
    },
    { 
      key: 'kawtar', 
      image: 'kawtar.png',
      linkedin: '#',
      github: '#',
    },
    { 
      key: 'aya', 
      image: 'aya.png',
      linkedin: '#',
      github: '#',
    },
  ];

  return (
    <section id="team" className="py-24 bg-dark-600 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
           <span className="text-primary-400 font-semibold tracking-wider text-sm uppercase mb-2 block">
            {t('team.subtitle') || 'Our Minds'}
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">
            {t('team.title')}
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {members.map((member, index) => (
            <motion.div
              key={member.key}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.5 }}
              className="group relative h-full"
            >
              {/* Card Container */}
              <div className="relative h-full bg-dark-500/80 backdrop-blur-sm border border-dark-400 rounded-3xl overflow-hidden hover:border-primary-500/40 transition-all duration-500 hover:shadow-2xl hover:shadow-primary-500/10 flex flex-col">
                
                {/* Image Container - Fixed Height */}
                <div className="relative h-64 overflow-hidden flex-shrink-0">
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-primary-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
                  
                  {/* Bottom Gradient for text readability */}
                  <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-dark-500 to-transparent z-10" />
                  
                  {/* Team Member Photo */}
                  <img 
                    src={`${import.meta.env.BASE_URL}assets/team/${member.image}`}
                    alt={t(`team.members.${member.key}.name`)}
                    className="w-full h-full object-cover object-top transform group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                </div>

                {/* Content Section - Flex grow to fill remaining space */}
                <div className="relative p-5 flex flex-col flex-grow">
                  {/* Name - Allow wrapping for long names */}
                  <h3 className="text-base font-bold text-white mb-3 group-hover:text-primary-400 transition-colors duration-300 leading-tight">
                    {t(`team.members.${member.key}.name`)}
                  </h3>
                  
                  {/* Role Bar - Same color and size for all */}
                  <div className="w-full h-2 rounded-full bg-gradient-to-r from-emerald-500 to-teal-400 mb-4" />

                  {/* Social Links - Push to bottom */}
                  <div className="flex gap-2 mt-auto">
                    <a 
                      href={member.linkedin} 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 bg-dark-400/50 text-gray-400 hover:text-white hover:bg-blue-600 rounded-xl transition-all duration-300 hover:scale-110"
                      aria-label="LinkedIn"
                    >
                      <LinkedinIcon />
                    </a>
                    <a 
                      href={member.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 bg-dark-400/50 text-gray-400 hover:text-white hover:bg-dark-300 rounded-xl transition-all duration-300 hover:scale-110"
                      aria-label="GitHub"
                    >
                      <GithubIcon />
                    </a>
                    <a 
                      href={`mailto:${member.key}@keycare.app`}
                      className="p-2.5 bg-dark-400/50 text-gray-400 hover:text-white hover:bg-primary-500 rounded-xl transition-all duration-300 hover:scale-110"
                      aria-label="Email"
                    >
                      <EmailIcon />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
