import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { head, put } from "@vercel/blob";
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
    const meta = await head(BLOB_PATH, { token });
    if (!meta?.url) {
      return null;
    }

    const response = await fetch(meta.url, { cache: "no-store" });
    if (!response.ok) {
      return null;
    }

    return (await response.json()) as SiteContent;
  } catch {
    return null;
  }
}

async function writeToBlob(content: SiteContent): Promise<boolean> {
  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!token) {
    return false;
  }

  await put(BLOB_PATH, JSON.stringify(content, null, 2), {
    access: "public",
    token,
    allowOverwrite: true,
    contentType: "application/json"
  });

  return true;
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
  const savedToBlob = await writeToBlob(content);

  if (!savedToBlob) {
    await writeFile(LOCAL_PATH, JSON.stringify(content, null, 2), "utf-8");
  }

  return content;
}
