import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { COOKIE_NAME, getSessionToken, verifyPassword } from "@/lib/auth";

export async function POST(request: Request) {
  const { password } = (await request.json()) as { password?: string };

  if (!verifyPassword(password ?? "")) {
    return NextResponse.json({ error: "Senha incorreta" }, { status: 401 });
  }

  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, getSessionToken(password!), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7
  });

  return NextResponse.json({ ok: true });
}
