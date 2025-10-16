import React from "react";
import "./pageLayout.scss";

interface PageLayoutProps {
  icon?: string;
  title: string;
  description: string;
  buttonText?: string;
  onButtonClick?: () => void;
  className?: string;
  children?: React.ReactNode;
}

export const PageLayout: React.FC<PageLayoutProps> = ({
  icon,
  title,
  description,
  buttonText,
  onButtonClick,
  className = "",
  children,
}) => {
  return (
    <div className={`page-layout ${className}`}>
      <div className="page-layout__content">
        {icon && <div className="page-layout__icon">{icon}</div>}
        <h1 className="page-layout__title">{title}</h1>
        <div className="page-layout__description">{description}</div>
        {children}
        {buttonText && onButtonClick && (
          <button className="page-layout__button" onClick={onButtonClick}>
            {buttonText}
          </button>
        )}
      </div>
    </div>
  );
};
