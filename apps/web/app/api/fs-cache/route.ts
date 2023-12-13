import { NextRequest, NextResponse } from "next/server";
import { FileSystemCache } from "~/lib/fs-cache-dev";

export async function GET(request: NextRequest) {
  const key = request.nextUrl.searchParams.get("key");

  if (!key) {
    return NextResponse.json(
      {
        key: "required",
      },
      {
        status: 400,
      },
    );
  }

  const fsCache = new FileSystemCache();
  const value = await fsCache.get(key);
  return NextResponse.json({
    data: value,
  });
}
export async function POST(request: NextRequest) {
  const { key, value } = (await request.json()) as { key: string; value: any };

  if (!key) {
    return NextResponse.json(
      {
        key: "required",
      },
      {
        status: 400,
      },
    );
  }

  const fsCache = new FileSystemCache();
  await fsCache.set(key, value);
  return NextResponse.json({ data: value });
}
