import React from "react";
import "./termsContact.scss";

interface TermsContactProps {
  children: React.ReactNode;
  className?: string;
}

export const TermsContact: React.FC<TermsContactProps> = ({
  children,
  className = "",
}) => {
  return (
    <div className={`terms-contact ${className}`}>
      <div className="terms-contact__content">{children}</div>
    </div>
  );
};
