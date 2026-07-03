import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { get, put } from "@vercel/blob";
import { BLOB_ACCESS } from "@/lib/blob";
import type { SiteContent } from "@/lib/types";

const BLOB_PATH = "content/esclima-site-content.json";
const LOCAL_PATH = path.join(process.cwd(), "data", "content.json");

let defaultContent: SiteContent | null = null;

async function loadDefault(): Promise<SiteContent> {
  if (!defaultContent) {
    const raw = await readFile(LOCAL_PATH, "utf-8");
    defaultContent = JSON.parse(raw) as SiteContent;
  }

  return defaultContent;
}

async function readFromBlob(): Promise<SiteContent | null> {
  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!token) {
    return null;
  }

  try {
    const result = await get(BLOB_PATH, { access: BLOB_ACCESS, token });
    if (!result) {
      return null;
    }

    const raw = await new Response(result.stream).text();
    return JSON.parse(raw) as SiteContent;
  } catch {
    return null;
  }
}

async function writeToBlob(content: SiteContent): Promise<void> {
  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!token) {
    throw new Error("BLOB_READ_WRITE_TOKEN não configurado");
  }

  await put(BLOB_PATH, JSON.stringify(content, null, 2), {
    access: BLOB_ACCESS,
    token,
    allowOverwrite: true,
    contentType: "application/json"
  });
}

export async function getContent(): Promise<SiteContent> {
  const blobContent = await readFromBlob();
  if (blobContent) {
    return blobContent;
  }

  try {
    const raw = await readFile(LOCAL_PATH, "utf-8");
    return JSON.parse(raw) as SiteContent;
  } catch {
    return loadDefault();
  }
}

export async function saveContent(content: SiteContent): Promise<SiteContent> {
  const token = process.env.BLOB_READ_WRITE_TOKEN;

  if (token) {
    await writeToBlob(content);
    return content;
  }

  await writeFile(LOCAL_PATH, JSON.stringify(content, null, 2), "utf-8");
  return content;
}
