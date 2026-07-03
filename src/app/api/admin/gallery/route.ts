import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/auth";
import { getContent, saveContent } from "@/lib/content";
import { uploadImage } from "@/lib/uploads";
import type { GalleryCategory } from "@/lib/types";

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get("file");
  const title = String(formData.get("title") ?? "Projeto");
  const category = String(formData.get("category") ?? "outros") as GalleryCategory;
  const description = String(formData.get("description") ?? "");

  if (!file || typeof file === "string") {
    return NextResponse.json({ error: "Arquivo inválido" }, { status: 400 });
  }

  const url = await uploadImage(file, "gallery");
  const content = await getContent();

  const item = {
    id: String(Date.now()),
    url,
    title,
    category,
    description
  };

  content.gallery = [item, ...(content.gallery ?? [])];
  await saveContent(content);

  return NextResponse.json({ ok: true, item });
}

export async function DELETE(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  const { id } = (await request.json()) as { id?: string };
  if (!id) {
    return NextResponse.json({ error: "ID obrigatório" }, { status: 400 });
  }

  const content = await getContent();
  content.gallery = (content.gallery ?? []).filter((item) => item.id !== id);
  await saveContent(content);

  return NextResponse.json({ ok: true });
}
