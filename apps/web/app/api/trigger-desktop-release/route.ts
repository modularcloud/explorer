import { env } from "~/env";
import crypto from "node:crypto";
import { z } from "zod";
import type { NextRequest } from "next/server";

const requestPayload = z.object({
  payload: z.object({
    target: z.enum(["production", "staging"]).nullable(),
  }),
});

export async function POST(request: NextRequest) {
  if (env.NEXT_PUBLIC_TARGET === "electron") {
    return Response.json(
      {
        error: "Cannot trigger a desktop release from the electron app",
      },
      {
        status: 400,
      },
    );
  }

  const isRequestFromTrustedSource = await verifySignature(request);

  if (!isRequestFromTrustedSource) {
    return Response.json(
      {
        error: "Untrusted API call",
      },
      {
        status: 400,
      },
    );
  }

  const requestParseResult = requestPayload.safeParse(await request.json());

  if (!requestParseResult.success) {
    return Response.json(
      {
        error: requestParseResult.error.flatten().fieldErrors,
      },
      {
        status: 422,
      },
    );
  }

  const {
    payload: { target },
  } = requestParseResult.data;

  if (target !== "production") {
    // ignored request
    return Response.json({
      status: 204,
    });
  }

  return await fetch(
    "https://api.github.com/repos/modularcloud/explorer/dispatches/build-desktop-app",
    {
      body: JSON.stringify({ event_type: "deploy_desktop_app" }),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `token ${env.GITHUB_ACTION_TRIGGER_PERSONAL_ACCESS_TOKEN}`,
      },
      cache: "no-store",
    },
  );
}

async function verifySignature(req: Request) {
  if (!env.DEPLOYMENT_WEBHOOK_SECRET) return false;

  const payload = await req.text();
  const signature = crypto
    .createHmac("sha1", env.DEPLOYMENT_WEBHOOK_SECRET)
    .update(payload)
    .digest("hex");
  return signature === req.headers.get("x-vercel-signature");
}
