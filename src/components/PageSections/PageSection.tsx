import React from "react";
import "./pageSection.scss";

interface PageSectionProps {
  children?: React.ReactNode;
  icon?: React.ReactNode;
  title: string;
  className?: string;
  text?: string;
}

export const PageSection: React.FC<PageSectionProps> = ({
  children,
  icon,
  title,
  text,
  className = "",
}) => (
  <section className={`page-section ${className}`}>
    {icon && <span className="page-section__icon">{icon}</span>}
    <h2 className="page-section__title">{title}</h2>
    {text && <div className={`page-section__text`}>{text}</div>}
    {children}
  </section>
);
