import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";
import { env } from "~/env.mjs";

export async function GET(request: Request) {
  const searchParams = new URL(request.url).searchParams;

  const revalidateToken = searchParams.get("revalidate-token");
  const tag = searchParams.get("tag");
  if (revalidateToken !== env.REVALIDATE_TOKEN) {
    return NextResponse.json(
      {
        error: "You must provide a valid token",
      },
      {
        status: 401,
      },
    );
  } else if (!tag) {
    return NextResponse.json(
      {
        error: "You must provide a tag in the query params",
      },
      {
        status: 422,
      },
    );
  }

  revalidateTag(tag);

  return NextResponse.json({
    success: true,
  });
}

export const runtime = "edge";
