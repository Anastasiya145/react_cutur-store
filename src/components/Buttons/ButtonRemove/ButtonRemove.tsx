import { FC } from "react";
import { IconClose } from "../../Icons/IconClose";
import "./buttonRemove.scss";

type ButtonRemoveProps = {
  onClick: () => void;
};

export const ButtonRemove: FC<ButtonRemoveProps> = ({ onClick }) => {
  return (
    <button type="button" className="button-remove" onClick={onClick}>
      <IconClose style={{ width: 16, height: 16 }} />
    </button>
  );
};
