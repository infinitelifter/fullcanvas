"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import type { Content, Lang } from "@/lib/content";

type Status = "idle" | "sending" | "success" | "error";

type FieldName = "name" | "company" | "email" | "phone" | "message";

const EMPTY: Record<FieldName, string> = {
  name: "",
  company: "",
  email: "",
  phone: "",
  message: "",
};

/** Deliberately permissive — server does the authoritative check. */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

export default function BookingModal({
  open,
  onClose,
  t,
  lang,
}: {
  open: boolean;
  onClose: () => void;
  t: Content;
  lang: Lang;
}) {
  const f = t.form;
  const uid = useId();
  const dialogRef = useRef<HTMLDivElement>(null);
  const firstFieldRef = useRef<HTMLInputElement>(null);
  const restoreFocusRef = useRef<HTMLElement | null>(null);

  const [values, setValues] = useState<Record<FieldName, string>>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<FieldName, string>>>({});
  const [status, setStatus] = useState<Status>("idle");
  /** Honeypot: bots fill hidden fields, humans never see this one. */
  const [website, setWebsite] = useState("");

  const reset = useCallback(() => {
    setValues(EMPTY);
    setErrors({});
    setStatus("idle");
    setWebsite("");
  }, []);

  const close = useCallback(() => {
    onClose();
    // Let the exit finish before wiping the form, so text doesn't visibly clear.
    window.setTimeout(reset, 250);
  }, [onClose, reset]);

  // Remember what to focus on the way back out.
  useEffect(() => {
    if (open) restoreFocusRef.current = document.activeElement as HTMLElement;
  }, [open]);

  // Lock background scroll without the layout shifting as the scrollbar goes.
  useEffect(() => {
    if (!open) return;
    const { body, documentElement } = document;
    const gap = window.innerWidth - documentElement.clientWidth;
    const prevOverflow = body.style.overflow;
    const prevPad = body.style.paddingRight;
    body.style.overflow = "hidden";
    if (gap > 0) body.style.paddingRight = `${gap}px`;
    return () => {
      body.style.overflow = prevOverflow;
      body.style.paddingRight = prevPad;
    };
  }, [open]);

  // Move focus in on open, back out on close.
  useEffect(() => {
    if (open) {
      const id = window.setTimeout(() => firstFieldRef.current?.focus(), 60);
      return () => window.clearTimeout(id);
    }
    restoreFocusRef.current?.focus?.();
  }, [open]);

  // ESC to dismiss, TAB kept inside the dialog.
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
        return;
      }
      if (e.key !== "Tab") return;
      const nodes = dialogRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE);
      if (!nodes || nodes.length === 0) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, close]);

  const setField = (field: FieldName) => (value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    // Clear the error as soon as they start fixing it.
    setErrors((prev) => (prev[field] ? { ...prev, [field]: undefined } : prev));
  };

  const validate = () => {
    const next: Partial<Record<FieldName, string>> = {};
    if (!values.name.trim()) next.name = f.required;
    if (!values.company.trim()) next.company = f.required;
    if (!values.email.trim()) next.email = f.required;
    else if (!EMAIL_RE.test(values.email.trim())) next.email = f.invalidEmail;
    if (!values.message.trim()) next.message = f.required;
    setErrors(next);
    return next;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "sending") return;

    const found = validate();
    const firstBad = (Object.keys(found) as FieldName[])[0];
    if (firstBad) {
      dialogRef.current
        ?.querySelector<HTMLElement>(`[data-field="${firstBad}"]`)
        ?.focus();
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, website, lang }),
      });
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  };

  if (!open) return null;

  const titleId = `${uid}-title`;
  const descId = `${uid}-desc`;

  return (
    <div className="modal" role="presentation" onMouseDown={close}>
      <div className="modal__backdrop" aria-hidden="true" />
      <div
        ref={dialogRef}
        className="modal__dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descId}
        // Clicks inside must not reach the backdrop handler above.
        onMouseDown={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="modal__close"
          onClick={close}
          aria-label={f.close}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
            <path
              d="M2 2l12 12M14 2L2 14"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
          </svg>
        </button>

        {status === "success" ? (
          <div className="modal__done">
            <div className="modal__done-mark" aria-hidden="true">
              <svg width="26" height="26" viewBox="0 0 26 26">
                <path
                  d="M5 13.5l5 5L21 7.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h2 id={titleId} className="modal__title">
              {f.successTitle}
            </h2>
            <p id={descId} className="modal__sub">
              {f.successBody}
            </p>
            <button type="button" className="modal__submit" onClick={close}>
              {f.close}
            </button>
          </div>
        ) : (
          <>
            <div className="modal__head">
              <h2 id={titleId} className="modal__title">
                {f.title}
              </h2>
              <p id={descId} className="modal__sub">
                {f.subtitle}
              </p>
            </div>

            <form className="modal__form" onSubmit={onSubmit} noValidate>
              <div className="modal__row">
                <Field
                  id={`${uid}-name`}
                  name="name"
                  label={f.name}
                  value={values.name}
                  onChange={setField("name")}
                  error={errors.name}
                  inputRef={firstFieldRef}
                  autoComplete="name"
                />
                <Field
                  id={`${uid}-company`}
                  name="company"
                  label={f.company}
                  value={values.company}
                  onChange={setField("company")}
                  error={errors.company}
                  autoComplete="organization"
                />
              </div>

              <div className="modal__row">
                <Field
                  id={`${uid}-email`}
                  name="email"
                  type="email"
                  label={f.email}
                  value={values.email}
                  onChange={setField("email")}
                  error={errors.email}
                  autoComplete="email"
                />
                <Field
                  id={`${uid}-phone`}
                  name="phone"
                  type="tel"
                  label={f.phone}
                  hint={f.phoneOptional}
                  value={values.phone}
                  onChange={setField("phone")}
                  error={errors.phone}
                  autoComplete="tel"
                />
              </div>

              <div className="modal__field">
                <label className="modal__label" htmlFor={`${uid}-message`}>
                  {f.message}
                </label>
                <textarea
                  id={`${uid}-message`}
                  data-field="message"
                  className={`modal__input modal__textarea${errors.message ? " has-error" : ""}`}
                  rows={4}
                  placeholder={f.messagePlaceholder}
                  value={values.message}
                  onChange={(e) => setField("message")(e.target.value)}
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={errors.message ? `${uid}-message-err` : undefined}
                />
                {errors.message && (
                  <span id={`${uid}-message-err`} className="modal__error" role="alert">
                    {errors.message}
                  </span>
                )}
              </div>

              {/* Honeypot — hidden from people, irresistible to bots. */}
              <div className="modal__hp" aria-hidden="true">
                <label htmlFor={`${uid}-website`}>Website</label>
                <input
                  id={`${uid}-website`}
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                />
              </div>

              {status === "error" && (
                <p className="modal__alert" role="alert">
                  <strong>{f.errorTitle}</strong> {f.errorBody}{" "}
                  <a href={`mailto:${t.email}`}>{t.email}</a>
                </p>
              )}

              <div className="modal__foot">
                <button
                  type="submit"
                  className="modal__submit"
                  disabled={status === "sending"}
                >
                  {status === "sending" ? f.sending : f.submit}
                </button>
                <span className="modal__note">{f.note}</span>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

function Field({
  id,
  name,
  label,
  hint,
  type = "text",
  value,
  onChange,
  error,
  inputRef,
  autoComplete,
}: {
  id: string;
  name: FieldName;
  label: string;
  hint?: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  inputRef?: React.RefObject<HTMLInputElement | null>;
  autoComplete?: string;
}) {
  return (
    <div className="modal__field">
      <label className="modal__label" htmlFor={id}>
        {label}
        {hint && <span className="modal__hint"> ({hint})</span>}
      </label>
      <input
        ref={inputRef}
        id={id}
        data-field={name}
        type={type}
        className={`modal__input${error ? " has-error" : ""}`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        autoComplete={autoComplete}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-err` : undefined}
      />
      {error && (
        <span id={`${id}-err`} className="modal__error" role="alert">
          {error}
        </span>
      )}
    </div>
  );
}
