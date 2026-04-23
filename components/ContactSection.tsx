"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import type { MorouteContent } from "@/types/content";

type ContactSectionProps = {
  contact: MorouteContent["contact"];
};

export default function ContactSection({ contact }: ContactSectionProps) {
  const [submitState, setSubmitState] = useState<"idle" | "sending" | "sent">("idle");
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (submitState === "sending") {
      return;
    }

    const form = event.currentTarget;
    setSubmitState("sending");

    if (timeoutRef.current !== null) {
      window.clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = window.setTimeout(() => {
      setSubmitState("sent");
      form.reset();

      timeoutRef.current = window.setTimeout(() => {
        setSubmitState("idle");
        timeoutRef.current = null;
      }, 2300);
    }, 850);
  };

  return (
    <section className="contact-section" id="contact" data-reveal>
      <p className="section-tag">{contact.sectionTag}</p>
      <h2 className="contact-title">{contact.title}</h2>
      <p className="contact-description">{contact.description}</p>

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
            className={
              submitState === "sent"
                ? "contact-success"
                : submitState === "sending"
                  ? "contact-pending"
                  : "contact-hint"
            }
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
    </section>
  );
}
