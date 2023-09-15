import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";
import { z } from "zod";
import { env } from "~/env.mjs";

const revalidateRequestSchema = z.object({
  revalidateToken: z.string(),
  tag: z.string(),
});

export async function POST(request: Request) {
  const result = revalidateRequestSchema.safeParse(await request.json());

  if (!result.success) {
    return NextResponse.json(
      {
        errors: result.error.flatten().fieldErrors,
      },
      {
        status: 422,
      },
    );
  }

  const { revalidateToken, tag } = result.data;
  if (revalidateToken !== env.REVALIDATE_TOKEN) {
    return NextResponse.json(
      {
        error: "You must provide a valid token",
      },
      {
        status: 401,
      },
    );
  }

  revalidateTag(tag);

  return NextResponse.json({
    success: true,
  });
}

export const runtime = "edge";
