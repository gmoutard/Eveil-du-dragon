import type { UISchema } from "@arkcit/engine";

export async function getPageSchemaFromStudioBackend(pageName: string): Promise<UISchema | null> {
  const baseUrl = process.env.STUDIO_BACKEND_URL?.trim();
  if (!baseUrl) return null;

  const projects = await fetch(`${baseUrl}/projects`, { cache: "no-store" }).then((response) =>
    response.json(),
  );

  for (const project of projects) {
    const pages = await fetch(`${baseUrl}/projects/${project.id}/pages`, {
      cache: "no-store",
    }).then((response) => response.json());

    const page = pages.find(
      (entry: { name: string; slug?: string }) =>
        entry.name === pageName || entry.slug === pageName,
    );
    if (!page) continue;

    const current = await fetch(`${baseUrl}/pages/${page.id}/current`, {
      cache: "no-store",
    }).then((response) => response.json());

    const schema = current?.payload?.schema ?? current?.schema;

    if (schema?.version === 1 && Array.isArray(schema?.nodes)) {
      return schema as UISchema;
    }
  }

  return null;
}

export async function getHomepageSchemaFromStudioBackend(): Promise<UISchema | null> {
  return getPageSchemaFromStudioBackend("Arkcit-homepage");
}

export async function getPageTranslationsFromStudioBackend(pageName: string) {
  const baseUrl = process.env.STUDIO_BACKEND_URL?.trim();
  if (!baseUrl) return null;

  const projects = await fetch(`${baseUrl}/projects`, { cache: "no-store" }).then((response) =>
    response.json(),
  );

  for (const project of projects) {
    const pages = await fetch(`${baseUrl}/projects/${project.id}/pages`, {
      cache: "no-store",
    }).then((response) => response.json());

    const page = pages.find(
      (entry: { name: string; slug?: string }) =>
        entry.name === pageName || entry.slug === pageName,
    );
    if (!page) continue;

    const response = await fetch(`${baseUrl}/pages/${page.id}/translations`, {
      cache: "no-store",
    });

    if (!response.ok) {
      return null;
    }

    const payload = await response.json();
    return payload?.translations ?? null;
  }

  return null;
}
