import ReactCountryFlag from "react-country-flag";
import { Badge, Button } from "@arkcit/react-ui/ui";

import { createLocale, parseLocale, SUPPORTED_COUNTRIES, SUPPORTED_LANGUAGES } from "@/i18n/locales";
import type { AppCountry, AppLanguage } from "@/i18n/locales";
import type { AppShellState } from "./shell.types";

interface LocaleOptionButtonProps {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

const LocaleOptionButton = ({ active, onClick, children }: LocaleOptionButtonProps) => (
  <button
    type="button"
    onClick={onClick}
    className={[
      "flex w-full flex-col items-start gap-3 rounded-xl border px-4 py-3 text-left transition-colors sm:flex-row sm:items-center sm:justify-between",
      active
        ? "border-primary bg-primary-soft text-foreground shadow-sm"
        : "border-border bg-surface text-foreground hover:border-primary/40 hover:bg-surface-hover",
    ].join(" ")}
  >
    {children}
  </button>
);

export function LocalePreferenceDialog({ shell }: { shell: AppShellState }) {
  if (!shell.layoutContent.header.localePreferencePopinEnabled || !shell.localeDialogOpen) {
    return null;
  }

  const selectedLanguage = shell.selectedLanguage as AppLanguage;
  const selectedCountry = shell.selectedCountry as AppCountry;
  const selectedLocale = parseLocale(createLocale(selectedLanguage, selectedCountry));

  return (
    <div className="fixed inset-0 z-[80] bg-black/40 backdrop-blur-sm" onClick={shell.closeLocaleDialog}>
      <div className="flex min-h-full items-center justify-center px-4 py-8">
        <div
          className="w-full max-w-xl rounded-2xl border border-border bg-background p-5 text-foreground shadow-lg"
          onClick={(event) => event.stopPropagation()}
        >
          <div className="mb-4 flex items-start justify-between gap-3">
            <div className="space-y-1">
              <div className="text-lg font-semibold">{shell.messages.shell.localeDialogTitle}</div>
            </div>
            <Button variant="ghost" onClick={shell.closeLocaleDialog}>
              {shell.messages.shell.localeDialogClose}
            </Button>
          </div>
          <div className="space-y-6">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">
                {shell.messages.shell.localeDialogDescription}
              </p>
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="soft" intent="secondary" className="max-w-full break-words">
                  {shell.messages.localeMeta.languages[selectedLocale.language] ?? selectedLocale.language}
                </Badge>
                <Badge variant="soft" intent="secondary" className="max-w-full break-words">
                  <span className="inline-flex items-center gap-2">
                    <ReactCountryFlag
                      svg
                      countryCode={selectedLocale.flagCode}
                      aria-label={
                        shell.messages.localeMeta.countries[selectedLocale.country] ??
                        selectedLocale.country.toUpperCase()
                      }
                    />
                    {shell.messages.localeMeta.countries[selectedLocale.country] ??
                      selectedLocale.country.toUpperCase()}
                  </span>
                </Badge>
              </div>
            </div>

            <section className="space-y-3">
              <div className="space-y-1">
                <h3 className="text-sm font-semibold text-foreground">
                  {shell.messages.shell.languageSectionTitle}
                </h3>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {SUPPORTED_LANGUAGES.map((language) => {
                  const parsed = parseLocale(createLocale(language, selectedCountry));
                  const active = selectedLanguage === language;

                  return (
                    <LocaleOptionButton
                      key={language}
                      active={active}
                      onClick={() => shell.setSelectedLanguage(language)}
                    >
                      <div className="min-w-0 flex-1 space-y-1">
                        <div className="font-medium">
                          {shell.messages.localeMeta.languages[language] ?? language}
                        </div>
                        <div className="text-xs text-muted-foreground">{parsed.htmlLang}</div>
                      </div>
                      {active ? (
                        <Badge variant="soft" className="shrink-0 self-start sm:self-center">
                          {shell.messages.localeMeta.selectedOption}
                        </Badge>
                      ) : null}
                    </LocaleOptionButton>
                  );
                })}
              </div>
            </section>

            <section className="space-y-3">
              <div className="space-y-1">
                <h3 className="text-sm font-semibold text-foreground">
                  {shell.messages.shell.countrySectionTitle}
                </h3>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {SUPPORTED_COUNTRIES.map((country) => {
                  const parsed = parseLocale(createLocale(selectedLanguage, country));
                  const active = selectedCountry === country;

                  return (
                    <LocaleOptionButton
                      key={country}
                      active={active}
                      onClick={() => shell.setSelectedCountry(country)}
                    >
                      <div className="flex min-w-0 flex-1 items-center gap-3">
                        <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-surface-hover text-lg">
                          <ReactCountryFlag
                            svg
                            countryCode={parsed.flagCode}
                            aria-label={
                              shell.messages.localeMeta.countries[country] ?? country.toUpperCase()
                            }
                          />
                        </span>
                        <div className="min-w-0 space-y-1">
                          <div className="font-medium">
                            {shell.messages.localeMeta.countries[country] ?? country.toUpperCase()}
                          </div>
                          <div className="text-xs uppercase tracking-wide text-muted-foreground">
                            {parsed.flagCode}
                          </div>
                        </div>
                      </div>
                      {active ? (
                        <Badge variant="soft" className="shrink-0 self-start sm:self-center">
                          {shell.messages.localeMeta.selectedOption}
                        </Badge>
                      ) : null}
                    </LocaleOptionButton>
                  );
                })}
              </div>
            </section>

            <div className="flex justify-end">
              <Button onClick={shell.applyLocaleSelection}>
                {shell.messages.shell.localeDialogApply}
              </Button>
            </div>
          </div>
          <div className="sr-only">
            {shell.messages.localeMeta.languages[selectedLanguage] ?? selectedLanguage} /{" "}
            {shell.messages.localeMeta.countries[selectedCountry] ?? selectedCountry.toUpperCase()}
          </div>
        </div>
      </div>
    </div>
  );
}
