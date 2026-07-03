import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/auth";
import { uploadImage } from "@/lib/uploads";

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get("file");
  const folder = String(formData.get("folder") ?? "site");

  if (!file || typeof file === "string") {
    return NextResponse.json({ error: "Arquivo inválido" }, { status: 400 });
  }

  const url = await uploadImage(
    file,
    folder === "gallery" ? "gallery" : "site"
  );

  return NextResponse.json({ ok: true, url });
}
