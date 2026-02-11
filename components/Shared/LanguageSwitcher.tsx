import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

const LanguageSwitcher = () => {
  const router = useRouter();
  const { t } = useTranslation('common');
  const { locale, pathname, asPath, query } = router;

  const changeLanguage = (newLocale: string) => {
    router.push({ pathname, query }, asPath, { locale: newLocale });
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => changeLanguage('fr')}
        className={`px-3 py-1 rounded transition-all ${
          locale === 'fr'
            ? 'bg-white text-black font-bold'
            : 'bg-transparent text-white hover:bg-white/20'
        }`}
      >
        FR
      </button>
      <button
        onClick={() => changeLanguage('en')}
        className={`px-3 py-1 rounded transition-all ${
          locale === 'en'
            ? 'bg-white text-black font-bold'
            : 'bg-transparent text-white hover:bg-white/20'
        }`}
      >
        EN
      </button>
    </div>
  );
};

export default LanguageSwitcher;
