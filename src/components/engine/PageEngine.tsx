"use client";

import type { UISchema } from "@arkcit/engine";
import { ReactWebEngineRoot } from "@arkcit/engine/react-web";
import { defaultUIRegistry } from "@arkcit/react-ui/orchestrator-registry";

interface PageEngineProps {
  schema: UISchema;
}

export function PageEngine({ schema }: PageEngineProps) {
  return <ReactWebEngineRoot schema={schema} registry={defaultUIRegistry} />;
}