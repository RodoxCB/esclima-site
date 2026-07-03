"use client";

import { useState } from "react";
import type { SiteContent } from "@/lib/types";
import { AdminDashboard } from "@/components/admin/AdminDashboard";
import { AdminLogin } from "@/components/admin/AdminLogin";

type AdminClientProps = {
  authenticated: boolean;
  initialContent: SiteContent;
};

export function AdminClient({ authenticated, initialContent }: AdminClientProps) {
  const [loggedIn, setLoggedIn] = useState(authenticated);

  if (!loggedIn) {
    return <AdminLogin siteName={initialContent.site.name} onLogin={() => setLoggedIn(true)} />;
  }

  return <AdminDashboard initialContent={initialContent} />;
}
