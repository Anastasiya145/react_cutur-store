import React from "react";
import "./termsSection.scss";

interface TermsSectionProps {
  icon: string;
  title: string;
  children: React.ReactNode;
  variant?:
    | "highlight"
    | "crafted"
    | "timing"
    | "payment"
    | "delivery"
    | "return"
    | "warranty"
    | "privacy"
    | "legal";
  className?: string;
}

export const TermsSection: React.FC<TermsSectionProps> = ({
  icon,
  title,
  children,
  variant,
  className = "",
}) => {
  const sectionClass = variant ? `terms-section--${variant}` : "";

  return (
    <div className={`terms-section ${sectionClass} ${className}`}>
      <div className="terms-section__icon">{icon}</div>
      <h3 className="terms-section__title">{title}</h3>
      <div className="terms-section__content">{children}</div>
    </div>
  );
};
