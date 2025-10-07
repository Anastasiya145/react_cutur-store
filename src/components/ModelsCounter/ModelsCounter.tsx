import React from "react";
import "./modelsCounter.scss";

export type Props = {
  number: number;
};

export const ModelsCounter: React.FC<Props> = ({ number = 0 }) => {
  return (
    <div className="models-counter">
      {number} modèle{number > 1 ? "s" : ""}
    </div>
  );
};
