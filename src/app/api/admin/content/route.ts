import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/auth";
import { getContent, saveContent } from "@/lib/content";
import type { SiteContent } from "@/lib/types";

export async function GET() {
  const content = await getContent();
  return NextResponse.json(content);
}

export async function PUT(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  const content = (await request.json()) as SiteContent;
  await saveContent(content);
  return NextResponse.json({ ok: true });
}
