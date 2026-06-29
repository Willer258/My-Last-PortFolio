import AnimateCursorTarget from "@/components/Shared/AnimateCursorTarget";
import React, { useState } from "react";
import { useTranslation } from "next-i18next";

type Status = "idle" | "sending" | "success" | "error";

const CONTACT_EMAIL = "wilfriedhouinlindjonon91@gmail.com";

const ContactForm = () => {
  const { t, i18n } = useTranslation("common");
  const isFr = (i18n.language ?? "fr").startsWith("fr");

  // NEXT_PUBLIC_* vars are inlined at build time and safe to read on the client.
  const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY?.trim() ?? "";
  const isConfigured = accessKey.length > 0;

  const [status, setStatus] = useState<Status>("idle");

  // Project type options are kept in-component (no matching i18n keys exist yet)
  // so they follow the active locale without altering the translation files.
  const projectTypeOptions = isFr
    ? [
        { value: "Site web", label: "Site web" },
        { value: "Application mobile", label: "Application mobile" },
        { value: "Plateforme", label: "Plateforme" },
        { value: "Autre", label: "Autre" },
      ]
    : [
        { value: "Website", label: "Website" },
        { value: "Mobile app", label: "Mobile app" },
        { value: "Platform", label: "Platform" },
        { value: "Other", label: "Other" },
      ];

  const selectPlaceholder = isFr ? "— Choisir —" : "— Select —";

  // ----- Fallback (no access key configured) -----
  const mailtoSubject = isFr
    ? "Nouveau projet — depuis le portfolio"
    : "New project — from the portfolio";
  const mailtoHref = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(mailtoSubject)}`;
  const fallbackCta = isFr ? "Écrire un email" : "Send an email";
  const fallbackNote = isFr
    ? "Le formulaire sera actif une fois la clé Web3Forms configurée. En attendant, écrivez-moi directement par email."
    : "The form will be active once the Web3Forms key is configured. In the meantime, email me directly.";

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    setStatus("sending");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: accessKey,
          subject: mailtoSubject,
          from_name: formData.get("name"),
          name: formData.get("name"),
          email: formData.get("email"),
          project_type: formData.get("project_type"),
          message: formData.get("message"),
          botcheck: formData.get("botcheck"),
        }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const labelClass =
    "block font-heading text-[10px] tracking-[0.2em] uppercase text-white/50 mb-2";
  const fieldClass =
    "w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 font-body text-sm text-white placeholder-white/30 transition-colors duration-200 hover:border-white/20 focus:border-white/40 focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2";

  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 space-y-5 border border-white/5 w-full">
      <div className="mb-4">
        <h3 className="font-heading text-lg font-bold">{t("form.heading")}</h3>
      </div>

      {isConfigured ? (
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Honeypot — hidden from users, catches bots */}
          <input
            type="checkbox"
            name="botcheck"
            className="hidden"
            style={{ display: "none" }}
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
          />

          <div>
            <label htmlFor="contact-name" className={labelClass}>
              {t("form.name")} <span aria-hidden="true">*</span>
            </label>
            <input
              id="contact-name"
              name="name"
              type="text"
              required
              aria-required="true"
              autoComplete="name"
              className={fieldClass}
            />
          </div>

          <div>
            <label htmlFor="contact-email" className={labelClass}>
              {t("form.email")} <span aria-hidden="true">*</span>
            </label>
            <input
              id="contact-email"
              name="email"
              type="email"
              required
              aria-required="true"
              autoComplete="email"
              className={fieldClass}
            />
          </div>

          <div>
            <label htmlFor="contact-project-type" className={labelClass}>
              {t("form.projectType")} <span aria-hidden="true">*</span>
            </label>
            <select
              id="contact-project-type"
              name="project_type"
              required
              aria-required="true"
              defaultValue=""
              className={`${fieldClass} appearance-none cursor-pointer`}
            >
              <option value="" disabled className="text-ink">
                {selectPlaceholder}
              </option>
              {projectTypeOptions.map((option) => (
                <option key={option.value} value={option.value} className="text-ink">
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="contact-message" className={labelClass}>
              {t("form.message")} <span aria-hidden="true">*</span>
            </label>
            <textarea
              id="contact-message"
              name="message"
              required
              aria-required="true"
              rows={4}
              className={`${fieldClass} resize-y`}
            />
          </div>

          <AnimateCursorTarget type="button">
            <button
              type="submit"
              disabled={status === "sending"}
              className="w-full sm:w-auto rounded-lg duration-200 font-heading font-semibold tracking-wide px-6 py-3.5
                active:scale-[0.98] active:translate-y-[1px]
                focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2
                bg-white text-surface-dark border-2 border-transparent
                hover:bg-surface-dark hover:text-white hover:border-white
                disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-surface-dark disabled:hover:border-transparent"
            >
              {status === "sending" ? t("form.sending") : t("form.send")}
            </button>
          </AnimateCursorTarget>

          {/* Status region — announced to assistive tech */}
          <p
            role={status === "error" ? "alert" : "status"}
            aria-live="polite"
            aria-atomic="true"
            className={`font-body text-sm min-h-[1.25rem] ${
              status === "success"
                ? "text-emerald-300"
                : status === "error"
                  ? "text-red-300"
                  : "sr-only"
            }`}
          >
            {status === "success" && t("form.success")}
            {status === "error" && t("form.error")}
          </p>
        </form>
      ) : (
        <div className="space-y-4">
          <p className="font-body text-sm text-white/60">{fallbackNote}</p>
          <AnimateCursorTarget type="button">
            <a
              href={mailtoHref}
              className="inline-block rounded-lg duration-200 font-heading font-semibold tracking-wide px-6 py-3.5
                active:scale-[0.98] active:translate-y-[1px]
                focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2
                bg-white text-surface-dark border-2 border-transparent
                hover:bg-surface-dark hover:text-white hover:border-white"
            >
              {fallbackCta}
            </a>
          </AnimateCursorTarget>
        </div>
      )}
    </div>
  );
};

export default ContactForm;
