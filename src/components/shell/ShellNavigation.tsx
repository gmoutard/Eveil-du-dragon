import Link from "next/link";
import ReactCountryFlag from "react-country-flag";
import { Badge, Button } from "@arkcit/react-ui/ui";

import { createLocale, parseLocale } from "@/i18n/locales";
import type { AppShellState } from "./shell.types";

export function ShellNavigation({ shell }: { shell: AppShellState }) {
  const selectedLocale = parseLocale(
    createLocale(shell.selectedLanguage as never, shell.selectedCountry as never),
  );

  if (shell.layoutContent.header.navigationMode === "toggle" && shell.menuOpen) {
    return (
      <div className="border-b border-border bg-surface">
        <div className="mx-auto flex max-w-7xl flex-wrap gap-2 px-4 py-3 md:px-8">
          {shell.navigationItems.map((item) => (
            <Link key={item.id} href={item.href}>
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    );
  }

  if (shell.layoutContent.header.navigationMode === "drawer" && shell.menuOpen) {
    return (
      <div className="fixed inset-0 z-[70] bg-black/40 backdrop-blur-sm" onClick={shell.closeNavigation}>
        <aside
          className="absolute right-0 top-0 h-full w-80 max-w-[85vw] overflow-y-auto border-l border-border bg-background p-5 shadow-lg"
          onClick={(event) => event.stopPropagation()}
        >
          <div className="mb-4 flex items-center justify-between gap-3">
            <div className="text-sm font-semibold uppercase tracking-[0.22em]">
              {shell.messages.shell.appName}
            </div>
            <Button variant="ghost" onClick={shell.closeNavigation} className="cursor-pointer">
              {shell.messages.shell.menuClose}
            </Button>
          </div>
          <div className="flex flex-col gap-3 text-sm font-medium">
            {shell.navigationItems.map((item) => (
              <Link key={item.id} href={item.href} onClick={shell.closeNavigation}>
                {item.label}
              </Link>
            ))}
            {shell.layoutContent.header.localePreferencePopinEnabled ? (
              <div className="space-y-2 border-t border-border pt-4">
                <div className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                  {shell.messages.shell.localeSwitcherLabel}
                </div>
                <button
                  type="button"
                  onClick={shell.openLocaleDialog}
                  className="flex w-full items-center justify-between gap-3 rounded-xl border border-border bg-surface px-4 py-3 text-left transition-colors hover:bg-surface-hover"
                >
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-background text-lg">
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
                      <div className="text-sm font-semibold text-foreground">
                        {shell.messages.localeMeta.languages[selectedLocale.language] ??
                          selectedLocale.language}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {shell.messages.localeMeta.countries[selectedLocale.country] ??
                          selectedLocale.country.toUpperCase()}
                      </div>
                    </div>
                  </div>
                  <Badge variant="soft">{selectedLocale.country.toUpperCase()}</Badge>
                </button>
              </div>
            ) : null}
          </div>
        </aside>
      </div>
    );
  }

  if (shell.layoutContent.header.navigationMode === "dropdown" && shell.dropdownOpen) {
    return (
      <div className="fixed inset-0 z-[70]" onClick={shell.closeNavigation}>
        <div
          className="absolute right-4 top-16 z-[75] w-72 rounded-xl border border-border bg-background p-4 text-foreground shadow-lg md:right-8"
          onClick={(event) => event.stopPropagation()}
        >
          <div className="flex flex-col gap-3 text-sm font-medium">
            {shell.navigationItems.map((item) => (
              <Link key={item.id} href={item.href} onClick={shell.closeNavigation}>
                {item.label}
              </Link>
            ))}
            {shell.layoutContent.header.localePreferencePopinEnabled ? (
              <div className="space-y-2 border-t border-border pt-3">
                <div className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                  {shell.messages.shell.localeSwitcherLabel}
                </div>
                <button
                  type="button"
                  onClick={shell.openLocaleDialog}
                  className="flex w-full items-center justify-between gap-3 rounded-xl border border-border bg-surface px-4 py-3 text-left transition-colors hover:bg-surface-hover"
                >
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-background text-lg">
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
                      <div className="text-sm font-semibold text-foreground">
                        {shell.messages.localeMeta.languages[selectedLocale.language] ??
                          selectedLocale.language}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {shell.messages.localeMeta.countries[selectedLocale.country] ??
                          selectedLocale.country.toUpperCase()}
                      </div>
                    </div>
                  </div>
                  <Badge variant="soft">{selectedLocale.country.toUpperCase()}</Badge>
                </button>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    );
  }

  return null;
}
