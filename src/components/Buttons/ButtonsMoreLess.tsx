import React from "react";
import classNames from "classnames";
import "./buttonMoreLess.scss";

type Props = {
  count: number;
  maxReached: boolean;
  warningText: string | null;
  handleDecrease: () => void;
  handleIncrease: () => void;
};

export const ButtonsMoreLess: React.FC<Props> = ({
  count,
  maxReached,
  warningText,
  handleDecrease,
  handleIncrease,
}) => (
  <div className="buttons-group">
    <div className="buttons-group__item">
      <button
        type="button"
        className={classNames("button-more-less", "button-more-less--prev", {
          disabled: count === 1,
        })}
        onClick={handleDecrease}
        disabled={count === 1}
      />
      <div className="button-more-less__count">{count}</div>
      <button
        type="button"
        className={classNames("button-more-less", "button-more-less--next", {
          disabled: maxReached,
        })}
        onClick={handleIncrease}
        disabled={maxReached}
      />
    </div>
    {warningText && <p className="buttons-group__text">{warningText}</p>}
  </div>
);
