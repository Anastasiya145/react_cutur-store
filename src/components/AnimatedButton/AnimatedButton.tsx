import React from 'react';
import './AnimatedButton.scss';

interface AnimatedButtonProps {
  title: string;
  description: string;
  onClick?: () => void;
  className?: string;
}

const AnimatedButton: React.FC<AnimatedButtonProps> = ({
  title,
  description,
  onClick,
  className = ''
}) => {
  return (
    <div className={`animated-button ${className}`} onClick={onClick}>
      <div className="animated-button__content">
        <span className="animated-button__title">{title}</span>
        <div className="animated-button__description">
          <span className="animated-button__description-text">{description}</span>
        </div>
      </div>
    </div>
  );
};

export default AnimatedButton;