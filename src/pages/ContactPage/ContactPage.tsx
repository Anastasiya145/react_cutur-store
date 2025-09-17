import React from "react";
import { useForm } from "react-hook-form";
import "./contactPage.scss";
import { ContactEmailLink } from "../../components/ContactEmailLink/ContactEmailLink";
import { contactUs } from "../../api/contactApi";
import { TextInput } from "../../components/forms/TextInput/TextInput";
import { LoadingButton } from "../../components/LoadingButton";
import { EmailInput } from "../../components/forms/EmailInput/EmailInput";

type ContactFormInputs = {
  name: string;
  email: string;
  message: string;
};

const ContactPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful, isValid },
    setError,
  } = useForm<ContactFormInputs>({ mode: "onChange" });

  const onSubmit = async (data: ContactFormInputs) => {
    try {
      await contactUs(data);
      reset();
    } catch {
      setError("root", {
        message: "Erreur lors de l'envoi. Veuillez réessayer.",
      });
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

      <form
        className="contact-page__form"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <TextInput
          label="Nom"
          type="text"
          placeholder="Votre nom"
          required
          {...register("name", {
            required: "Le nom est requis",
            minLength: {
              value: 2,
              message: "Le nom doit contenir au moins 2 caractères",
            },
          })}
        />
        {errors.name && (
          <div className="contact-page__error">{errors.name.message}</div>
        )}

        <EmailInput
          {...register("email", {
            required: "L'e-mail est requis",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Veuillez saisir un e-mail valide",
            },
          })}
        />
        {errors.email && (
          <div className="contact-page__error">{errors.email.message}</div>
        )}

        <label className="contact-page__label">
          Message
          <textarea
            className="contact-page__input"
            {...register("message", {
              required: "Le message est requis",
              minLength: {
                value: 10,
                message: "Le message doit contenir au moins 10 caractères",
              },
            })}
            required
            rows={5}
          />
        </label>
        {errors.message && (
          <div className="contact-page__error">{errors.message.message}</div>
        )}

        {isSubmitSuccessful && (
          <div className="contact-page__success">Message envoyé !</div>
        )}
        {errors.root && (
          <div className="contact-page__error">{errors.root.message}</div>
        )}
        <LoadingButton
          type="submit"
          text="Envoyer"
          loading={isSubmitting}
          disabled={isSubmitting || !isValid}
        />
      </form>
    </div>
  );
};

export default ContactPage;
