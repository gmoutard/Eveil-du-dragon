import type { Metadata } from "next";

import { getMessages } from "@/i18n/messages";
import type { AppLocale } from "@/i18n/locales";
import { AppShell } from "@/components/shell/AppShell";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const messages = getMessages(locale as AppLocale);

  return {
    title: messages.shell.appName,
    description: messages.pages.homeDescription,
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = getMessages(locale as AppLocale);

  return <AppShell locale={locale as AppLocale} messages={messages}>{children}</AppShell>;
}