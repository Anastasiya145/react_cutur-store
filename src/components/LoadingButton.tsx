import React from "react";
import { Loader } from "./Loader/Loader";
import "./loadingButton.scss";
import classNames from "classnames";

type LoadingButtonProps = {
  loading: boolean;
  text: string;
  className?: string;
  disabled?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  type?: "button" | "submit" | "reset";
  [key: string]: any;
};

export const LoadingButton: React.FC<LoadingButtonProps> = ({
  loading,
  text,
  className = "",
  disabled = false,
  onClick,
  type = "button",
  ...rest
}) => (
  <button
    type={type}
    className={classNames("button-loading", className, { disabled })}
    disabled={disabled || loading}
    onClick={onClick}
    {...rest}
  >
    {loading ? <Loader variant="small" /> : text}
  </button>
);
