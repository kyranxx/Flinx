// Import all locale files
import en from '@/locales/en';
import de from '@/locales/de';
import fr from '@/locales/fr';
import it from '@/locales/it';
import es from '@/locales/es';
import ro from '@/locales/ro';
import nl from '@/locales/nl';
import pl from '@/locales/pl';
import pt from '@/locales/pt';
import el from '@/locales/el';
import cs from '@/locales/cs';
import sv from '@/locales/sv';
import da from '@/locales/da';
import fi from '@/locales/fi';
import no from '@/locales/no';
import hu from '@/locales/hu';
import bg from '@/locales/bg';
import hr from '@/locales/hr';
import sk from '@/locales/sk';
import sl from '@/locales/sl';
import ru from '@/locales/ru';
import uk from '@/locales/uk';
import zh from '@/locales/zh';
import ja from '@/locales/ja';
import hi from '@/locales/hi';
import ar from '@/locales/ar';
import bn from '@/locales/bn';
import tr from '@/locales/tr';
import vi from '@/locales/vi';
import ko from '@/locales/ko';

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
] as const;

export type Language = typeof languages[number]['code'];

export const defaultLanguage: Language = 'en';

export const translations = {
    en,
    de,
    fr,
    it,
    es,
    ro,
    nl,
    pl,
    pt,
    el,
    cs,
    sv,
    da,
    fi,
    no,
    hu,
    bg,
    hr,
    sk,
    sl,
    ru,
    uk,
    zh,
    ja,
    hi,
    ar,
    bn,
    tr,
    vi,
    ko,
};

export function getTranslation(lang: Language) {
    return (translations as any)[lang] || translations.en;
}
