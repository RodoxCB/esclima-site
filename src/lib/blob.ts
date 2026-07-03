export const BLOB_ACCESS = "private" as const;

export function blobMediaUrl(pathname: string): string {
  return `/api/media/${pathname.split("/").map(encodeURIComponent).join("/")}`;
}
