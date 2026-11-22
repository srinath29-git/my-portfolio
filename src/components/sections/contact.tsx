"use client";

import { useState } from "react";
import {
  AlertCircle,
  ArrowUpRight,
  Check,
  Loader2,
  Mail,
  MapPin,
  Send,
  Sparkles,
} from "lucide-react";
import { profile, contactCopy } from "@/data/portfolio";
import { contactSchema } from "@/lib/validation";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { CopyButton } from "@/components/ui/copy-button";
import { SocialLinks } from "@/components/ui/social-links";
import { LocalTime } from "@/components/ui/local-time";
import { useToast } from "@/components/providers/toast-provider";
import { siteConfig } from "@/data/portfolio";
import { cn } from "@/lib/utils";

const initialValues = {
  name: "",
  email: "",
  company: "",
  subject: "",
  message: "",
  website: "",
};

type FormValues = typeof initialValues;
type FieldErrors = Partial<Record<keyof FormValues | "form", string>>;

const fieldIds: Record<string, string> = {
  name: "contact-name",
  email: "contact-email",
  company: "contact-company",
  subject: "contact-subject",
  message: "contact-message",
};

export function Contact() {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const { toast } = useToast();

  const update = (field: keyof FormValues, value: string) => {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => {
      if (!current[field]) return current;
      const next = { ...current };
      delete next[field];
      return next;
    });
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === "sending") return;

    const parsed = contactSchema.safeParse(values);
    if (!parsed.success) {
      const nextErrors: FieldErrors = {};
      for (const issue of parsed.error.issues) {
        const key = String(issue.path[0] ?? "form") as keyof FormValues;
        if (!nextErrors[key]) nextErrors[key] = issue.message;
      }
      setErrors(nextErrors);
      toast("Please check the highlighted fields.", "error");
      const firstKey = Object.keys(nextErrors)[0];
      const element = firstKey ? document.getElementById(fieldIds[firstKey] ?? "") : null;
      element?.focus();
      return;
    }

    setStatus("sending");
    setErrors({});

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, ...parsed.data }),
      });
      const data = (await response.json().catch(() => null)) as
        | { ok?: boolean; message?: string; errors?: Record<string, string> }
        | null;

      if (!response.ok || !data?.ok) {
        if (data?.errors) {
          setErrors(data.errors);
          const firstKey = Object.keys(data.errors)[0];
          document.getElementById(fieldIds[firstKey] ?? "")?.focus();
        }
        throw new Error(
          data?.message ?? "The message couldn't be delivered. Please try again.",
        );
      }

      setStatus("sent");
      setValues(initialValues);
      toast("Message delivered. Thank you for reaching out.", "success");
    } catch (error) {
      setStatus("idle");
      const message =
        error instanceof Error
          ? error.message
          : "The message couldn't be delivered. Please try again.";
      setErrors({ form: message });
      toast(message, "error");
    }
  };

  return (
    <section id="contact" className="section relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[40rem] opacity-60"
        style={{
          background:
            "radial-gradient(50% 60% at 70% 0%, color-mix(in srgb, var(--accent) 13%, transparent), transparent 70%)",
        }}
      />
      <div className="shell">
        <SectionHeading
          index="09"
          eyebrow="Contact"
          title={
            <>
              Let&apos;s make
              <br />
              it <span className="serif text-muted">real.</span>
            </>
          }
          description={contactCopy.body}
        >
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[13px] uppercase tracking-[0.12em] text-subtle">
            <span className="flex items-center gap-2">
              <span className="pulse-dot" />
              {profile.availability}
            </span>
            <span className="h-3 w-px bg-line" />
            <span>Hyderabad / IST</span>
          </div>
        </SectionHeading>

        <div className="mt-14 grid gap-10 lg:mt-20 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-4">
            <Reveal>
              <p className="mono text-subtle">Direct line</p>
              <a
                href={`mailto:${profile.email}`}
                className="group mt-4 block max-w-full text-[clamp(1.05rem,1.6vw,1.35rem)] font-display font-semibold leading-tight tracking-[-0.03em] break-words transition-colors hover:text-accent"
                data-cursor="hover"
                data-cursor-label="Email"
              >
                {profile.email}
                <ArrowUpRight className="ml-1 inline h-4 w-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
              <div className="mt-4">
                <CopyButton
                  value={profile.email}
                  label="Copy address"
                  successMessage="Email copied to clipboard."
                  className="text-muted hover:text-fg"
                />
              </div>
            </Reveal>

            <Reveal className="mt-8 border-t border-line pt-6" delay={0.08}>
              <p className="mono text-subtle">Open to</p>
              <ul className="mt-4 space-y-2.5">
                {[
                  "AI & software engineering internships",
                  "Frontend / interface collaborations",
                  "AI, data, cloud & RAG conversations",
                  "Student programs and learning opportunities",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-[13px] text-muted">
                    <span className="mt-[0.42rem] h-1 w-1 flex-none rounded-full bg-accent" />
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal className="mt-8 border-t border-line pt-6" delay={0.12}>
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[13px] text-muted">
                <span className="flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5 text-subtle" />
                  {profile.locationShort}
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  <LocalTime timeZone={siteConfig.timeZone} /> IST
                </span>
              </div>
              <SocialLinks className="mt-4" />
              <p className="mt-4 text-[13px] leading-relaxed text-subtle">
                Prefer email? It reaches the same inbox. No phone number is published.
              </p>
            </Reveal>

            <Reveal className="mt-8 rounded-xl border border-line bg-surface p-4" delay={0.16}>
              <div className="flex items-start gap-2.5">
                <Sparkles className="mt-0.5 h-3.5 w-3.5 flex-none text-accent" />
                <p className="text-[13px] leading-relaxed text-muted">
                  This form delivers over Resend or Supabase when configured, with a local
                  fallback for development. Your details are used only to reply.
                </p>
              </div>
            </Reveal>
          </div>

          <Reveal className="lg:col-span-7 lg:col-start-6" delay={0.1}>
            <div className="relative overflow-hidden rounded-2xl border border-line bg-surface p-5 shadow-[var(--shadow)] sm:p-7">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-accent/10 blur-3xl"
              />

              {status === "sent" ? (
                <div className="relative flex min-h-[28rem] flex-col items-center justify-center px-4 text-center">
                  <span className="grid h-16 w-16 place-items-center rounded-full border border-emerald-400/25 bg-emerald-400/10 text-emerald-700 dark:text-emerald-300">
                    <Check className="h-7 w-7" />
                  </span>
                  <p className="mt-6 font-mono text-[13px] uppercase tracking-[0.16em] text-subtle">
                    Message delivered
                  </p>
                  <h3 className="mt-3 text-balance font-display text-[clamp(1.6rem,3vw,2.2rem)] font-semibold leading-[1.05] tracking-[-0.04em]">
                    Thank you. It&apos;s in the inbox.
                  </h3>
                  <p className="mt-3 max-w-sm text-pretty text-[0.94rem] leading-relaxed text-muted">
                    I read every message personally. If you&apos;d rather reach out directly,
                    email{" "}
                    <a
                      href={`mailto:${profile.email}`}
                      className="text-fg underline decoration-line-strong underline-offset-4 transition hover:text-accent"
                    >
                      {profile.email}
                    </a>
                    .
                  </p>
                  <button
                    type="button"
                    onClick={() => setStatus("idle")}
                    className="btn btn-ghost btn-sm mt-7"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={onSubmit} noValidate className="relative">
                  <div className="flex items-center justify-between gap-4 border-b border-line pb-4">
                    <p className="mono text-subtle">Project brief / message</p>
                    <span className="flex items-center gap-1.5 font-mono text-[13px] uppercase tracking-[0.1em] text-subtle">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                      Inbox open
                    </span>
                  </div>

                  <div className="mt-6 grid gap-5 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="contact-name"
                        className="field-label font-mono text-[13px] uppercase tracking-[0.12em]"
                      >
                        <span>Name *</span>
                      </label>
                      <input
                        id="contact-name"
                        name="name"
                        value={values.name}
                        onChange={(event) => update("name", event.target.value)}
                        className="field"
                        placeholder="Your name"
                        autoComplete="name"
                        aria-invalid={Boolean(errors.name)}
                        aria-describedby={errors.name ? "contact-name-error" : undefined}
                      />
                      {errors.name && (
                        <p id="contact-name-error" className="mt-1.5 text-[13px] text-red-600 dark:text-red-400">
                          {errors.name}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="contact-email"
                        className="field-label font-mono text-[13px] uppercase tracking-[0.12em]"
                      >
                        <span>Email *</span>
                      </label>
                      <input
                        id="contact-email"
                        name="email"
                        type="email"
                        value={values.email}
                        onChange={(event) => update("email", event.target.value)}
                        className="field"
                        placeholder="you@company.com"
                        autoComplete="email"
                        aria-invalid={Boolean(errors.email)}
                        aria-describedby={errors.email ? "contact-email-error" : undefined}
                      />
                      {errors.email && (
                        <p id="contact-email-error" className="mt-1.5 text-[13px] text-red-600 dark:text-red-400">
                          {errors.email}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="contact-company"
                        className="field-label font-mono text-[13px] uppercase tracking-[0.12em]"
                      >
                        <span>Company / team</span>
                        <span className="text-subtle">Optional</span>
                      </label>
                      <input
                        id="contact-company"
                        name="company"
                        value={values.company}
                        onChange={(event) => update("company", event.target.value)}
                        className="field"
                        placeholder="Where you're writing from"
                        autoComplete="organization"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="contact-subject"
                        className="field-label font-mono text-[13px] uppercase tracking-[0.12em]"
                      >
                        <span>Subject *</span>
                      </label>
                      <input
                        id="contact-subject"
                        name="subject"
                        value={values.subject}
                        onChange={(event) => update("subject", event.target.value)}
                        className="field"
                        placeholder="Internship, collaboration, hello…"
                        aria-invalid={Boolean(errors.subject)}
                        aria-describedby={errors.subject ? "contact-subject-error" : undefined}
                      />
                      {errors.subject && (
                        <p id="contact-subject-error" className="mt-1.5 text-[13px] text-red-600 dark:text-red-400">
                          {errors.subject}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="mt-5">
                    <label
                      htmlFor="contact-message"
                      className="field-label font-mono text-[13px] uppercase tracking-[0.12em]"
                    >
                      <span>Message *</span>
                      <span className="text-subtle">{values.message.length} / 4000</span>
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      value={values.message}
                      onChange={(event) => update("message", event.target.value)}
                      className="field min-h-[9rem] resize-y"
                      placeholder="A little context: what you're working on, what you need, and why it might be a fit."
                      rows={6}
                      maxLength={4000}
                      aria-invalid={Boolean(errors.message)}
                      aria-describedby={errors.message ? "contact-message-error" : "contact-message-hint"}
                    />
                    {errors.message ? (
                      <p id="contact-message-error" className="mt-1.5 text-[13px] text-red-600 dark:text-red-400">
                        {errors.message}
                      </p>
                    ) : (
                      <p id="contact-message-hint" className="mt-1.5 text-[13px] text-subtle">
                        At least 20 characters. Specific is better than polished.
                      </p>
                    )}
                  </div>

                  <div aria-hidden="true" className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden">
                    <label htmlFor="contact-website">Website</label>
                    <input
                      id="contact-website"
                      name="website"
                      tabIndex={-1}
                      autoComplete="off"
                      value={values.website}
                      onChange={(event) => update("website", event.target.value)}
                    />
                  </div>

                  {errors.form && (
                    <div
                      role="alert"
                      className="mt-5 flex items-start gap-2.5 rounded-xl border border-red-400/25 bg-red-400/10 px-3.5 py-3 text-[13px] leading-relaxed text-red-600 dark:text-red-300"
                    >
                      <AlertCircle className="mt-0.5 h-3.5 w-3.5 flex-none" />
                      {errors.form}
                    </div>
                  )}

                  <div className="mt-6 flex flex-col gap-4 border-t border-line pt-5 sm:flex-row sm:items-center sm:justify-between">
                    <p className="max-w-xs text-[13px] leading-relaxed text-subtle">
                      No newsletter, no third-party marketing. Just a reply.
                    </p>
                    <button
                      type="submit"
                      disabled={status === "sending"}
                      className={cn("btn btn-primary group min-w-[10.5rem]", status === "sending" && "opacity-80")}
                    >
                      {status === "sending" ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Sending…
                        </>
                      ) : (
                        <>
                          Send message
                          <Send className="h-3.5 w-3.5 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </>
                      )}
                    </button>
                  </div>
                  <p aria-live="polite" className="sr-only">
                    {status === "sending" ? "Sending your message." : ""}
                  </p>
                </form>
              )}
            </div>
          </Reveal>
        </div>

        <div className="mt-14 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-5">
          <p className="font-mono text-[13px] uppercase tracking-[0.12em] text-subtle">
            {contactCopy.eyebrow}
          </p>
          <a
            href={`mailto:${profile.email}`}
            className="group inline-flex items-center gap-1.5 text-[13px] text-muted transition hover:text-accent"
            data-cursor="hover"
          >
            <Mail className="h-3.5 w-3.5" />
            {profile.email}
            <ArrowUpRight className="h-3 w-3 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </div>
      </div>
    </section>
  );
}
