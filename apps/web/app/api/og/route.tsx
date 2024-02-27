import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";
import { z } from "zod";
import { OG_SIZE } from "~/lib/constants";
import { OpenGraphHome } from "./components/opengraph-home";
import { env } from "~/env.mjs";
import { getSingleNetwork } from "~/lib/network";
import { Favicon } from "./components/favicon";
import { notFound } from "next/navigation";

const ogSearchParamsSchema = z.object({
  model: z.enum(["network-home", "favicon"]),
  networkSlug: z.string(),
});

export const runtime = "edge";

type FontOptions = {
  data: ArrayBuffer;
  name: string;
  weight?: 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;
  style?: "normal" | "italic";
};

export async function GET(req: NextRequest) {
  const searchParams = Object.fromEntries(req.nextUrl.searchParams.entries());
  const paramsResult = ogSearchParamsSchema.safeParse(searchParams);
  if (!paramsResult.success) {
    notFound();
  }

  const params = paramsResult.data;

  const network = await getSingleNetwork(params.networkSlug);
  console.log({
    network,
    params,
  });
  if (!network) {
    notFound();
  }

  const fonts: Array<FontOptions> = [];
  try {
    const geistMedium = await fetch(
      new URL("../../../public/fonts/Geist/Geist-Medium.otf", import.meta.url),
    ).then((res) => res.arrayBuffer());
    fonts.push({
      name: "Geist",
      data: geistMedium,
      style: "normal",
      weight: 500,
    });
  } catch (error) {
    const baseUrl = env.NEXT_PUBLIC_VERCEL_URL ?? "http://127.0.0.1:3000";
    const geistMedium = await fetch(
      new URL(`${baseUrl}/fonts/Geist/Geist-Medium.otf`),
    ).then((res) => res.arrayBuffer());
    fonts.push({
      name: "Geist",
      data: geistMedium,
      style: "normal",
      weight: 500,
    });
  }

  switch (params.model) {
    case "network-home":
      return new ImageResponse(<OpenGraphHome network={network} />, {
        ...OG_SIZE,
        fonts,
      });
    case "favicon":
      return new ImageResponse(
        <Favicon networkBrandGradient={network.config.cssGradient} />,
        {
          width: 32,
          height: 32,
          fonts,
        },
      );
    default:
      notFound();
  }
}
