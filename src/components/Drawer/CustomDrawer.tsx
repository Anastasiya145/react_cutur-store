import React from "react";
import "./customDrawer.scss";
import classNames from "classnames";
import { IconClose } from "../Icons/IconClose";

type CustomDrawerProps = {
  open: boolean;
  children?: React.ReactNode;
  onClose?: () => void;
  className?: string;
};

export const CustomDrawer: React.FC<CustomDrawerProps> = ({
  open,
  children,
  onClose,
  className = "",
}) => {
  return (
    <>
      {/* Overlay */}
      <div
        className={classNames("drawer__overlay", {
          "drawer__overlay--open": open,
        })}
        onClick={onClose}
      />
      {/* Drawer */}
      <div
        className={classNames("drawer", { "drawer--open": open }, className)}
      >
        <div className="drawer__header">
          <button className="drawer__close" onClick={onClose} type="button">
            <IconClose />
          </button>
        </div>
        <div className="drawer__content">{children}</div>
      </div>
    </>
  );
};
