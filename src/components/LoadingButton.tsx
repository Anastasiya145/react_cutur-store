import React from "react";
import { Loader } from "./Loader/Loader";
import "./loadingButton.scss";

type LoadingButtonProps = {
  loading: boolean;
  text: string;
  className?: string;
  disabled?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  type?: "button" | "submit" | "reset";
};

export const LoadingButton: React.FC<LoadingButtonProps> = ({
  loading,
  text,
  className = "",
  disabled = false,
  onClick,
  type = "button",
}) => (
  <button
    type={type}
    className={`button-loading ${className}`}
    disabled={disabled || loading}
    onClick={(e) => {
      e.preventDefault();
      onClick && onClick(e);
    }}
  >
    {loading ? <Loader variant="small" /> : text}
  </button>
);
