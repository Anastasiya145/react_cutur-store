import React from "react";
import "./colorfulSectionWithIcon.scss";

interface ColorfulSectionWithIconProps {
  children?: React.ReactNode;
  icon?: React.ReactNode;
  title: string;
  className?: string;
  text?: string;
}

export const ColorfulSectionWithIcon: React.FC<
  ColorfulSectionWithIconProps
> = ({ children, icon, title, text, className = "" }) => (
  <section className={`colorful-section-with-icon ${className}`}>
    <div className="colorful-section-with-icon__header">
      {icon && <span className="colorful-section-with-icon__icon">{icon}</span>}
      <h2 className="colorful-section-with-icon__title">{title}</h2>
    </div>
    {text && <div className={`colorful-section-with-icon__text`}>{text}</div>}
    {children}
  </section>
);
