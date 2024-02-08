import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";
import { z } from "zod";
import { SIZE, geistMedium } from "./utils";
import { OpenGraphHome } from "./components/opgraph-home";

const ogSearchParamsSchema = z.union([
  z.object({
    model: z.enum(["network-home"]),
    networkSlug: z.string(),
  }),
  z.object({
    model: z.enum(["other"]),
  }),
]);

export const runtime = "edge";

export async function GET(req: NextRequest) {
  const searchParams = Object.fromEntries(req.nextUrl.searchParams.entries());
  const paramsResult = ogSearchParamsSchema.safeParse(searchParams);
  if (!paramsResult.success) {
    return new Response(null, {
      status: 404,
    });
  }

  const params = paramsResult.data;

  if (params.model !== "network-home") {
    return new Response(null, {
      status: 404,
    });
  }

  return new ImageResponse(
    <>{await OpenGraphHome({ networkSlug: params.networkSlug })}</>,
    {
      ...SIZE,
      fonts: [
        {
          name: "Geist",
          data: await geistMedium,
          style: "normal",
          weight: 500,
        },
      ],
    },
  );
}
