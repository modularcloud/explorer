import { AnyResolver } from "@modularcloud-resolver/core";

type RouteNode = {
  resolver?: string;
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

export function addRoute(path: string[], resolver: string) {
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

  checkForDuplicateRoute(currentNode, resolver, path);
  currentNode.dynamicSegmentKeys = dynamicSegmentNames;
  currentNode.resolver = resolver;
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
  resolver: string,
  path: string[],
) {
  if (node.resolver) {
    // throw new Error(
    //   `Duplicate route: ${resolver} at ${path.join("/")} not added.`,
    // );
  }
}

function zip(a: string[], b: string[]): [string, string][] {
  return a.map((value, index) => [value, b[index]]);
}

const resolvers: { [key: string]: AnyResolver } = {};

export function registerResolver(resolver: AnyResolver) {
  resolvers[resolver.__config.id] = resolver;
}

type ResolveCallback = (params: { [key: string]: string }, resolver: AnyResolver) => Promise<any>;

export function matchRoute(
  path: string[],
): ({ resolver: string, params: { [key: string]: string } , resolve: (cb: ResolveCallback) => Promise<any>} ) | null {
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

  if (!currentNode.resolver) {
    return null;
  }

  const params = Object.fromEntries(
    zip(currentNode.dynamicSegmentKeys, dynamicSegmentValues),
  )
  const resolver = currentNode.resolver;

  return {
    resolve: async (cb) => {
      const result = await cb(params, resolvers[resolver]);
      return result;
    },

    resolver,
    params,
  };
}

