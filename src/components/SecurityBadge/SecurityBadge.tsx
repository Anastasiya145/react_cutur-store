import React from "react";
import "./securityBadge.scss";

export type BadgeType = "achat" | "paiement";

interface SecurityBadgeProps {
  className?: string;
  icon?: string;
  title?: string;
  description?: string;
  variant?: "default" | "compact" | "minimal";
  type?: BadgeType;
}

export const SecurityBadge: React.FC<SecurityBadgeProps> = ({
  type = "achat",
  className = "",
  icon,
  title,
  description,
  variant = "default",
}) => {
  const typeSettings = type
    ? {
        achat: {
          icon: "🔒",
          title: "Achat sécurisé",
          description: "Vos informations sont protégées",
        },
        paiement: {
          icon: "💳",
          title: "Paiement sécurisé",
          description: "Transactions sécurisées et protégées",
        },
      }[type]
    : {
        icon: icon,
        title: title,
        description: description,
      };

  return (
    <div className={`security-badge security-badge--${variant} ${className}`}>
      <div className="security-badge__icon">{typeSettings.icon}</div>
      <div className="security-badge__text">
        <div className="security-badge__title">{typeSettings.title}</div>
        {variant !== "minimal" && (
          <div className="security-badge__description">
            {typeSettings.description}
          </div>
        )}
      </div>
    </div>
  );
};
