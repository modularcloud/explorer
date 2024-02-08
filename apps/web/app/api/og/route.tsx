import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";
import { z } from "zod";
import { SIZE } from "./utils";
import { OpenGraphHome } from "./components/opengraph-home";

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

  const geistMedium = await fetch(
    new URL("../../../public/fonts/Geist/Geist-Medium.otf", import.meta.url),
  ).then((res) => res.arrayBuffer());

  return new ImageResponse(
    <>{await OpenGraphHome({ networkSlug: params.networkSlug })}</>,
    {
      ...SIZE,
      fonts: [
        {
          name: "Geist",
          data: geistMedium,
          style: "normal",
          weight: 500,
        },
      ],
    },
  );
}
