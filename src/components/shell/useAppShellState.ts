"use client";

import { useState } from "react";

import {
  createLocale,
  LOCALE_COOKIE_NAME,
  SUPPORTED_COUNTRIES,
  SUPPORTED_LANGUAGES,
  type AppCountry,
  type AppLanguage,
  type AppLocale,
} from "@/i18n/locales";
import type { AppMessages } from "@/i18n/messages";
import { switchPageLocalePath } from "@/lib/routes";
import type { AppShellState, ShellLayoutContent, ShellNavigationItem } from "./shell.types";

type UseAppShellStateArgs = {
  locale: AppLocale;
  messages: AppMessages;
  layoutContent: ShellLayoutContent;
  navigationItems: ShellNavigationItem[];
};

export function useAppShellState({
  locale,
  messages,
  layoutContent,
  navigationItems,
}: UseAppShellStateArgs): AppShellState {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [localeDialogOpen, setLocaleDialogOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<AppLanguage>(
    (locale.split("-")[0] as AppLanguage) ?? (SUPPORTED_LANGUAGES[0] ?? "EN"),
  );
  const [selectedCountry, setSelectedCountry] = useState<AppCountry>(
    (locale.split("-")[1] as AppCountry) ?? (SUPPORTED_COUNTRIES[0] ?? "gb"),
  );

  const contentWidthClass =
    layoutContent.contentWidth === "full"
      ? "max-w-none"
      : layoutContent.contentWidth === "xl"
        ? "max-w-xl"
        : "max-w-7xl";
  const headerClassName =
    layoutContent.header.navigationMode === "inline"
      ? "mx-auto flex min-h-14 max-w-7xl flex-wrap items-center justify-between gap-3 px-4 md:px-8"
      : "mx-auto flex min-h-14 max-w-7xl items-center justify-between gap-3 px-4 md:px-8";
  const openLocaleFromNavigation =
    layoutContent.header.navigationMode === "drawer" ||
    layoutContent.header.navigationMode === "dropdown";

  const closeNavigation = () => {
    setMenuOpen(false);
    setDropdownOpen(false);
  };

  const toggleNavigation = () => {
    if (layoutContent.header.navigationMode === "dropdown") {
      setDropdownOpen((previous) => !previous);
      setMenuOpen(false);
      return;
    }

    setMenuOpen((previous) => !previous);
    setDropdownOpen(false);
  };

  const openLocaleDialog = () => {
    setLocaleDialogOpen(true);
    closeNavigation();
  };

  const closeLocaleDialog = () => {
    setLocaleDialogOpen(false);
  };

  const applyLocaleSelection = () => {
    if (typeof document === "undefined" || typeof window === "undefined") {
      return;
    }

    const nextLocale = createLocale(selectedLanguage, selectedCountry);
    const nextPath = switchPageLocalePath(window.location.pathname, locale, nextLocale);
    document.cookie = `${LOCALE_COOKIE_NAME}=${nextLocale}; path=/; max-age=${60 * 60 * 24 * 365}; samesite=lax`;
    setLocaleDialogOpen(false);
    closeNavigation();
    window.location.assign(`${nextPath}${window.location.search}${window.location.hash}`);
  };

  return {
    locale,
    messages,
    layoutContent,
    navigationItems,
    menuOpen,
    dropdownOpen,
    localeDialogOpen,
    selectedLanguage,
    selectedCountry,
    contentWidthClass,
    headerClassName,
    openLocaleFromNavigation,
    toggleNavigation,
    closeNavigation,
    openLocaleDialog,
    closeLocaleDialog,
    setSelectedLanguage,
    setSelectedCountry,
    applyLocaleSelection,
  };
}
