"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { createPortal } from "react-dom";
import { CheckCircle, Mail, Phone, XCircle, X } from "lucide-react";
import type { MorouteContent } from "@/types/content";

type ContactSectionProps = {
  contact: MorouteContent["contact"];
};

type ToastState = { type: "success" | "error"; title: string; message: string } | null;

const TOAST_DURATION = 5000;

export default function ContactSection({ contact }: ContactSectionProps) {
  const [submitState, setSubmitState] = useState<"idle" | "sending" | "sent">("idle");
  const [toast, setToast] = useState<ToastState>(null);
  const [isMounted, setIsMounted] = useState(false);
  const submitTimerRef = useRef<number | null>(null);
  const toastTimerRef = useRef<number | null>(null);
  const hasSectionTag = contact.sectionTag.trim().length > 0;

  useEffect(() => {
    setIsMounted(true);
    return () => {
      if (submitTimerRef.current !== null) window.clearTimeout(submitTimerRef.current);
      if (toastTimerRef.current !== null) window.clearTimeout(toastTimerRef.current);
    };
  }, []);

  const showToast = (type: "success" | "error", title: string, message: string) => {
    if (toastTimerRef.current !== null) window.clearTimeout(toastTimerRef.current);
    setToast({ type, title, message });
    toastTimerRef.current = window.setTimeout(() => {
      setToast(null);
      toastTimerRef.current = null;
    }, TOAST_DURATION);
  };

  const dismissToast = () => {
    if (toastTimerRef.current !== null) {
      window.clearTimeout(toastTimerRef.current);
      toastTimerRef.current = null;
    }
    setToast(null);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (submitState === "sending") return;

    const form = event.currentTarget;
    const data = new FormData(form);
    const name = (data.get("name") as string).trim();
    const email = (data.get("email") as string).trim();
    const message = (data.get("message") as string).trim();

    setSubmitState("sending");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });

      if (response.ok) {
        setSubmitState("sent");
        form.reset();
        showToast("success", "Message sent!", contact.form.successMessage);
        submitTimerRef.current = window.setTimeout(() => {
          setSubmitState("idle");
          submitTimerRef.current = null;
        }, 2500);
      } else {
        const payload = await response.json().catch(() => ({}));
        setSubmitState("idle");
        showToast("error", "Couldn't send message", payload.error ?? "Something went wrong. Please try again.");
      }
    } catch {
      setSubmitState("idle");
      showToast("error", "Network error", "Check your connection and try again.");
    }
  };

  return (
    <section className="contact-section" id="contact" data-reveal>
      {hasSectionTag ? <p className="section-tag">{contact.sectionTag}</p> : null}
      <h2 className="contact-title">{contact.title}</h2>
      <p className="contact-description">{contact.description}</p>

      <div className="contact-details">
        <a href={contact.phone.href} className="contact-detail-item">
          <span className="contact-detail-icon contact-detail-icon--phone" aria-hidden="true">
            <Phone size={16} strokeWidth={2.3} />
          </span>
          <span className="contact-detail-body">
            <span className="contact-detail-label">{contact.phone.label}</span>
            <span className="contact-detail-value">{contact.phone.value}</span>
          </span>
        </a>
        <a href={contact.email.href} className="contact-detail-item">
          <span className="contact-detail-icon contact-detail-icon--email" aria-hidden="true">
            <Mail size={16} strokeWidth={2.3} />
          </span>
          <span className="contact-detail-body">
            <span className="contact-detail-label">{contact.email.label}</span>
            <span className="contact-detail-value">{contact.email.value}</span>
          </span>
        </a>
      </div>

      <div className="contact-divider" aria-hidden="true">
        <span />
        <p>or send a message</p>
        <span />
      </div>

      <form className="contact-form" onSubmit={handleSubmit}>
        <div className="contact-grid">
          <label className="field-wrap" htmlFor="contact-name">
            <span>{contact.form.nameLabel}</span>
            <input
              id="contact-name"
              name="name"
              type="text"
              placeholder={contact.form.namePlaceholder}
              autoComplete="name"
              required
            />
          </label>

          <label className="field-wrap" htmlFor="contact-email">
            <span>{contact.form.emailLabel}</span>
            <input
              id="contact-email"
              name="email"
              type="email"
              placeholder={contact.form.emailPlaceholder}
              autoComplete="email"
              required
            />
          </label>
        </div>

        <label className="field-wrap field-wrap-full" htmlFor="contact-message">
          <span>{contact.form.messageLabel}</span>
          <textarea
            id="contact-message"
            name="message"
            placeholder={contact.form.messagePlaceholder}
            rows={5}
            required
          />
        </label>

        <div className="contact-actions">
          <button
            type="submit"
            className={`contact-submit${submitState === "sending" ? " is-sending" : ""}${submitState === "sent" ? " is-sent" : ""}`}
            disabled={submitState === "sending"}
          >
            {submitState === "sending" ? <span className="submit-spinner" aria-hidden="true" /> : null}
            {submitState === "sent" ? (
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M2.5 7.4L5.6 10.5L11.5 4.4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            ) : null}
            <span>
              {submitState === "sending"
                ? contact.form.sendingLabel
                : submitState === "sent"
                  ? contact.form.sentLabel
                  : contact.form.submitLabel}
            </span>
          </button>
          <p
            className={submitState === "sent" ? "contact-success" : submitState === "sending" ? "contact-pending" : "contact-hint"}
            aria-live="polite"
          >
            {submitState === "sent"
              ? contact.form.successMessage
              : submitState === "sending"
                ? contact.form.sendingMessage
                : contact.form.helperText}
          </p>
        </div>
      </form>

      {toast && isMounted
        ? createPortal(
            <div
              className={`toast toast--${toast.type}`}
              role="alert"
              aria-live="assertive"
              style={{ "--toast-duration": `${TOAST_DURATION}ms` } as React.CSSProperties}
            >
              <span className="toast-icon" aria-hidden="true">
                {toast.type === "success"
                  ? <CheckCircle size={18} strokeWidth={2.2} />
                  : <XCircle size={18} strokeWidth={2.2} />}
              </span>
              <span className="toast-body">
                <span className="toast-title">{toast.title}</span>
                <span className="toast-message">{toast.message}</span>
              </span>
              <button type="button" className="toast-close" onClick={dismissToast} aria-label="Dismiss notification">
                <X size={14} />
              </button>
              <span className="toast-progress" aria-hidden="true" />
            </div>,
            document.body
          )
        : null}
    </section>
  );
}
