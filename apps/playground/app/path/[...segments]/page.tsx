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

function addRoute(path: string[], config: PageConfig) {
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

function matchRoute(
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

export default function RoutingExample({
  params,
}: {
  params: { segments: string[] };
}) {
  try {
    addRoute(["test1", "[id]"], { type: "test1", payload: "1" });
    addRoute(["test2", "[id]"], { type: "test2", payload: "2" });
    addRoute(["[test]", "[id]"], { type: "test1", payload: "3" });
    addRoute(["[test]", "[example]", "hello", "[world]"], {
      type: "test2",
      payload: "4",
    });
  } catch (e) {
    console.log(e);
  }
  const match = matchRoute(params.segments);
  switch (match?.type) {
    case "test1":
      return (
        <div>{`Test 1: ${JSON.stringify(match.params)}, ${match.payload}`}</div>
      );
    case "test2":
      return (
        <div>{`Test 2: ${JSON.stringify(match.params)}, ${match.payload}`}</div>
      );
    default:
      return <div>Not found</div>;
  }
}
