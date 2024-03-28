import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";
import { z } from "zod";
import { env } from "~/env.js";

const revalidateRequestSchema = z.object({
  tags: z.array(z.string().min(1)),
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

  const { tags } = result.data;
  const authorization = request.headers.get("Authorization");

  const revalidateToken = authorization?.split(" ")[1];

  if (revalidateToken !== env.REVALIDATE_TOKEN) {
    return NextResponse.json(
      {
        errors: {
          revalidateToken: [
            "You must provide a valid token in the header as `Authorization: Bearer <token>`",
          ],
        },
      },
      {
        status: 401,
      },
    );
  }

  for (const tag of tags) {
    revalidateTag(tag);
  }

  return NextResponse.json({
    success: true,
  });
}

export const runtime = "edge";
