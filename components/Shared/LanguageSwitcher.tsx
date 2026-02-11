import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import AnimateCursorTarget from './AnimateCursorTarget';

const LanguageSwitcher = () => {
  const router = useRouter();
  const { locale, pathname, asPath, query } = router;

  const changeLanguage = (newLocale: string) => {
    router.push({ pathname, query }, asPath, { locale: newLocale });
  };

  return (
    <AnimateCursorTarget type="default">
      <div className="flex flex-col gap-2">
        <motion.button
          onClick={() => changeLanguage('fr')}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
            locale === 'fr'
              ? 'bg-black text-white'
              : 'bg-transparent border border-black text-black hover:bg-gray-100'
          }`}
        >
          FR
        </motion.button>
        <motion.button
          onClick={() => changeLanguage('en')}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
            locale === 'en'
              ? 'bg-black text-white'
              : 'bg-transparent border border-black text-black hover:bg-gray-100'
          }`}
        >
          EN
        </motion.button>
      </div>
    </AnimateCursorTarget>
  );
};

export default LanguageSwitcher;
