import Link from "next/link";
import ReactCountryFlag from "react-country-flag";
import { Badge, Button } from "@arkcit/react-ui/ui";

import { createLocale, parseLocale } from "@/i18n/locales";
import type { AppShellState } from "./shell.types";

const HEADER_LOGO_CLASS_NAMES = {
  small: "h-8 w-auto max-w-[140px] object-contain",
  medium: "h-14 w-auto max-w-[200px] object-contain",
  large: "h-16 w-auto max-w-[220px] object-contain",
} as const;

export function ShellHeader({ shell }: { shell: AppShellState }) {
  const selectedLocale = parseLocale(
    createLocale(shell.selectedLanguage as never, shell.selectedCountry as never),
  );
  const headerLogoClassName = HEADER_LOGO_CLASS_NAMES[shell.layoutContent.header.logoSize];

  return (
    <nav className="sticky top-0 z-50 border-b border-primary-hover bg-primary text-primary-foreground">
      <div className={shell.headerClassName}>
        <div className="flex min-w-0 items-center">
          {shell.layoutContent.header.logoPath ? (
            <img
              src={shell.layoutContent.header.logoPath}
              alt={shell.messages.shell.appName}
              className={headerLogoClassName}
            />
          ) : null}
        </div>
        <div className="text-sm font-semibold uppercase tracking-[0.22em]">
          {shell.messages.shell.appName}
        </div>
        <div className="flex items-center gap-2">
          {shell.layoutContent.header.localePreferencePopinEnabled && !shell.openLocaleFromNavigation ? (
            <button
              type="button"
              onClick={shell.openLocaleDialog}
              className="flex items-center justify-between gap-3 rounded-xl border border-primary-foreground/20 bg-primary-foreground/8 px-4 py-2.5 text-left text-primary-foreground transition-colors hover:bg-primary-foreground/12"
            >
              <div className="flex items-center gap-3">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-primary-foreground/12">
                  <ReactCountryFlag
                    svg
                    countryCode={selectedLocale.flagCode}
                    aria-label={
                      shell.messages.localeMeta.countries[selectedLocale.country] ??
                      selectedLocale.country.toUpperCase()
                    }
                  />
                </span>
                <div className="space-y-1">
                  <div className="text-sm font-semibold">
                    {shell.messages.localeMeta.languages[selectedLocale.language] ??
                      selectedLocale.language}
                  </div>
                  <div className="text-xs text-primary-foreground/75">
                    {shell.messages.localeMeta.countries[selectedLocale.country] ??
                      selectedLocale.country.toUpperCase()}
                  </div>
                </div>
              </div>
              <Badge variant="soft">{selectedLocale.country.toUpperCase()}</Badge>
            </button>
          ) : null}
          {shell.layoutContent.header.navigationMode === "inline" ? (
            <div className="flex flex-wrap items-center gap-3 text-sm font-medium">
              {shell.navigationItems.map((item) => (
                <Link key={item.id} href={item.href}>
                  {item.label}
                </Link>
              ))}
            </div>
          ) : (
            <Button
              variant="ghost"
              onClick={shell.toggleNavigation}
              className="cursor-pointer text-primary-foreground"
            >
              {shell.menuOpen || shell.dropdownOpen
                ? shell.messages.shell.menuClose
                : shell.messages.shell.menuOpen}
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
}
