import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

export const COOKIE_NAME = "esclima_session";
const SALT = "esclima-admin-v1";

function createToken(password: string): string {
  return createHmac("sha256", SALT).update(password).digest("hex");
}

export async function isAdminAuthenticated(): Promise<boolean> {
  const password = process.env.ADMIN_PASSWORD;
  if (!password) {
    return false;
  }

  const cookieStore = await cookies();
  const session = cookieStore.get(COOKIE_NAME)?.value;
  if (!session) {
    return false;
  }

  const expected = createToken(password);

  try {
    return timingSafeEqual(Buffer.from(session), Buffer.from(expected));
  } catch {
    return false;
  }
}

export function verifyPassword(password: string): boolean {
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword || !password) {
    return false;
  }

  return password === adminPassword;
}

export function getSessionToken(password: string): string {
  return createToken(password);
}
