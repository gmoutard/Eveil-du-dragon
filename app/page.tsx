import { redirect } from "next/navigation";

import { DEFAULT_LOCALE, LOCALIZATION_ENABLED } from "@/i18n/locales";

export default function RootPage() {
  if (!LOCALIZATION_ENABLED) {
    return null;
  }

  redirect(`/${DEFAULT_LOCALE}`);
}
