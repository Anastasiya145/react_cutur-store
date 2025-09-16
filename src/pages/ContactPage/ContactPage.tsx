import React, { useState } from "react";
import "./contactPage.scss";
import { ContactEmailLink } from "../../components/ContactEmailLink/ContactEmailLink";
import { contactUs } from "../../api/contactApi";
import { TextInput } from "../../components/Form/TextInput";
import { LoadingButton } from "../../components/LoadingButton";

const ContactPage: React.FC = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSent(false);

    try {
      setLoading(true);
      await contactUs({
        name: form.name,
        email: form.email,
        message: form.message,
      });
      setSent(true);
      setForm({ name: "", email: "", message: "" });
    } catch {
      setError("Erreur lors de l'envoi. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-page">
      <div className="contact-page__container">
        <h1 className="contact-page__title">Contactez-nous</h1>
        <p className="contact-page__desc">
          Contactez-nous via ce formulaire ou à <ContactEmailLink />
        </p>
        <p className="contact-page__desc">
          <b>Important :</b> Nos articles sont fabriqués à la main exclusivement
          pour vous. Le délai de fabrication est de 3 à 6 semaines à partir de
          la date de commande.
          <br />
          Malheureusement, nous ne pouvons pas être plus précis sur ce délai.
          <br />
          Merci de votre compréhension.
        </p>
      </div>

      <form className="contact-page__form" onSubmit={handleSubmit}>
        <TextInput
          label="Nom"
          type="text"
          name="name"
          placeholder="Votre nom"
          value={form.name}
          onChange={handleChange}
          required
        />
        <TextInput
          label="Email"
          type="email"
          name="email"
          placeholder="Votre e-mail"
          value={form.email}
          onChange={handleChange}
          required
        />
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
        {sent && <div className="contact-page__success">Message envoyé !</div>}
        {error && <div className="contact-page__error">{error}</div>}
        <LoadingButton
          text="Envoyer"
          loading={loading}
          onClick={handleSubmit}
          disabled={loading}
        />
      </form>
    </div>
  );
};

export default ContactPage;
