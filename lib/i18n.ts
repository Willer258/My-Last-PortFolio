import fr from '../public/locales/fr/common.json'
import en from '../public/locales/en/common.json'

export type Locale = 'fr' | 'en'

const translations = {
  fr,
  en,
}

export function getTranslations(locale: Locale) {
  return translations[locale]
}
