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

type SearchConfig = {
  // is search enabled? this should always be true if config is included
  enabled: boolean;

  // a regex that matches the query, if any query is allow then use /.*/
  regex: RegExp;

  // the name of the field to use based on the path, i.e. path: ["blocks", "[signature]"] would be "signature"
  key: string;

  // the name of the type that will be returned by this search, for the above it would be "Block"
  name: string;
};

// TODO: since this is an array, sometimes the builders can be added more than once
export const SearchBuilders: {
  getPath: (query: string) => string[] | null;
  name: string;
}[] = [];

export function addRoute(
  path: string[],
  resolver: string,
  searchConfig?: SearchConfig,
) {
  let currentNode = root;
  let dynamicSegmentNames: string[] = [];

  if (searchConfig?.enabled) {
    SearchBuilders.push({
      getPath: (query: string) => {
        if (!query.match(searchConfig.regex)) {
          return null;
        }
        return path.map((segment) => {
          if (segment === `[${searchConfig.key}]`) {
            return query;
          }
          return segment;
        });
      },
      name: searchConfig.name,
    });
  }

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

export async function resolve(resolverId: string, input: any) {
  const resolver = resolvers[resolverId];
  if (!resolver) {
    throw new Error(`Resolver ${resolverId} not found`);
  }
  return await resolver(input);
}

type ResolveCallback = (
  params: { [key: string]: string },
  resolver: AnyResolver,
) => Promise<any>;

export function matchRoute(path: string[]): {
  resolver: string;
  params: { [key: string]: string };
  resolve: (cb: ResolveCallback) => Promise<any>;
} | null {
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
  );
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
