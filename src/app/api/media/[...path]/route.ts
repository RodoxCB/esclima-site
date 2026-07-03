import { get } from "@vercel/blob";
import { NextResponse } from "next/server";
import { BLOB_ACCESS } from "@/lib/blob";

type RouteContext = {
  params: Promise<{ path: string[] }>;
};

export async function GET(_request: Request, context: RouteContext) {
  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!token) {
    return NextResponse.json({ error: "Arquivo não encontrado" }, { status: 404 });
  }

  const { path } = await context.params;
  const pathname = path.map((segment) => decodeURIComponent(segment)).join("/");

  try {
    const result = await get(pathname, { access: BLOB_ACCESS, token });
    if (!result) {
      return NextResponse.json({ error: "Arquivo não encontrado" }, { status: 404 });
    }

    return new NextResponse(result.stream, {
      headers: {
        "Content-Type": result.blob.contentType ?? "application/octet-stream",
        "Cache-Control": "public, max-age=31536000, immutable"
      }
    });
  } catch {
    return NextResponse.json({ error: "Arquivo não encontrado" }, { status: 404 });
  }
}
