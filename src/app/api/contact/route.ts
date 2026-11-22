import { NextResponse } from "next/server";
import { promises as fs } from "node:fs";
import path from "node:path";
import { clientKey, rateLimit } from "@/lib/rate-limit";
import { contactSchema } from "@/lib/validation";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type ContactMessage = {
  name: string;
  email: string;
  subject: string;
  message: string;
  company?: string;
  submittedAt: string;
};

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

async function sendWithResend(data: ContactMessage) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_EMAIL;
  if (!apiKey || !to) return false;

  const from =
    process.env.CONTACT_FROM_EMAIL ?? "Portfolio <onboarding@resend.dev>";

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: data.email,
      subject: `Portfolio enquiry — ${data.subject}`,
      text: [
        `New message from ${data.name} <${data.email}>`,
        data.company ? `Company: ${data.company}` : "",
        "",
        data.message,
        "",
        `Sent ${data.submittedAt}`,
      ]
        .filter(Boolean)
        .join("\n"),
      html: `
        <div style="font-family:Inter,Arial,sans-serif;line-height:1.6;color:#111827;max-width:620px">
          <p style="font-size:12px;letter-spacing:.12em;text-transform:uppercase;color:#4d8dff;margin:0 0 20px">Portfolio enquiry</p>
          <h2 style="margin:0 0 8px;font-size:22px">${escapeHtml(data.subject)}</h2>
          <p style="margin:0 0 24px;color:#6b7280">From ${escapeHtml(data.name)} &lt;${escapeHtml(data.email)}&gt;${data.company ? ` · ${escapeHtml(data.company)}` : ""}</p>
          <div style="white-space:pre-wrap;border-left:2px solid #4d8dff;padding-left:16px">${escapeHtml(data.message)}</div>
          <p style="margin-top:28px;font-size:12px;color:#9ca3af">Received ${escapeHtml(data.submittedAt)}</p>
        </div>
      `,
    }),
  });

  if (!response.ok) {
    throw new Error(`Resend request failed with ${response.status}`);
  }
  return true;
}

async function storeWithSupabase(data: ContactMessage) {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return false;

  const response = await fetch(`${url}/rest/v1/messages`, {
    method: "POST",
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify({
      name: data.name,
      email: data.email,
      subject: data.subject,
      message: data.message,
      company: data.company ?? null,
      created_at: data.submittedAt,
    }),
  });

  if (!response.ok) {
    throw new Error(`Supabase request failed with ${response.status}`);
  }
  return true;
}

async function storeLocally(data: ContactMessage) {
  const directory = path.join(process.cwd(), ".data");
  await fs.mkdir(directory, { recursive: true });
  await fs.appendFile(
    path.join(directory, "messages.jsonl"),
    `${JSON.stringify(data)}\n`,
    "utf8",
  );
  return true;
}

export async function POST(request: Request) {
  const limit = rateLimit(clientKey(request.headers));
  if (!limit.allowed) {
    return NextResponse.json(
      {
        ok: false,
        message: "Too many messages in a short window. Please try again later.",
      },
      { status: 429 },
    );
  }

  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, message: "Invalid request body." },
      { status: 400 },
    );
  }

  // Honeypot. Return success so automated submissions do not learn the rule.
  if (
    raw &&
    typeof raw === "object" &&
    "website" in raw &&
    typeof (raw as { website?: unknown }).website === "string" &&
    (raw as { website: string }).website.trim().length > 0
  ) {
    return NextResponse.json({ ok: true, delivery: "ignored" });
  }

  const parsed = contactSchema.safeParse(raw);
  if (!parsed.success) {
    const errors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? "form");
      if (!errors[key]) errors[key] = issue.message;
    }
    return NextResponse.json(
      {
        ok: false,
        message: "Please check the highlighted fields.",
        errors,
      },
      { status: 422 },
    );
  }

  const data: ContactMessage = {
    name: parsed.data.name,
    email: parsed.data.email,
    subject: parsed.data.subject,
    message: parsed.data.message,
    company: parsed.data.company || undefined,
    submittedAt: new Date().toISOString(),
  };

  try {
    if (await sendWithResend(data)) {
      return NextResponse.json({ ok: true, delivery: "email" });
    }

    if (await storeWithSupabase(data)) {
      return NextResponse.json({ ok: true, delivery: "supabase" });
    }

    await storeLocally(data);
    return NextResponse.json({ ok: true, delivery: "local" });
  } catch (error) {
    console.error("Contact delivery failed", error);
    return NextResponse.json(
      {
        ok: false,
        message:
          "The message couldn't be delivered right now. Please email me directly at nallamothusrinath999@gmail.com.",
      },
      { status: 503 },
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { ok: true, message: "Contact endpoint ready." },
    { headers: { Allow: "POST" } },
  );
}
