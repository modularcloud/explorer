import { Engine, verifyArchetype } from "@modularcloud/ecs";
import { PageArchetype } from "~/ecs/archetypes/page";
import { getEngine } from "~/lib/networks";
import { NextResponse } from "next/server";

export const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,OPTIONS,PATCH,DELETE,POST,PUT",
  "Access-Control-Allow-Credentials": "true",
  "Access-Control-Allow-Headers":
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
} as const;

type EngineLoadResponse = Awaited<ReturnType<typeof Engine.load>>;

export async function GET(
  request: Request,
  { params }: { params: { network: string; type: string; query: string } },
) {
  const { config, Engine } = getEngine();

  let data: EngineLoadResponse | null = null;

  try {
    // temporarily add address/token as search types until we can implement redirections
    if (
      params.type === "search" ||
      params.type === "account" ||
      params.type === "token"
    ) {
      const types = Object.keys(config.loaders);
      data = await Promise.any(
        types
          .map(async (type) => {
            return Engine.load({
              ...params,
              type,
            } as any);
          })
          .map((p) =>
            p.then((entity) => verifyArchetype(PageArchetype, entity)),
          ),
      );
    } else {
      data = await Engine.load(params);
    }
  } catch (e) {
    console.error("Error loading entity with params: ", params);
    console.error(e);
  }

  return NextResponse.json(data, {
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    status: data === null ? 404 : 200, // 404 means we have not been able to fetch the data
  });
}

export async function OPTIONS(request: Request) {
  return new Response(null, {
    headers: corsHeaders,
  });
}

export const dynamic = "force-dynamic";
