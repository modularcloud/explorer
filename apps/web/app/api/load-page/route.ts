import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { HeadlessRouteSchema, loadPage } from "~/lib/headless-utils";

const loadPageSchema = z.object({
  route: HeadlessRouteSchema,
  context: z.object({
    after: z.string().optional(),
    limit: z.number().optional(),
  }),
});

export async function POST(req: NextRequest) {
  console.log("load-page");
  const body = await req.json();

  const validationResult = loadPageSchema.safeParse(body);

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

  const result = await loadPage(validationResult.data);
  return NextResponse.json(result);
}

export const runtime = "nodejs";
// don't cache anything by default, unless manually done so
export const fetchCache = "default-no-store";
