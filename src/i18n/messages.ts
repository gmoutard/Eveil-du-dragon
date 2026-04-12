import siteContentRaw from "@/site-content.json";
import { DEFAULT_LOCALE, SUPPORTED_LOCALES, type AppLanguage, type AppLocale } from "@/i18n/locales";

export type AppMessages = {
  localeMeta: {
    languages: Record<AppLanguage, string>;
    countries: Record<string, string>;
    selectedOption: string;
  };
  shell: {
    appName: string;
    menuOpen: string;
    menuClose: string;
    signIn: string;
    account: string;
    authenticatedSession: string;
    authProvidersCount: string;
    authSectionTitle: string;
    authDialogTitle: string;
    authDialogAuthenticatedTitle: string;
    authDialogDescription: string;
    authDialogAuthenticatedDescription: string;
    authenticatedUserFallback: string;
    signOut: string;
    localeSwitcherLabel: string;
    localeDialogTitle: string;
    localeDialogClose: string;
    localeDialogApply: string;
    localeDialogDescription: string;
    languageSectionTitle: string;
    countrySectionTitle: string;
  };
  nav: {
    home: string;
    components: string;
    quickOnboarding: string;
    studio: string;
  };
  pages: {
    homeTitle: string;
    homeDescription: string;
    componentsTitle: string;
    componentsDescription: string;
    quickOnboardingTitle: string;
    quickOnboardingDescription: string;
    studioTitle: string;
    studioDescription: string;
    unauthorizedTitle: string;
    unauthorizedDescription: string;
    unauthorizedAction: string;
  };
};

const siteContent = siteContentRaw as {
  siteTitle: string;
  descriptions: Partial<Record<AppLanguage, string>>;
  supportedLanguages?: AppLanguage[];
  supportedCountries?: string[];
  defaultLocale?: string;
};

const fallbackDescriptions: Partial<Record<AppLanguage, string>> = {
  EN: "Homepage rendered from the Studio backend when available.",
  FR: "Page d'accueil rendue depuis le backend Studio quand il est disponible.",
  ES: "Homepage rendered from the Studio backend when available.",
  KO: "Homepage rendered from the Studio backend when available.",
};

const getSiteDescription = (locale: AppLocale) => {
  const language = locale.split("-")[0] as AppLanguage;
  return siteContent.descriptions[language] ?? fallbackDescriptions[language] ?? "";
};

const catalogsByLanguage: Record<
  AppLanguage,
  Omit<AppMessages, "shell" | "localeMeta"> & {
    shellLabels: AppMessages["shell"];
    localeMeta: AppMessages["localeMeta"];
  }
> = {
  EN: {
    localeMeta: {
      languages: { EN: "English", FR: "French", ES: "Spanish", KO: "Korean" },
      countries: {
        gb: "United Kingdom",
        fr: "France",
        us: "United States",
        es: "Spain",
        kr: "South Korea",
      },
      selectedOption: "Selected",
    },
    shellLabels: {
      appName: siteContent.siteTitle,
      menuOpen: "Menu",
      menuClose: "Close",
      signIn: "Sign in",
      account: "Account",
      authenticatedSession: "session",
      authProvidersCount: "provider(s)",
      authSectionTitle: "Authentication",
      authDialogTitle: "Sign in",
      authDialogAuthenticatedTitle: "Account",
      authDialogDescription: "Choose one of the configured providers to authenticate.",
      authDialogAuthenticatedDescription: "Manage your current authenticated session.",
      authenticatedUserFallback: "Authenticated user",
      signOut: "Sign out",
      localeSwitcherLabel: "Language and country",
      localeDialogTitle: "Language and Country",
      localeDialogClose: "Close",
      localeDialogApply: "Apply",
      localeDialogDescription: "Choose the language and country shown in the route.",
      languageSectionTitle: "Language",
      countrySectionTitle: "Country",
    },
    nav: {
      home: "Home",
      components: "Components",
      quickOnboarding: "Quick Onboarding",
      studio: "Studio",
    },
    pages: {
      homeTitle: "Home",
      homeDescription: getSiteDescription(DEFAULT_LOCALE),
      componentsTitle: "Components",
      componentsDescription: "Use this route to assemble a localized component explorer next.",
      quickOnboardingTitle: "Quick Onboarding",
      quickOnboardingDescription: "Guide application bootstrap and schema-driven setup from here.",
      studioTitle: "Studio",
      studioDescription: "Link this route to the Studio host or an embedded authoring experience.",
      unauthorizedTitle: "Unauthorized",
      unauthorizedDescription: "Your account does not have the minimum role required to open this page.",
      unauthorizedAction: "Back to home",
    },
  },
  FR: {
    localeMeta: {
      languages: { EN: "Anglais", FR: "Français", ES: "Espagnol", KO: "Coréen" },
      countries: {
        gb: "Royaume-Uni",
        fr: "France",
        us: "États-Unis",
        es: "Espagne",
        kr: "Corée du Sud",
      },
      selectedOption: "Sélectionné",
    },
    shellLabels: {
      appName: siteContent.siteTitle,
      menuOpen: "Menu",
      menuClose: "Fermer",
      signIn: "Se connecter",
      account: "Compte",
      authenticatedSession: "session",
      authProvidersCount: "provider(s)",
      authSectionTitle: "Authentification",
      authDialogTitle: "Se connecter",
      authDialogAuthenticatedTitle: "Compte",
      authDialogDescription: "Choisis un des providers configurés pour t'authentifier.",
      authDialogAuthenticatedDescription: "Gère ta session authentifiée actuelle.",
      authenticatedUserFallback: "Utilisateur authentifié",
      signOut: "Se déconnecter",
      localeSwitcherLabel: "Langue et pays",
      localeDialogTitle: "Langue et pays",
      localeDialogClose: "Fermer",
      localeDialogApply: "Appliquer",
      localeDialogDescription: "Choisis la langue et le pays affichés dans l'URL.",
      languageSectionTitle: "Langue",
      countrySectionTitle: "Pays",
    },
    nav: {
      home: "Accueil",
      components: "Composants",
      quickOnboarding: "Onboarding rapide",
      studio: "Studio",
    },
    pages: {
      homeTitle: "Accueil",
      homeDescription: getSiteDescription("FR-fr" as AppLocale),
      componentsTitle: "Composants",
      componentsDescription: "Utilise cette route pour assembler ensuite un explorer de composants localisé.",
      quickOnboardingTitle: "Onboarding rapide",
      quickOnboardingDescription: "Guide ici le bootstrap applicatif et la mise en place orientée schéma.",
      studioTitle: "Studio",
      studioDescription: "Branche cette route au host Studio ou à une expérience d'authoring embarquée.",
      unauthorizedTitle: "Accès non autorisé",
      unauthorizedDescription: "Ton compte n'a pas le rôle minimum requis pour ouvrir cette page.",
      unauthorizedAction: "Retour à l'accueil",
    },
  },
  ES: {
    localeMeta: {
      languages: { EN: "Inglés", FR: "Francés", ES: "Español", KO: "Coreano" },
      countries: {
        gb: "Reino Unido",
        fr: "Francia",
        us: "Estados Unidos",
        es: "España",
        kr: "Corea del Sur",
      },
      selectedOption: "Seleccionado",
    },
    shellLabels: {
      appName: siteContent.siteTitle,
      menuOpen: "Menu",
      menuClose: "Cerrar",
      signIn: "Iniciar sesión",
      account: "Cuenta",
      authenticatedSession: "sesión",
      authProvidersCount: "provider(s)",
      authSectionTitle: "Autenticación",
      authDialogTitle: "Iniciar sesión",
      authDialogAuthenticatedTitle: "Cuenta",
      authDialogDescription: "Elige uno de los proveedores configurados para autenticarte.",
      authDialogAuthenticatedDescription: "Administra tu sesión autenticada actual.",
      authenticatedUserFallback: "Usuario autenticado",
      signOut: "Cerrar sesión",
      localeSwitcherLabel: "Idioma y país",
      localeDialogTitle: "Idioma y país",
      localeDialogClose: "Cerrar",
      localeDialogApply: "Aplicar",
      localeDialogDescription: "Elige el idioma y el país mostrados en la ruta.",
      languageSectionTitle: "Idioma",
      countrySectionTitle: "País",
    },
    nav: {
      home: "Inicio",
      components: "Componentes",
      quickOnboarding: "Onboarding rapido",
      studio: "Studio",
    },
    pages: {
      homeTitle: "Inicio",
      homeDescription: getSiteDescription("ES-es" as AppLocale),
      componentsTitle: "Componentes",
      componentsDescription: "Usa esta ruta para ensamblar despues un explorador de componentes localizado.",
      quickOnboardingTitle: "Onboarding rapido",
      quickOnboardingDescription: "Guia aqui el bootstrap de la aplicacion y la configuracion orientada por esquemas.",
      studioTitle: "Studio",
      studioDescription: "Conecta esta ruta al host de Studio o a una experiencia embebida de authoring.",
      unauthorizedTitle: "Acceso no autorizado",
      unauthorizedDescription: "Tu cuenta no tiene el rol minimo requerido para abrir esta pagina.",
      unauthorizedAction: "Volver al inicio",
    },
  },
  KO: {
    localeMeta: {
      languages: { EN: "영어", FR: "프랑스어", ES: "스페인어", KO: "한국어" },
      countries: {
        gb: "영국",
        fr: "프랑스",
        us: "미국",
        es: "스페인",
        kr: "대한민국",
      },
      selectedOption: "선택됨",
    },
    shellLabels: {
      appName: siteContent.siteTitle,
      menuOpen: "메뉴",
      menuClose: "닫기",
      signIn: "로그인",
      account: "계정",
      authenticatedSession: "세션",
      authProvidersCount: "provider(s)",
      authSectionTitle: "인증",
      authDialogTitle: "로그인",
      authDialogAuthenticatedTitle: "계정",
      authDialogDescription: "구성된 provider 중 하나를 선택해 인증하세요.",
      authDialogAuthenticatedDescription: "현재 인증된 세션을 관리하세요.",
      authenticatedUserFallback: "인증된 사용자",
      signOut: "로그아웃",
      localeSwitcherLabel: "언어 및 국가",
      localeDialogTitle: "언어 및 국가",
      localeDialogClose: "닫기",
      localeDialogApply: "적용",
      localeDialogDescription: "경로에 표시할 언어와 국가를 선택하세요.",
      languageSectionTitle: "언어",
      countrySectionTitle: "국가",
    },
    nav: {
      home: "Home",
      components: "Components",
      quickOnboarding: "Quick Onboarding",
      studio: "Studio",
    },
    pages: {
      homeTitle: "Home",
      homeDescription: getSiteDescription("KO-kr" as AppLocale),
      componentsTitle: "Components",
      componentsDescription: "Use this route to assemble a localized component explorer next.",
      quickOnboardingTitle: "Quick Onboarding",
      quickOnboardingDescription: "Guide application bootstrap and schema-driven setup from here.",
      studioTitle: "Studio",
      studioDescription: "Link this route to the Studio host or an embedded authoring experience.",
      unauthorizedTitle: "접근 권한 없음",
      unauthorizedDescription: "이 페이지를 열기 위한 최소 역할이 현재 계정에 없습니다.",
      unauthorizedAction: "홈으로 돌아가기",
    },
  },
};

const catalogs = Object.fromEntries(
  SUPPORTED_LOCALES.map((locale) => {
    const language = locale.split("-")[0] as AppLanguage;
    const baseCatalog = catalogsByLanguage[language] ?? catalogsByLanguage.EN;
    return [
      locale,
      {
        localeMeta: baseCatalog.localeMeta,
        shell: baseCatalog.shellLabels,
        nav: baseCatalog.nav,
        pages: {
          ...baseCatalog.pages,
          homeDescription: getSiteDescription(locale),
        },
      } satisfies AppMessages,
    ];
  }),
) as Record<AppLocale, AppMessages>;

export function getMessages(locale: AppLocale): AppMessages {
  return catalogs[locale] ?? catalogs[DEFAULT_LOCALE];
}