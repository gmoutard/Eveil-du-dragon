import pagesContent from "@/pages-content.json";
import type { AppLanguage, AppLocale } from "@/i18n/locales";
import {
  getLocalePrefix,
  SUPPORTED_LANGUAGES,
  SUPPORTED_LOCALES,
  withLocalePath,
} from "@/i18n/locales";
import type { AppMessages } from "@/i18n/messages";

type AppAssemblyRoutePage = {
  id: string;
  sourcePageName: string;
  routePath: string;
  localizedRoutePaths?: Partial<Record<AppLanguage, string>>;
  pageTitle: string;
  navigationLabel: string;
  localizedNavigationLabels?: Partial<Record<AppLanguage, string>>;
  includeInNavigation: boolean;
};

const manifest = pagesContent as { pages: AppAssemblyRoutePage[] };

function normalizeRoutePath(path: string) {
  const trimmed = path.trim();
  if (!trimmed || trimmed === "/") {
    return "/";
  }

  return `/${trimmed.replace(/^\/+/, "").replace(/\/+$/g, "")}`;
}

export function resolveLocalizedRoutePath(page: AppAssemblyRoutePage, locale: AppLocale) {
  const language = locale.split("-")[0] as AppLanguage;
  const explicitRoute = page.localizedRoutePaths?.[language]?.trim();
  if (explicitRoute) {
    return normalizeRoutePath(explicitRoute);
  }

  const englishRoute = page.localizedRoutePaths?.EN?.trim();
  if (englishRoute) {
    return normalizeRoutePath(englishRoute);
  }

  const firstConfiguredLanguage = SUPPORTED_LANGUAGES[0];
  const firstConfiguredRoute = firstConfiguredLanguage
    ? page.localizedRoutePaths?.[firstConfiguredLanguage]?.trim()
    : "";
  if (firstConfiguredRoute) {
    return normalizeRoutePath(firstConfiguredRoute);
  }

  return normalizeRoutePath(page.routePath);
}

function resolveLocalizedNavigationLabel(page: AppAssemblyRoutePage, locale: AppLocale) {
  const language = locale.split("-")[0] as AppLanguage;
  const explicitLabel = page.localizedNavigationLabels?.[language]?.trim();
  if (explicitLabel) {
    return explicitLabel;
  }

  const englishLabel = page.localizedNavigationLabels?.EN?.trim();
  if (englishLabel) {
    return englishLabel;
  }

  const firstConfiguredLanguage = SUPPORTED_LANGUAGES[0];
  const firstConfiguredLabel = firstConfiguredLanguage
    ? page.localizedNavigationLabels?.[firstConfiguredLanguage]?.trim()
    : "";
  if (firstConfiguredLabel) {
    return firstConfiguredLabel;
  }

  return page.navigationLabel || page.pageTitle || resolveLocalizedRoutePath(page, locale);
}

type LocalizedLinkLike = {
  href: string;
  label: string;
  localizedHrefs?: Partial<Record<AppLanguage, string>>;
  localizedLabels?: Partial<Record<AppLanguage, string>>;
};

function normalizeLocalizedLinkHref(href: string) {
  const trimmed = href.trim();
  if (!trimmed) {
    return "/";
  }

  if (/^(https?:|mailto:|tel:|#)/i.test(trimmed)) {
    return trimmed;
  }

  return normalizeRoutePath(trimmed);
}

export function resolveLocalizedLinkHref(link: LocalizedLinkLike, locale: AppLocale) {
  const language = locale.split("-")[0] as AppLanguage;
  const explicitHref = link.localizedHrefs?.[language]?.trim();
  if (explicitHref) {
    const resolvedHref = normalizeLocalizedLinkHref(explicitHref);
    return /^(https?:|mailto:|tel:|#)/i.test(resolvedHref)
      ? resolvedHref
      : withLocalePath(locale, resolvedHref);
  }

  const englishHref = link.localizedHrefs?.EN?.trim();
  if (englishHref) {
    const resolvedHref = normalizeLocalizedLinkHref(englishHref);
    return /^(https?:|mailto:|tel:|#)/i.test(resolvedHref)
      ? resolvedHref
      : withLocalePath(locale, resolvedHref);
  }

  const firstConfiguredLanguage = SUPPORTED_LANGUAGES[0];
  const firstConfiguredHref = firstConfiguredLanguage
    ? link.localizedHrefs?.[firstConfiguredLanguage]?.trim()
    : "";
  if (firstConfiguredHref) {
    const resolvedHref = normalizeLocalizedLinkHref(firstConfiguredHref);
    return /^(https?:|mailto:|tel:|#)/i.test(resolvedHref)
      ? resolvedHref
      : withLocalePath(locale, resolvedHref);
  }

  const fallbackHref = normalizeLocalizedLinkHref(link.href);
  return /^(https?:|mailto:|tel:|#)/i.test(fallbackHref)
    ? fallbackHref
    : withLocalePath(locale, fallbackHref);
}

export function resolveLocalizedLinkLabel(link: LocalizedLinkLike, locale: AppLocale) {
  const language = locale.split("-")[0] as AppLanguage;
  const explicitLabel = link.localizedLabels?.[language]?.trim();
  if (explicitLabel) {
    return explicitLabel;
  }

  const englishLabel = link.localizedLabels?.EN?.trim();
  if (englishLabel) {
    return englishLabel;
  }

  const firstConfiguredLanguage = SUPPORTED_LANGUAGES[0];
  const firstConfiguredLabel = firstConfiguredLanguage
    ? link.localizedLabels?.[firstConfiguredLanguage]?.trim()
    : "";
  if (firstConfiguredLabel) {
    return firstConfiguredLabel;
  }

  return link.label.trim() || "Link";
}

export function getNavigationItems(locale: AppLocale, messages: AppMessages) {
  const pages = Array.isArray(manifest.pages) ? manifest.pages : [];
  const navigationPages = pages.filter((page) => page.includeInNavigation);

  if (navigationPages.length === 0) {
    return [{ id: "home", label: messages.nav.home, href: withLocalePath(locale, "/") }];
  }

  return navigationPages.map((page) => ({
    id: page.id,
    label: resolveLocalizedNavigationLabel(page, locale),
    href: withLocalePath(locale, resolveLocalizedRoutePath(page, locale)),
  }));
}

export function findPageByRoutePath(routePath: string, locale?: AppLocale) {
  const normalizedRoutePath = normalizeRoutePath(routePath);
  const pages = Array.isArray(manifest.pages) ? manifest.pages : [];
  if (locale) {
    const localizedMatch = pages.find(
      (page) => resolveLocalizedRoutePath(page, locale) === normalizedRoutePath,
    );
    if (localizedMatch) {
      return localizedMatch;
    }
  }

  return pages.find((page) =>
    SUPPORTED_LOCALES.some(
      (candidateLocale) => resolveLocalizedRoutePath(page, candidateLocale) === normalizedRoutePath,
    ),
  ) ?? null;
}

export function findHomePage() {
  const pages = Array.isArray(manifest.pages) ? manifest.pages : [];
  return pages.find((page) => normalizeRoutePath(page.routePath) === "/") ?? null;
}

export function switchPageLocalePath(
  pathname: string,
  currentLocale: AppLocale,
  nextLocale: AppLocale,
) {
  const currentPrefix = getLocalePrefix(currentLocale);
  const suffix = pathname.startsWith(currentPrefix)
    ? pathname.slice(currentPrefix.length) || "/"
    : pathname || "/";
  const normalizedSuffix = normalizeRoutePath(suffix);
  const page = findPageByRoutePath(normalizedSuffix, currentLocale);

  if (page) {
    return withLocalePath(nextLocale, resolveLocalizedRoutePath(page, nextLocale));
  }

  return withLocalePath(nextLocale, normalizedSuffix);
}