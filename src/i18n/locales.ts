import siteContentRaw from "@/site-content.json";

export const LOCALE_COOKIE_NAME = "arkcit-app-assembly-locale";

export const ALL_LANGUAGES = ["EN", "FR", "ES", "KO"] as const;
export const ALL_COUNTRIES = ["gb", "fr", "us", "es", "kr"] as const;

export type AppLanguage = (typeof ALL_LANGUAGES)[number];
export type AppCountry = (typeof ALL_COUNTRIES)[number];
export type AppLocale = `${AppLanguage}-${AppCountry}`;

const siteContent = siteContentRaw as {
  supportedLanguages?: AppLanguage[];
  supportedCountries?: AppCountry[];
  defaultLocale?: string;
};

export const SUPPORTED_LANGUAGES = (
  Array.isArray(siteContent.supportedLanguages) && siteContent.supportedLanguages.length > 0
    ? ALL_LANGUAGES.filter((language) => siteContent.supportedLanguages?.includes(language))
    : ["EN"]
) as AppLanguage[];

export const SUPPORTED_COUNTRIES = (
  Array.isArray(siteContent.supportedCountries) && siteContent.supportedCountries.length > 0
    ? ALL_COUNTRIES.filter((country) => siteContent.supportedCountries?.includes(country))
    : ["gb"]
) as AppCountry[];

const DEFAULT_COUNTRY_BY_LANGUAGE: Record<AppLanguage, AppCountry> = {
  EN: "gb",
  FR: "fr",
  ES: "es",
  KO: "kr",
};

const LANGUAGE_META: Record<AppLanguage, { code: string; label: string; nativeLabel: string }> = {
  EN: { code: "en", label: "English", nativeLabel: "English" },
  FR: { code: "fr", label: "French", nativeLabel: "Francais" },
  ES: { code: "es", label: "Spanish", nativeLabel: "Espanol" },
  KO: { code: "ko", label: "Korean", nativeLabel: "Hangug-eo" },
};

const COUNTRY_META: Record<AppCountry, { code: string; label: string; flagCode: string }> = {
  gb: { code: "gb", label: "United Kingdom", flagCode: "GB" },
  fr: { code: "fr", label: "France", flagCode: "FR" },
  us: { code: "us", label: "United States", flagCode: "US" },
  es: { code: "es", label: "Spain", flagCode: "ES" },
  kr: { code: "kr", label: "South Korea", flagCode: "KR" },
};

export const createLocale = (language: AppLanguage, country: AppCountry): AppLocale =>
  `${language}-${country}` as AppLocale;

export const SUPPORTED_LOCALES = SUPPORTED_LANGUAGES.flatMap((language) =>
  SUPPORTED_COUNTRIES.map((country) => createLocale(language, country)),
) as AppLocale[];

export const isSupportedLanguage = (value: string): value is AppLanguage =>
  ALL_LANGUAGES.includes(value.toUpperCase() as AppLanguage);

export const isSupportedCountry = (value: string): value is AppCountry =>
  ALL_COUNTRIES.includes(value.toLowerCase() as AppCountry);

export const isSupportedLocale = (value: string): value is AppLocale =>
  SUPPORTED_LOCALES.includes(value as AppLocale);

export const getCanonicalLocale = (value: string): AppLocale | null => {
  const normalized = value.trim();
  const match = SUPPORTED_LOCALES.find(
    (locale) => locale.toLowerCase() === normalized.toLowerCase(),
  );

  if (match) {
    return match;
  }

  const [rawLanguage, rawCountry] = normalized.split("-");
  if (!rawLanguage) {
    return null;
  }

  const language = rawLanguage.toUpperCase();
  const country = rawCountry?.toLowerCase();

  if (!isSupportedLanguage(language) || !SUPPORTED_LANGUAGES.includes(language)) {
    return null;
  }

  if (country && isSupportedCountry(country) && SUPPORTED_COUNTRIES.includes(country)) {
    return createLocale(language, country);
  }

  const defaultCountry = DEFAULT_COUNTRY_BY_LANGUAGE[language];
  if (SUPPORTED_COUNTRIES.includes(defaultCountry)) {
    return createLocale(language, defaultCountry);
  }

  return createLocale(language, SUPPORTED_COUNTRIES[0] ?? "gb");
};

const resolvedDefaultLocale = siteContent.defaultLocale
  ? getCanonicalLocale(siteContent.defaultLocale)
  : null;
export const DEFAULT_LOCALE =
  resolvedDefaultLocale ?? createLocale(SUPPORTED_LANGUAGES[0] ?? "EN", SUPPORTED_COUNTRIES[0] ?? "gb");

export const parseLocale = (locale: AppLocale) => {
  const [language, country] = locale.split("-") as [AppLanguage, AppCountry];
  const safeLanguage =
    (LANGUAGE_META[language] ? language : (SUPPORTED_LANGUAGES[0] ?? "EN")) as AppLanguage;
  const safeCountry =
    (COUNTRY_META[country] ? country : (SUPPORTED_COUNTRIES[0] ?? "gb")) as AppCountry;

  return {
    locale,
    language: safeLanguage,
    country: safeCountry,
    region: safeCountry,
    htmlLang: `${LANGUAGE_META[safeLanguage].code}-${safeCountry.toUpperCase()}`,
    languageCode: LANGUAGE_META[safeLanguage].code,
    countryCode: COUNTRY_META[safeCountry].code,
    languageLabel: LANGUAGE_META[safeLanguage].label,
    languageNativeLabel: LANGUAGE_META[safeLanguage].nativeLabel,
    countryLabel: COUNTRY_META[safeCountry].label,
    flagCode: COUNTRY_META[safeCountry].flagCode,
  };
};

export const parseLocaleCookie = (value: string | undefined | null): AppLocale | null => {
  if (!value) {
    return null;
  }

  return getCanonicalLocale(value);
};

const normalizeAcceptLanguageToken = (value: string) =>
  value
    .split(";")[0]
    .trim()
    .replace("_", "-");

export const detectLocaleFromAcceptLanguage = (
  acceptLanguage: string | null | undefined,
): AppLocale | null => {
  if (!acceptLanguage) {
    return null;
  }

  const tokens = acceptLanguage
    .split(",")
    .map(normalizeAcceptLanguageToken)
    .filter(Boolean);

  for (const token of tokens) {
    const exact = getCanonicalLocale(token);
    if (exact) {
      return exact;
    }

    const [rawLanguage, rawCountry] = token.split("-");
    const language = rawLanguage?.toUpperCase();
    const country = rawCountry?.toLowerCase();

    if (language && isSupportedLanguage(language) && SUPPORTED_LANGUAGES.includes(language)) {
      if (country && isSupportedCountry(country) && SUPPORTED_COUNTRIES.includes(country)) {
        return createLocale(language, country);
      }

      const defaultCountry = DEFAULT_COUNTRY_BY_LANGUAGE[language];
      if (SUPPORTED_COUNTRIES.includes(defaultCountry)) {
        return createLocale(language, defaultCountry);
      }

      return createLocale(language, SUPPORTED_COUNTRIES[0] ?? "gb");
    }
  }

  return null;
};

export const resolvePreferredLocale = ({
  cookieLocale,
  acceptLanguage,
}: {
  cookieLocale?: string | null;
  acceptLanguage?: string | null;
}): AppLocale =>
  parseLocaleCookie(cookieLocale) ??
  detectLocaleFromAcceptLanguage(acceptLanguage) ??
  DEFAULT_LOCALE;

export const getLocalePrefix = (locale: AppLocale) => `/${locale}`;

export const withLocalePath = (locale: AppLocale, path: string) => {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return normalizedPath === "/" ? getLocalePrefix(locale) : `${getLocalePrefix(locale)}${normalizedPath}`;
};