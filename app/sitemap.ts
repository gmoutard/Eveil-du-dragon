import type { MetadataRoute } from "next";

import pagesContent from "@/pages-content.json";
import siteContentRaw from "@/site-content.json";
import { SUPPORTED_LOCALES, withLocalePath } from "@/i18n/locales";
import { resolveLocalizedRoutePath } from "@/lib/routes";

type AppAssemblyRoutePage = {
  id: string;
  routePath: string;
};

const manifest = pagesContent as { pages?: AppAssemblyRoutePage[] };
const siteContent = siteContentRaw as { siteUrl?: string };

function resolveSiteUrl() {
  const configured = siteContent.siteUrl?.trim();
  if (configured) {
    return configured.replace(/\/+$/, "");
  }

  const productionUrl =
    process.env.NEXT_PUBLIC_SITE_URL?.trim() ||
    process.env.SITE_URL?.trim() ||
    process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim() ||
    process.env.VERCEL_URL?.trim();

  if (!productionUrl) {
    return "http://localhost:3000";
  }

  const normalized = productionUrl.replace(/\/+$/, "");
  return /^https?:\/\//i.test(normalized) ? normalized : `https://${normalized}`;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = resolveSiteUrl();
  const pages = Array.isArray(manifest.pages) ? manifest.pages : [];
  const timestamp = new Date();

  return pages.flatMap((page) =>
    SUPPORTED_LOCALES.map((locale) => ({
      url: new URL(withLocalePath(locale, resolveLocalizedRoutePath(page as never, locale)), siteUrl).toString(),
      lastModified: timestamp,
    })),
  );
}
