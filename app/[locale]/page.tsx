import type { UISchema } from "@arkcit/engine";

import { PageEngine } from "@/components/engine/PageEngine";
import { assembleHomePage } from "@/lib/assembly/assembleHomePage";
import { applyTranslationsToSchema } from "@/lib/pageTranslations";
import { findHomePage } from "@/lib/routes";
import {
  getHomepageSchemaFromStudioBackend,
  getPageTranslationsFromStudioBackend,
} from "@/lib/studioBackend";
import pageTranslationsRaw from "@/page-translations.json";
import homeSchema from "@/schemas/home.json";
import type { AppLocale } from "@/i18n/locales";

const pageTranslations = pageTranslationsRaw as Record<string, unknown>;

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const homePage = findHomePage();
  const baseSchema = assembleHomePage(
    ((await getHomepageSchemaFromStudioBackend()) ?? homeSchema) as UISchema,
  );
  const liveTranslations = homePage?.sourcePageName
    ? await getPageTranslationsFromStudioBackend(homePage.sourcePageName)
    : null;
  const translatedSchema = applyTranslationsToSchema(
    baseSchema,
    (liveTranslations ?? pageTranslations[homePage?.id ?? "home"]) as never,
    locale as AppLocale,
  );

  return (
    <div className="px-4 py-6 md:px-8">
      <PageEngine schema={translatedSchema} />
    </div>
  );
}