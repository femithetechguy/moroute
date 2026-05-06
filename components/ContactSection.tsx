"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { createPortal } from "react-dom";
import { CheckCircle, Mail, Phone } from "lucide-react";
import type { MorouteContent } from "@/types/content";

type ContactSectionProps = {
  contact: MorouteContent["contact"];
};

export default function ContactSection({ contact }: ContactSectionProps) {
  const [submitState, setSubmitState] = useState<"idle" | "sending" | "sent">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const formRef = useRef<HTMLFormElement | null>(null);
  const hasSectionTag = contact.sectionTag.trim().length > 0;

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!showModal) return;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, [showModal]);

  const closeModal = () => {
    setShowModal(false);
    setSubmitState("idle");
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
    setErrorMessage(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });

      if (response.ok) {
        form.reset();
        setSubmitState("sent");
        setShowModal(true);
      } else {
        const payload = await response.json().catch(() => ({}));
        setSubmitState("idle");
        setErrorMessage(payload.error ?? "Something went wrong. Please try again.");
      }
    } catch {
      setSubmitState("idle");
      setErrorMessage("Check your connection and try again.");
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

      <form className="contact-form" ref={formRef} onSubmit={handleSubmit}>
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
            className={`contact-submit${submitState === "sending" ? " is-sending" : ""}`}
            disabled={submitState === "sending"}
          >
            {submitState === "sending" ? <span className="submit-spinner" aria-hidden="true" /> : null}
            <span>
              {submitState === "sending" ? contact.form.sendingLabel : contact.form.submitLabel}
            </span>
          </button>

          <p
            className={errorMessage ? "contact-error" : "contact-hint"}
            aria-live="polite"
          >
            {errorMessage ?? contact.form.helperText}
          </p>
        </div>
      </form>

      {showModal && isMounted
        ? createPortal(
            <div
              className="contact-modal-backdrop"
              role="presentation"
              onClick={closeModal}
            >
              <div
                className="contact-modal"
                role="dialog"
                aria-modal="true"
                aria-labelledby="contact-modal-title"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="contact-modal-icon" aria-hidden="true">
                  <CheckCircle size={30} strokeWidth={2} />
                </div>
                <h3 id="contact-modal-title" className="contact-modal-title">Message sent!</h3>
                <p className="contact-modal-body">{contact.form.successMessage}</p>
                <button type="button" className="contact-modal-btn" onClick={closeModal}>
                  Done
                </button>
              </div>
            </div>,
            document.body
          )
        : null}
    </section>
  );
}
