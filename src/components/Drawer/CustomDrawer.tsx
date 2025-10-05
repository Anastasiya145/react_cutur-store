import React from "react";
import "./customDrawer.scss";
import classNames from "classnames";
import { IconClose } from "../Icon/IconClose";

type CustomDrawerProps = {
  open: boolean;
  title?: string;
  children?: React.ReactNode;
  onClose?: () => void;
  className?: string;
};

export const CustomDrawer: React.FC<CustomDrawerProps> = ({
  open,
  title,
  children,
  onClose,
  className = "",
}) => {
  return (
    <>
      {/* Overlay */}
      <div
        className={classNames("custom-drawer__overlay", {
          "custom-drawer__overlay--open": open,
        })}
        onClick={onClose}
      />
      {/* Drawer */}
      <div
        className={classNames(
          "custom-drawer",
          { "custom-drawer--open": open },
          className
        )}
      >
        <button
          className="custom-drawer__close"
          onClick={onClose}
          aria-label="Fermer"
          type="button"
        >
          <IconClose />
        </button>
        <div className="custom-drawer__content">
          {title && <h2 className="custom-drawer__title">{title}</h2>}
          {children}
        </div>
      </div>
    </>
  );
};
