import React from "react";
import { LoadingButton } from "../../components/LoadingButton";
import "./pageLayout.scss";

interface PageLayoutProps {
  icon?: string;
  title: string;
  description: string;
  buttonText?: string;
  onButtonClick?: () => void;
  loading?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export const PageLayout: React.FC<PageLayoutProps> = ({
  icon,
  title,
  description,
  buttonText,
  onButtonClick,
  loading = false,
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
          <LoadingButton
            text={buttonText}
            loading={loading}
            className="page-layout__button"
            onClick={onButtonClick}
          />
        )}
      </div>
    </div>
  );
};
