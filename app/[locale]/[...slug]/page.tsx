import type { UISchema } from "@arkcit/engine";
import { notFound } from "next/navigation";

import { PageEngine } from "@/components/engine/PageEngine";
import type { AppLocale } from "@/i18n/locales";
import { applyTranslationsToSchema } from "@/lib/pageTranslations";
import { findPageByRoutePath } from "@/lib/routes";
import {
  getPageSchemaFromStudioBackend,
  getPageTranslationsFromStudioBackend,
} from "@/lib/studioBackend";
import pageSchemasRaw from "@/page-schemas.json";
import pageTranslationsRaw from "@/page-translations.json";

const pageSchemas = pageSchemasRaw as Record<string, UISchema>;
const pageTranslations = pageTranslationsRaw as Record<string, unknown>;

export default async function GenericPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string[] }>;
}) {
  const { locale, slug } = await params;
  const routePath = `/${(slug ?? []).join("/")}`;
  const page = findPageByRoutePath(routePath, locale as AppLocale);

  if (!page || routePath === "/") {
    notFound();
  }

  const schema = (await getPageSchemaFromStudioBackend(page.sourcePageName)) ?? pageSchemas[page.id];
  const liveTranslations = await getPageTranslationsFromStudioBackend(page.sourcePageName);
  const translatedSchema =
    schema?.version === 1 && Array.isArray(schema.nodes)
      ? applyTranslationsToSchema(
          schema,
          (liveTranslations ?? pageTranslations[page.id]) as never,
          locale as AppLocale,
        )
      : schema;

  if (
    translatedSchema?.version === 1 &&
    Array.isArray(translatedSchema.nodes) &&
    translatedSchema.nodes.length > 0
  ) {
    return (
      <div className="px-4 py-6 md:px-8">
        <PageEngine schema={translatedSchema} />
      </div>
    );
  }

  return (
    <section className="mx-auto w-full max-w-7xl space-y-4 px-4 py-6 md:px-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">
          {page.pageTitle || page.navigationLabel || page.routePath}
        </h1>
        <p className="text-base text-muted-foreground">
          This generated page is reserved for the next assembly step linked to{" "}
          <code>{page.sourcePageName || "an external Studio page"}</code>.
        </p>
      </header>
    </section>
  );
}