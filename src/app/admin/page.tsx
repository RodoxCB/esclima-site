import type { Metadata } from "next";
import { AdminClient } from "@/components/admin/AdminClient";
import { isAdminAuthenticated } from "@/lib/auth";
import { getContent } from "@/lib/content";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getContent();

  return {
    title: `Admin | ${content.site.name}`,
    robots: { index: false, follow: false }
  };
}

export default async function AdminPage() {
  const authenticated = await isAdminAuthenticated();
  const content = await getContent();

  return <AdminClient authenticated={authenticated} initialContent={content} />;
}
