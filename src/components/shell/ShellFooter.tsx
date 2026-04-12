import Link from "next/link";
import { Badge } from "@arkcit/react-ui/ui";

import { resolveLocalizedLinkHref, resolveLocalizedLinkLabel } from "@/lib/routes";
import type { AppShellState } from "./shell.types";

const FOOTER_LOGO_CLASS_NAMES = {
  small: "h-8 w-auto max-w-[140px] object-contain",
  medium: "h-auto max-h-16 w-full max-w-sm object-contain",
  large: "h-auto max-h-24 w-full max-w-full object-contain",
} as const;

export function ShellFooter({ shell }: { shell: AppShellState }) {
  if (!shell.layoutContent.footer.enabled) {
    return null;
  }

  const footerLogoClassName = FOOTER_LOGO_CLASS_NAMES[shell.layoutContent.footer.logoSize];
  const footerLogoImageAlignmentClassName =
    shell.layoutContent.footer.logoPosition === "center"
      ? "mx-auto object-center"
      : shell.layoutContent.footer.logoPosition === "right"
        ? "ml-auto object-right"
        : "mr-auto object-left";
  const footerSectionSurfaceClassName = [
    "space-y-2 rounded-lg px-3 py-3",
    shell.layoutContent.footer.sectionBordersEnabled ? "border border-border" : "",
    shell.layoutContent.footer.sectionBackgroundEnabled ? "bg-background/70" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <footer className="border-t border-border bg-surface/70">
      <div className="mx-auto max-w-7xl space-y-4 px-4 py-4 text-sm text-muted-foreground md:px-8">
        {shell.layoutContent.footer.logoPath ? (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            <div
              className={[
                "flex w-full",
                shell.layoutContent.footer.logoPosition === "center"
                  ? "justify-center md:col-span-2 xl:col-span-1 xl:col-start-2"
                  : shell.layoutContent.footer.logoPosition === "right"
                    ? "justify-end md:col-start-2 xl:col-start-3"
                    : "justify-start md:col-start-1 xl:col-start-1",
              ].join(" ")}
            >
              <img
                src={shell.layoutContent.footer.logoPath}
                alt={shell.messages.shell.appName}
                className={`${footerLogoClassName} ${footerLogoImageAlignmentClassName}`}
              />
            </div>
          </div>
        ) : null}
        {shell.layoutContent.footer.sections.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {shell.layoutContent.footer.sections.map((section) => {
              const sectionTextAlignmentClassName =
                section.textAlignment === "center"
                  ? "text-center items-center"
                  : section.textAlignment === "right"
                    ? "text-right items-end"
                    : "text-left items-start";
              const sectionLinkAlignmentClassName =
                section.textAlignment === "center"
                  ? "items-center"
                  : section.textAlignment === "right"
                    ? "items-end"
                    : "items-start";

              return (
              <div
                key={section.id}
                className={`${footerSectionSurfaceClassName} flex flex-col ${sectionTextAlignmentClassName}`}
              >
                <div className="text-xs font-semibold uppercase tracking-wide text-foreground">
                  {section.title}
                </div>
                <div className={`flex w-full flex-col space-y-1 ${sectionLinkAlignmentClassName}`}>
                  {section.links.map((link) => (
                    <Link
                      key={link.id}
                      href={resolveLocalizedLinkHref(link, shell.locale)}
                      className="block transition-colors hover:text-foreground"
                    >
                      {resolveLocalizedLinkLabel(link, shell.locale)}
                    </Link>
                  ))}
                </div>
              </div>
              );
            })}
          </div>
        ) : null}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span>{shell.layoutContent.footer.text || shell.messages.shell.appName}</span>
          <Badge variant="secondary">{shell.messages.shell.appName}</Badge>
        </div>
      </div>
    </footer>
  );
}
