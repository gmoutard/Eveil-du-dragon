import type { AppCountry, AppLanguage, AppLocale } from "@/i18n/locales";
import type { AppMessages } from "@/i18n/messages";

export type ShellNavigationMode = "toggle" | "inline" | "drawer" | "dropdown";
export type ShellContentWidth = "xl" | "7xl" | "full";
export type ShellLogoSize = "small" | "medium" | "large";
export type ShellTextAlign = "left" | "center" | "right";

export type ShellLayoutContent = {
  contentWidth: ShellContentWidth;
  header: {
    logoPath: string;
    logoSize: ShellLogoSize;
    navigationMode: ShellNavigationMode;
    localePreferencePopinEnabled: boolean;
  };
  footer: {
    enabled: boolean;
    text: string;
    logoPath: string;
    logoPosition: "left" | "center" | "right";
    logoSize: ShellLogoSize;
    sectionBordersEnabled: boolean;
    sectionBackgroundEnabled: boolean;
    sections: Array<{
      id: string;
      title: string;
      textAlignment?: ShellTextAlign;
      links: Array<{
        id: string;
        label: string;
        href: string;
        localizedHrefs?: Partial<Record<string, string>>;
        localizedLabels?: Partial<Record<string, string>>;
      }>;
    }>;
  };
};

export type ShellNavigationItem = {
  id: string;
  label: string;
  href: string;
};

export type AppShellState = {
  locale: AppLocale;
  messages: AppMessages;
  layoutContent: ShellLayoutContent;
  navigationItems: ShellNavigationItem[];
  menuOpen: boolean;
  dropdownOpen: boolean;
  localeDialogOpen: boolean;
  selectedLanguage: AppLanguage;
  selectedCountry: AppCountry;
  contentWidthClass: string;
  headerClassName: string;
  openLocaleFromNavigation: boolean;
  toggleNavigation: () => void;
  closeNavigation: () => void;
  openLocaleDialog: () => void;
  closeLocaleDialog: () => void;
  setSelectedLanguage: (language: AppLanguage) => void;
  setSelectedCountry: (country: AppCountry) => void;
  applyLocaleSelection: () => void;
};
