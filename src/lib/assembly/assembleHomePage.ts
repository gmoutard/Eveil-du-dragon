import type { UISchema } from "@arkcit/engine";

function withMergedClassName(className: unknown, extraClassName: string) {
  if (typeof className !== "string" || !className.trim()) {
    return extraClassName;
  }

  return `${className} ${extraClassName}`;
}

export function assembleHomePage(schema: UISchema): UISchema {
  const rootNode = schema.nodes[0];
  const remainingNodes = schema.nodes.slice(1);

  if (!rootNode) {
    return schema;
  }

  if (rootNode.type === "Container") {
    return {
      ...schema,
      nodes: [
        {
          ...rootNode,
          props: {
            ...rootNode.props,
            size:
              typeof rootNode.props?.size === "string" && rootNode.props.size
                ? rootNode.props.size
                : "xl",
            className: withMergedClassName(rootNode.props?.className, "space-y-4"),
          },
        },
        ...remainingNodes,
      ],
    };
  }

  return {
    ...schema,
    nodes: [
      {
        id: "assembled-home-page-container",
        type: "Container",
        props: {
          size: "xl",
          className: "space-y-4",
        },
        children: [rootNode, ...remainingNodes],
      },
    ],
  };
}