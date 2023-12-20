import { NextRequest, NextResponse } from "next/server";
import { FileSystemCacheDEV } from "~/lib/fs-cache-dev";

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

  const fsCache = new FileSystemCacheDEV();
  const value = await fsCache.get(key);
  return NextResponse.json({
    data: value,
  });
}
export async function POST(request: NextRequest) {
  const { key, value, ttl } = (await request.json()) as {
    key: string;
    value: any;
    ttl?: number;
  };

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

  const fsCache = new FileSystemCacheDEV();
  await fsCache.set(key, value, ttl);
  return NextResponse.json({ data: value });
}
