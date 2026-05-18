export const languages = [
    { code: 'en', name: 'English', flag: 'us' },
    { code: 'de', name: 'Deutsch', flag: 'de' },
    { code: 'fr', name: 'Français', flag: 'fr' },
    { code: 'it', name: 'Italiano', flag: 'it' },
    { code: 'es', name: 'Español', flag: 'es' },
    { code: 'ro', name: 'Română', flag: 'ro' },
    { code: 'nl', name: 'Nederlands', flag: 'nl' },
    { code: 'pl', name: 'Polski', flag: 'pl' },
    { code: 'pt', name: 'Português', flag: 'pt' },
    { code: 'el', name: 'Ελληνικά', flag: 'gr' },
    { code: 'cs', name: 'Čeština', flag: 'cz' },
    { code: 'sv', name: 'Svenska', flag: 'se' },
    { code: 'da', name: 'Dansk', flag: 'dk' },
    { code: 'fi', name: 'Suomi', flag: 'fi' },
    { code: 'no', name: 'Norsk', flag: 'no' },
    { code: 'hu', name: 'Magyar', flag: 'hu' },
    { code: 'bg', name: 'Български', flag: 'bg' },
    { code: 'hr', name: 'Hrvatski', flag: 'hr' },
    { code: 'sk', name: 'Slovenčina', flag: 'sk' },
    { code: 'sl', name: 'Slovenščina', flag: 'si' },
    { code: 'ru', name: 'Русский', flag: 'ru' },
    { code: 'uk', name: 'Українська', flag: 'ua' },
    { code: 'zh', name: '中文', flag: 'cn' },
    { code: 'ja', name: '日本語', flag: 'jp' },
    { code: 'hi', name: 'हिन्दी', flag: 'in' },
    { code: 'ar', name: 'العربية', flag: 'sa' },
    { code: 'bn', name: 'বাংলা', flag: 'bd' },
    { code: 'tr', name: 'Türkçe', flag: 'tr' },
    { code: 'vi', name: 'Tiếng Việt', flag: 'vn' },
    { code: 'ko', name: '한국어', flag: 'kr' },
    { code: 'id', name: 'Bahasa Indonesia', flag: 'id' },
] as const;

export type Language = typeof languages[number]['code'];

export const defaultLanguage: Language = 'en';

export function isLanguage(value: string): value is Language {
    return languages.some((language) => language.code === value);
}
