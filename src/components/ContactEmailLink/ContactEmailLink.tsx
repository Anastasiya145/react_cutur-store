import React from "react";
import "./contactEmailLink.scss";

export const ContactEmailLink: React.FC = () => {
  const email = "contact@my-brand.fr";
  return (
    <a href={`mailto:${email}`} className="email-link" rel="noreferrer" target="_blank">
      {email}
    </a>
  );
};
