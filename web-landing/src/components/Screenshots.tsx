import { useTranslation } from 'react-i18next';
import { motion } from '../utils/motion';

export default function Screenshots() {
  const { t } = useTranslation();

  // 📸 تعليمات الصور:
  // يفضل أن تكون الصور بمقاس تقريبي: 400x850 بكسل
  const basePath = import.meta.env.BASE_URL;
  const screenshots = [
    { 
      id: 1, 
      src: `${basePath}assets/screens/screen1.png`, // صورة الكيبورد أثناء الكتابة
      alt: 'Smart Keyboard Interface',
      color: 'shadow-primary-500/20' 
    },
    { 
      id: 2, 
      src: `${basePath}assets/screens/screen2.png`, // صورة اكتشاف المخاطر (لون أحمر/برتقالي)
      alt: 'Risk Detection',
      color: 'shadow-red-500/20'
    },
    { 
      id: 3, 
      src: `${basePath}assets/screens/screen3.png`, // صورة اقتراحات الذكاء الاصطناعي
      alt: 'AI Suggestions',
      color: 'shadow-blue-500/20'
    },
    { 
      id: 4, 
      src: `${basePath}assets/screens/screen4.png`, // صورة الإعدادات
      alt: 'App Settings',
      color: 'shadow-purple-500/20'
    },
  ];

  return (
    <section id="screenshots" className="py-24 bg-dark-600 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary-500/5 rounded-full blur-[120px] translate-x-1/2 -translate-y-1/2" />
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-primary-400 font-semibold tracking-wider text-sm uppercase mb-2 block">
            {t('screenshots.label') || 'Interface'}
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">
            {t('screenshots.title')}
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            {t('screenshots.subtitle')}
          </p>
        </motion.div>

        {/* Grid System */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
          {screenshots.map((screenshot, index) => (
            <motion.div
              key={screenshot.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              whileHover={{ y: -15, scale: 1.02 }}
              className="relative group cursor-pointer"
            >
              {/* Phone Frame Mockup (CSS Only) */}
              <div className={`relative bg-dark-900 rounded-[2.5rem] border-[8px] border-dark-800 shadow-2xl ${screenshot.color} transition-shadow duration-500`}>
                
                {/* Screen Container */}
                <div className="relative rounded-[2rem] overflow-hidden aspect-[9/19] bg-dark-800">
                  {/* The Image */}
                  <img
                    src={screenshot.src}
                    alt={screenshot.alt}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      // Fallback placeholder if image is missing
                      target.src = `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%"><rect width="100%" height="100%" fill="%231a1a1a"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="24" fill="%23333">Screen ${screenshot.id}</text></svg>`;
                    }}
                  />

                  {/* Glass Reflection Effect (Gloss) */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-transparent opacity-50 pointer-events-none rounded-[2rem]" />
                  
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                     <span className="text-white font-medium bg-white/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
                        View
                     </span>
                  </div>
                </div>

                {/* Inner Border Ring for realism */}
                <div className="absolute inset-0 border border-white/5 rounded-[2.5rem] pointer-events-none" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
