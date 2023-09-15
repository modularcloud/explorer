import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";
import { z } from "zod";
import { env } from "~/env.mjs";

const revalidateRequestSchema = z.object({
  revalidateToken: z.string(),
  tag: z.string().min(1),
});

export async function POST(request: Request) {
  let requestJson = {};
  try {
    requestJson = await request.json();
  } catch (error) {
    return NextResponse.json(
      {
        errors: {
          "*": ["The request is malformed, please provide a valid JSON body"],
        },
      },
      {
        status: 415,
      },
    );
  }

  const result = revalidateRequestSchema.safeParse(requestJson);

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
        errors: {
          revalidateToken: ["You must provide a valid token"],
        },
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
