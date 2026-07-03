import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { put } from "@vercel/blob";

export const UPLOAD_FOLDERS = ["gallery", "site"] as const;

type UploadFolder = (typeof UPLOAD_FOLDERS)[number];

function safeFilename(name: string): string {
  return name.replace(/[^a-zA-Z0-9._-]/g, "-");
}

export async function uploadImage(file: File, folder: UploadFolder = "site"): Promise<string> {
  if (!UPLOAD_FOLDERS.includes(folder)) {
    throw new Error("Pasta inválida");
  }

  const filename = `${Date.now()}-${safeFilename(file.name)}`;
  const token = process.env.BLOB_READ_WRITE_TOKEN;

  if (token) {
    const blob = await put(`uploads/${folder}/${filename}`, file, {
      access: "public",
      token
    });

    return blob.url;
  }

  const targetDir = path.join(process.cwd(), "public", "assets", "uploads", folder);
  await mkdir(targetDir, { recursive: true });

  const buffer = Buffer.from(await file.arrayBuffer());
  await writeFile(path.join(targetDir, filename), buffer);

  return `/assets/uploads/${folder}/${filename}`;
}
