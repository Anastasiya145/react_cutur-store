import React from "react";
import "./pageContact.scss";
import { ContactEmailLink } from "../ContactEmailLink/ContactEmailLink";

interface PageContactProps {
  text: string;
  className?: string;
}

export const PageContact: React.FC<PageContactProps> = ({
  text,
  className = "",
}) => {
  return (
    <div className={`page-contact ${className}`}>
      <div className="page-contact__text">
        {text}
        <ContactEmailLink />
      </div>
    </div>
  );
};
