import React from "react";
import "./contactInfoBox.scss";
import { ContactEmailLink } from "../ContactEmailLink/ContactEmailLink";

interface ContactInfoBoxProps {
  text: string;
  className?: string;
}

export const ContactInfoBox: React.FC<ContactInfoBoxProps> = ({
  text,
  className = "",
}) => {
  return (
    <div className={`contact-info ${className}`}>
      <div className="contact-info__text">
        {text}
        <ContactEmailLink />
      </div>
    </div>
  );
};
