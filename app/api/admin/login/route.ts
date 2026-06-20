import { NextResponse } from "next/server";
import { generateToken, setSessionCookie } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const { password } = await request.json();
    const expectedPassword = process.env.ADMIN_PASSWORD || "admin123";

    if (password === expectedPassword) {
      const token = generateToken("admin");
      setSessionCookie(token);
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: "Invalid password" }, { status: 401 });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
