import type { NextRequest } from "next/server";
import { getIBCFlow } from "./logic";

export async function GET(
  request: NextRequest,
  { params }: { params: { txHash: string; msgIndex: string; slug: string } },
) {
  const result = await getIBCFlow({ params });
  if (!result) {
    return new Response(JSON.stringify({ error: "Could not find IBC flow" }), {
      status: 404,
    });
  }
  return new Response(JSON.stringify(result), { status: 200 });
}
