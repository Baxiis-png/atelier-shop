import { NextResponse } from "next/server";

const COOKIE = "ape_lab_gate";

async function tokenForPassword(password: string) {
  const data = new TextEncoder().encode(`ape-lab:${password}`);
  const hash = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hash))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export async function POST(request: Request) {
  const sitePassword = process.env.SITE_PASSWORD?.trim();
  if (!sitePassword) {
    return NextResponse.json({ ok: true, unlocked: true });
  }

  let body: { password?: string; next?: string };
  try {
    body = (await request.json()) as { password?: string; next?: string };
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const password = body.password?.trim() || "";
  if (password !== sitePassword) {
    return NextResponse.json({ error: "Wrong password" }, { status: 401 });
  }

  const token = await tokenForPassword(sitePassword);
  const res = NextResponse.json({
    ok: true,
    next: body.next?.startsWith("/") ? body.next : "/",
  });

  res.cookies.set(COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });

  return res;
}
