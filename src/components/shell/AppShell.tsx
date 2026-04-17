"use client";

import layoutContent from "@/layout-content.json";
import { usePathname } from "next/navigation";
import type { AppLocale } from "@/i18n/locales";
import type { AppMessages } from "@/i18n/messages";
import { getNavigationItems, shouldHideLayoutChrome } from "@/lib/routes";
import { LocalePreferenceDialog } from "@/components/shell/LocalePreferenceDialog";
import { ShellFooter } from "@/components/shell/ShellFooter";
import { ShellHeader } from "@/components/shell/ShellHeader";
import { ShellNavigation } from "@/components/shell/ShellNavigation";
import type { ShellLayoutContent } from "@/components/shell/shell.types";
import { useAppShellState } from "@/components/shell/useAppShellState";

interface AppShellProps {
  locale: AppLocale;
  messages: AppMessages;
  children: React.ReactNode;
}

export function AppShell({ locale, messages, children }: AppShellProps) {
  const pathname = usePathname();
  const shell = useAppShellState({
    locale,
    messages,
    layoutContent: layoutContent as ShellLayoutContent,
    navigationItems: getNavigationItems(locale, messages),
  });
  const localizedPrefix = `/${locale}`;
  const currentRoutePath =
    pathname && pathname.startsWith(localizedPrefix)
      ? pathname.slice(localizedPrefix.length) || "/"
      : pathname || "/";
  const hideLayoutChrome = shouldHideLayoutChrome(currentRoutePath, locale);

  if (hideLayoutChrome) {
    return <main className="min-h-screen bg-background text-foreground">{children}</main>;
  }

  return (
    <main className="flex min-h-screen flex-col bg-background text-foreground">
      <ShellHeader shell={shell} />
      <ShellNavigation shell={shell} />
      <LocalePreferenceDialog shell={shell} />
      <div className={`mx-auto w-full flex-1 ${shell.contentWidthClass}`}>{children}</div>
      <ShellFooter shell={shell} />
    </main>
  );
}
