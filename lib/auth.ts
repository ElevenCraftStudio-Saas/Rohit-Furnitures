import crypto from "crypto";
import { cookies } from "next/headers";

const SECRET = process.env.ADMIN_SESSION_SECRET || "rohit-furnitures-secret-key-123456789";
const SESSION_COOKIE_NAME = "rohit_admin_session";

export function generateToken(username: string): string {
  const expiry = Date.now() + 1000 * 60 * 60 * 24; // 24 hours
  const payload = `${username}:${expiry}`;
  const hash = crypto.createHmac("sha256", SECRET).update(payload).digest("hex");
  return `${payload}.${hash}`;
}

export function verifyToken(token: string): boolean {
  try {
    const parts = token.split(".");
    if (parts.length !== 2) return false;
    const [payload, hash] = parts;
    const expectedHash = crypto.createHmac("sha256", SECRET).update(payload).digest("hex");
    if (hash !== expectedHash) return false;

    const [, expiryStr] = payload.split(":");
    const expiry = parseInt(expiryStr, 10);
    return expiry > Date.now();
  } catch {
    return false;
  }
}

export function isAdminAuthenticated(): boolean {
  const cookieStore = cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  if (!token) return false;
  return verifyToken(token);
}

export function setSessionCookie(token: string) {
  const cookieStore = cookies();
  cookieStore.set({
    name: SESSION_COOKIE_NAME,
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60 * 24, // 1 day
    path: "/",
  });
}

export function clearSessionCookie() {
  const cookieStore = cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
}
