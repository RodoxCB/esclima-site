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

  try {
    const content = (await request.json()) as SiteContent;
    await saveContent(content);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Erro ao salvar conteúdo:", error);
    return NextResponse.json({ error: "Não foi possível salvar agora." }, { status: 500 });
  }
}
