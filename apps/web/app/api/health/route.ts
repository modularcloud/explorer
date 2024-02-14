import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { checkIfNetworkIsOnline } from "~/lib/headless-utils";

const healthSearchParamsSchema = z.array(z.string()).nonempty();

export async function GET(request: NextRequest) {
  const paramsResult = healthSearchParamsSchema.safeParse(
    request.nextUrl.searchParams.getAll("networkSlugs"),
  );

  if (!paramsResult.success) {
    return NextResponse.json(paramsResult.error.flatten().fieldErrors, {
      status: 422,
    });
  }

  const networks = paramsResult.data;
  const networkStatusesResults = await Promise.allSettled(
    networks.map(checkIfNetworkIsOnline),
  );

  const statuses = networkStatusesResults
    .map((result, index) => ({
      network: networks[index],
      response: result.status === "rejected" ? null : result.value,
    }))
    .reduce(
      (acc, current) => {
        acc[current.network] = { healthy: Boolean(current.response?.healthy) };
        return acc;
      },
      {} as Record<string, { healthy: boolean }>,
    );

  return new Response(JSON.stringify(statuses), {
    headers: {
      "content-type": "application/json",
    },
  });
}

export const runtime = "edge";
