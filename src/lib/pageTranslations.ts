import type { UISchema, UINode } from "@arkcit/engine";

import { SUPPORTED_LANGUAGES, type AppLanguage, type AppLocale } from "@/i18n/locales";

type PageTranslationEntries = Partial<
  Record<
    AppLanguage,
    {
      entries: Record<string, string>;
      updatedAt?: string;
    }
  >
>;

function setNestedProp(
  source: Record<string, unknown>,
  path: string,
  value: string,
): Record<string, unknown> {
  if (!path.includes(".")) {
    return {
      ...source,
      [path]: value,
    };
  }

  const segments = path.split(".").filter(Boolean);
  const nextSource = { ...source };
  let current: Record<string, unknown> = nextSource;

  for (let index = 0; index < segments.length - 1; index += 1) {
    const segment = segments[index];
    const existing = current[segment];
    const nextSegment =
      existing && typeof existing === "object" && !Array.isArray(existing)
        ? { ...(existing as Record<string, unknown>) }
        : {};
    current[segment] = nextSegment;
    current = nextSegment;
  }

  current[segments[segments.length - 1]] = value;
  return nextSource;
}

function applyEntriesToNode(node: UINode, entries: Record<string, string>): UINode {
  const translationKeyPrefix = `${node.id}:`;
  const nextProps = Object.entries(entries).reduce<Record<string, unknown>>(
    (props, [translationKey, translatedValue]) => {
      if (!translationKey.startsWith(translationKeyPrefix)) {
        return props;
      }

      const propName = translationKey.slice(translationKeyPrefix.length);
      if (!propName) {
        return props;
      }

      return setNestedProp(props, propName, translatedValue);
    },
    ((node.props && typeof node.props === "object" && !Array.isArray(node.props)
      ? node.props
      : {}) as Record<string, unknown>),
  );

  return {
    ...node,
    props: nextProps,
    children: Array.isArray(node.children)
      ? node.children.map((child) => applyEntriesToNode(child, entries))
      : node.children,
  };
}

function resolveEntries(
  translations: PageTranslationEntries | undefined,
  locale: AppLocale,
): Record<string, string> {
  if (!translations) {
    return {};
  }

  const language = locale.split("-")[0] as AppLanguage;
  const directEntries = translations[language]?.entries;
  if (directEntries) {
    return directEntries;
  }

  const englishEntries = translations.EN?.entries;
  if (englishEntries) {
    return englishEntries;
  }

  const firstConfiguredLanguage = SUPPORTED_LANGUAGES[0];
  if (firstConfiguredLanguage && translations[firstConfiguredLanguage]?.entries) {
    return translations[firstConfiguredLanguage]?.entries ?? {};
  }

  const firstAvailable = Object.values(translations).find((entry) => entry?.entries);
  return firstAvailable?.entries ?? {};
}

export function applyTranslationsToSchema(
  schema: UISchema,
  translations: PageTranslationEntries | undefined,
  locale: AppLocale,
): UISchema {
  const entries = resolveEntries(translations, locale);
  if (Object.keys(entries).length === 0) {
    return schema;
  }

  return {
    ...schema,
    nodes: Array.isArray(schema.nodes)
      ? schema.nodes.map((node) => applyEntriesToNode(node, entries))
      : schema.nodes,
  };
}