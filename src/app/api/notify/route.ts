import { NextResponse } from "next/server";
import { sendNotifySignupEmails } from "@/lib/email";

const ALLOWED_INTERESTS = new Set(["discounts", "arrivals", "availability"]);

type NotifyBody = {
  email?: string;
  phone?: string;
  interests?: string[];
};

export async function POST(request: Request) {
  let body: NotifyBody;
  try {
    body = (await request.json()) as NotifyBody;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const email = body.email?.trim().toLowerCase() || "";
  const phone = body.phone?.trim() || "";
  const phoneDigits = phone.replace(/\D/g, "");
  const emailOk = email.includes("@") && email.includes(".");
  const phoneOk = phoneDigits.length >= 8 && phoneDigits.length <= 15;
  const interests = Array.isArray(body.interests)
    ? body.interests.filter(
        (id): id is string => typeof id === "string" && ALLOWED_INTERESTS.has(id),
      )
    : [];

  if (!emailOk && !phoneOk) {
    return NextResponse.json(
      { error: "Enter a valid email or phone number" },
      { status: 400 },
    );
  }

  if (interests.length === 0) {
    return NextResponse.json(
      { error: "Enter a valid email and pick at least one topic" },
      { status: 400 },
    );
  }

  const result = await sendNotifySignupEmails({
    ...(emailOk ? { email } : {}),
    ...(phoneOk ? { phone } : {}),
    interests,
  });
  if (!result.ok) {
    console.error("[notify]", result.error);
    return NextResponse.json(
      { error: "Could not save your signup. Try again in a moment." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
