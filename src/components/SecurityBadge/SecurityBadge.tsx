import React from "react";
import "./securityBadge.scss";

interface SecurityBadgeProps {
  className?: string;
  icon?: string;
  title?: string;
  description?: string;
  variant?: "default" | "compact" | "minimal";
}

export const SecurityBadge: React.FC<SecurityBadgeProps> = ({
  className = "",
  icon = "🔒",
  title = "Paiement sécurisé",
  description = "Vos informations sont protégées",
  variant = "default",
}) => {
  return (
    <div className={`security-badge security-badge--${variant} ${className}`}>
      <div className="security-badge__icon">{icon}</div>
      <div className="security-badge__text">
        <div className="security-badge__title">{title}</div>
        {variant !== "minimal" && (
          <div className="security-badge__description">{description}</div>
        )}
      </div>
    </div>
  );
};
