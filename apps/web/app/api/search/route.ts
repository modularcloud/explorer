import { SearchBuilders } from "@modularcloud/headless";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { loadIntegration } from "~/lib/headless-utils";

const searchSchema = z.object({
  networkSlug: z.string().min(1),
  query: z.string().min(1),
});

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const validationResult = searchSchema.safeParse(
    Object.fromEntries(searchParams.entries()),
  );

  if (!validationResult.success) {
    return NextResponse.json(
      {
        errors: validationResult.error.flatten().fieldErrors,
      },
      {
        status: 422,
      },
    );
  }

  const { networkSlug, query } = validationResult.data;
  const integration = await loadIntegration(networkSlug);

  const queries = SearchBuilders.map(
    (searchBuilder) => searchBuilder.getPath(query)!,
  ).filter(Boolean);

  const resolvedPathsPromise = await Promise.all(
    queries.map((query) =>
      integration.resolveRoute(query).then((resolution) => {
        if (resolution?.type === "success") {
          return query as [string, string];
        } else {
          return null;
        }
      }),
    ),
  );

  const resolvedPaths = resolvedPathsPromise.filter((path) => path !== null);

  // remove duplicates
  const newPaths = resolvedPaths.reduce(
    (acc, current) => {
      const found = acc.find(
        (item) => item[0] === current![0] && item[1] === current![1],
      );
      if (!found) {
        acc.push(current!);
      }
      return acc;
    },
    [] as [string, string][],
  );

  return NextResponse.json({
    data: newPaths,
  });
}

export const runtime = "edge";
