type PageConfig = {
  type: "test1" | "test2";
  payload: any;
};

type RouteNode = {
  config?: PageConfig;
  staticChildren: { [key: string]: RouteNode };
  dynamicChild?: RouteNode;
  dynamicSegmentKeys: string[];
};

const root: RouteNode = {
  staticChildren: {},
  dynamicSegmentKeys: [],
};

const dynamicSegmentRegex = /\[([^\]]+)\]/;

function extractDynamicSegment(segment: string): string | null {
  const match = segment.match(dynamicSegmentRegex);
  return match ? match[1] : null;
}

export function addRoute(path: string[], config: PageConfig) {
  let currentNode = root;
  let dynamicSegmentNames: string[] = [];

  for (const segment of path) {
    const dynamicSegment = extractDynamicSegment(segment);

    if (dynamicSegment) {
      dynamicSegmentNames.push(dynamicSegment);
      currentNode = handleDynamicSegment(currentNode);
      continue;
    }

    currentNode = handleStaticSegment(currentNode, segment);
  }

  checkForDuplicateRoute(currentNode, config, path);
  currentNode.dynamicSegmentKeys = dynamicSegmentNames;
  currentNode.config = config;
}

function handleDynamicSegment(node: RouteNode) {
  node.dynamicChild = node.dynamicChild || {
    staticChildren: {},
    dynamicSegmentKeys: [],
  };
  return node.dynamicChild;
}

function handleStaticSegment(node: RouteNode, segment: string) {
  if (!node.staticChildren[segment]) {
    node.staticChildren[segment] = {
      staticChildren: {},
      dynamicSegmentKeys: [],
    };
  }
  return node.staticChildren[segment];
}

function checkForDuplicateRoute(
  node: RouteNode,
  config: PageConfig,
  path: string[],
) {
  if (node.config) {
    throw new Error(
      `Duplicate route: ${config.type} at ${path.join("/")} not added.`,
    );
  }
}

function zip(a: string[], b: string[]): [string, string][] {
  return a.map((value, index) => [value, b[index]]);
}

export function matchRoute(
  path: string[],
): (PageConfig & { params: { [key: string]: string } }) | null {
  let currentNode = root;
  const dynamicSegmentValues: string[] = [];

  for (const segment of path) {
    if (currentNode.staticChildren[segment]) {
      currentNode = currentNode.staticChildren[segment];
    } else if (currentNode.dynamicChild) {
      dynamicSegmentValues.push(segment);
      currentNode = currentNode.dynamicChild;
    } else {
      return null;
    }
  }

  if (!currentNode.config) {
    return null;
  }

  return {
    ...currentNode.config,
    params: Object.fromEntries(
      zip(currentNode.dynamicSegmentKeys, dynamicSegmentValues),
    ),
  };
}
