import { NextResponse } from "next/server";

/**
 * Contact endpoint for the booking modal.
 *
 * Talks to the Resend REST API directly rather than via the `resend` SDK — one
 * less dependency to keep patched, and the payload is three fields.
 *
 * Required env vars (set in Vercel → Settings → Environment Variables):
 *   RESEND_API_KEY   re_...
 *   CONTACT_TO       where leads land, e.g. your personal inbox
 *   CONTACT_FROM     verified sender, e.g. "Full Canvas <web@yourdomain>"
 */

export const runtime = "nodejs";
/** Never cache a POST handler's response. */
export const dynamic = "force-dynamic";

const LIMITS = {
  name: 120,
  company: 160,
  email: 254,
  phone: 60,
  message: 4000,
} as const;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function clean(value: unknown, max: number): string {
  if (typeof value !== "string") return "";
  // Strip control characters that could forge header-ish lines, but keep
  // newlines and tabs so a multi-line message body survives intact.
  return value
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "")
    .trim()
    .slice(0, max);
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Malformed JSON." }, { status: 400 });
  }

  const raw = (body ?? {}) as Record<string, unknown>;

  // Honeypot. Silently accept so the bot doesn't learn anything from a 4xx.
  if (clean(raw.website, 200)) {
    return NextResponse.json({ ok: true });
  }

  const name = clean(raw.name, LIMITS.name);
  const company = clean(raw.company, LIMITS.company);
  const email = clean(raw.email, LIMITS.email);
  const phone = clean(raw.phone, LIMITS.phone);
  const message = clean(raw.message, LIMITS.message);
  const lang = raw.lang === "en" ? "en" : "cs";

  if (!name || !company || !message || !EMAIL_RE.test(email)) {
    return NextResponse.json(
      { error: "Missing or invalid fields." },
      { status: 422 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO;
  const from = process.env.CONTACT_FROM;

  if (!apiKey || !to || !from) {
    // Config problem, not the visitor's fault — make it obvious in the logs.
    console.error(
      "[contact] Missing env: " +
        [
          !apiKey && "RESEND_API_KEY",
          !to && "CONTACT_TO",
          !from && "CONTACT_FROM",
        ]
          .filter(Boolean)
          .join(", "),
    );
    return NextResponse.json({ error: "Mail is not configured." }, { status: 500 });
  }

  const rows: Array<[string, string]> = [
    ["Jméno / Name", name],
    ["Firma / Company", company],
    ["E-mail", email],
    ["Telefon / Phone", phone || "—"],
    ["Jazyk / Language", lang.toUpperCase()],
  ];

  const html = `
    <div style="font-family:ui-sans-serif,system-ui,sans-serif;line-height:1.55;color:#26242c">
      <h2 style="margin:0 0 4px;font-size:18px">Nová poptávka z webu</h2>
      <p style="margin:0 0 20px;color:#56535f;font-size:14px">fullcanvas — booking form</p>
      <table cellpadding="0" cellspacing="0" style="font-size:14px;margin-bottom:20px">
        ${rows
          .map(
            ([k, v]) =>
              `<tr><td style="padding:3px 18px 3px 0;color:#56535f;white-space:nowrap">${escapeHtml(k)}</td><td style="padding:3px 0"><strong>${escapeHtml(v)}</strong></td></tr>`,
          )
          .join("")}
      </table>
      <div style="padding:16px 18px;background:#f5f2ee;border-left:3px solid #7c2d46;border-radius:4px;white-space:pre-wrap;font-size:14px">${escapeHtml(message)}</div>
    </div>
  `;

  const text = [
    ...rows.map(([k, v]) => `${k}: ${v}`),
    "",
    message,
  ].join("\n");

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        // Hitting reply in your inbox answers the lead, not yourself.
        reply_to: email,
        subject: `Poptávka: ${company} — ${name}`,
        html,
        text,
      }),
    });

    if (!res.ok) {
      console.error("[contact] Resend rejected:", res.status, await res.text());
      return NextResponse.json({ error: "Could not send." }, { status: 502 });
    }
  } catch (err) {
    console.error("[contact] Resend unreachable:", err);
    return NextResponse.json({ error: "Could not send." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
