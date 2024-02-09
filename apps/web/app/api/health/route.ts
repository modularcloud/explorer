import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const healthSearchParamsSchema = z.object({
  networkSlugs: z.array(z.string()),
});

export async function GET(request: NextRequest) {
  const searchParams = Object.fromEntries(
    request.nextUrl.searchParams.entries(),
  );
  const paramsResult = healthSearchParamsSchema.safeParse(searchParams);
  if (!paramsResult.success) {
    return NextResponse.json(paramsResult.error.flatten().fieldErrors, {
      status: 422,
    });
  }
}

export const runtime = "edge";
