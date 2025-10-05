import React from "react";
import "./animatedTextButton.scss";

interface AnimatedTextButtonProps {
  text: string;
  onClick?: () => void;
  className?: string;
  href?: string;
}

const AnimatedTextButton: React.FC<AnimatedTextButtonProps> = ({
  text,
  onClick,
  className = "",
  href,
}) => {
  const classes = `animated-text-button ${className}`.trim();

  if (href) {
    return (
      <a href={href} className={classes} onClick={onClick}>
        {text}
      </a>
    );
  }

  return (
    <span className={classes} onClick={onClick}>
      {text}
    </span>
  );
};

export default AnimatedTextButton;
