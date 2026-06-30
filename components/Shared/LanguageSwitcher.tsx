import { useRouter } from 'next/router';
import { motion } from 'framer-motion';

const LanguageSwitcher = () => {
  const router = useRouter();
  const { locale, pathname, asPath, query } = router;

  const changeLanguage = (newLocale: string) => {
    document.cookie = `NEXT_LOCALE=${newLocale};path=/;max-age=31536000;SameSite=Lax`;
    router.push({ pathname, query }, asPath, { locale: newLocale });
  };

  return (
    <div className="flex gap-3" role="group" aria-label="Language">
      <motion.button
        type="button"
        onClick={() => changeLanguage('fr')}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Français"
        aria-current={locale === 'fr' ? 'true' : undefined}
        className={`font-heading text-[10px] tracking-widest uppercase transition-all duration-200 ${
          locale === 'fr'
            ? 'text-white font-bold'
            : 'text-white/60 hover:text-white/90'
        }`}
      >
        FR
      </motion.button>
      <span className="text-white/15 text-[10px]">/</span>
      <motion.button
        type="button"
        onClick={() => changeLanguage('en')}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="English"
        aria-current={locale === 'en' ? 'true' : undefined}
        className={`font-heading text-[10px] tracking-widest uppercase transition-all duration-200 ${
          locale === 'en'
            ? 'text-white font-bold'
            : 'text-white/60 hover:text-white/90'
        }`}
      >
        EN
      </motion.button>
    </div>
  );
};

export default LanguageSwitcher;
