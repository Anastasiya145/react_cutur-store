import React, { useState } from "react";
import "./contactPage.scss";

const ContactPage: React.FC = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSent(false);
    // Имитация отправки (реально отправить с фронта на email нельзя без сервера)
    try {
      // Здесь можно интегрировать email API (например, EmailJS, Formspree, или свой backend)
      await fetch("https://formspree.io/f/xwkgyyqv", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: form.message,
          _replyto: form.email,
        }),
      });
      setSent(true);
      setForm({ name: "", email: "", message: "" });
    } catch {
      setError("Erreur lors de l'envoi. Veuillez réessayer.");
    }
  };

  return (
    <div className="contact-page">
      <div className="contact-page__container">
        <h1 className="contact-page__title">Contactez-nous</h1>
        <p className="contact-page__desc">
          Contactez-nous via ce formulaire ou à{" "}
          <a href="mailto:contact@my-brand.fr" className="contact-page__link">
            contact@my-brand.fr
          </a>
        </p>
        <p className="contact-page__desc">
          <b>Important :</b> Nos articles sont fabriqués à la main exclusivement pour vous. Le délai
          de fabrication est de 3 à 6 semaines à partir de la date de commande.
          <br />
          Malheureusement, nous ne pouvons pas être plus précis sur ce délai.
          <br />
          Merci de votre compréhension.
        </p>
      </div>

      <form className="contact-page__form" onSubmit={handleSubmit}>
        <label className="contact-page__label">
          Nom
          <input
            className="contact-page__input"
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </label>
        <label className="contact-page__label">
          Email
          <input
            className="contact-page__input"
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </label>
        <label className="contact-page__label">
          Message
          <textarea
            className="contact-page__input"
            name="message"
            value={form.message}
            onChange={handleChange}
            required
            rows={5}
          />
        </label>
        <button className="contact-page__button" type="submit">
          Envoyer
        </button>
        {sent && <div className="contact-page__success">Message envoyé !</div>}
        {error && <div className="contact-page__error">{error}</div>}
      </form>
    </div>
  );
};

export default ContactPage;
