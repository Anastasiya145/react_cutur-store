import React, { useState, useRef, useEffect } from "react";
import { ORDER_STATUS_LABELS, OrderStatus } from "../../types/Order";
import { Badge, BadgeType } from "../../components/Badges/Badge";
import { IconArrowDown } from "../../components/Icons/IconArrowDown";
import classNames from "classnames";
import "./orderStatusSelect.scss";

type OrderStatusSelectProps = {
  currentStatus: OrderStatus;
  onChange: (newStatus: string) => void;
  loading?: boolean;
};

const getStatusBadgeType = (status: OrderStatus): BadgeType => {
  switch (status) {
    case OrderStatus.Created:
      return "created";
    case OrderStatus.Pending:
      return "pending";
    case OrderStatus.Shipped:
      return "shipped";
    case OrderStatus.Delivered:
      return "delivered";
    case OrderStatus.Cancelled:
      return "cancelled";
    default:
      return "created";
  }
};

export const OrderStatusSelect: React.FC<OrderStatusSelectProps> = ({
  currentStatus,
  onChange,
  loading = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  const statusOptions = [
    {
      value: OrderStatus.Created,
      label: ORDER_STATUS_LABELS[OrderStatus.Created],
      canBeChosen: true,
    },
    {
      value: OrderStatus.Pending,
      label: ORDER_STATUS_LABELS[OrderStatus.Pending],
      canBeChosen: true,
    },
    {
      value: OrderStatus.Shipped,
      label: ORDER_STATUS_LABELS[OrderStatus.Shipped],
      canBeChosen: false,
    },
    {
      value: OrderStatus.Delivered,
      label: ORDER_STATUS_LABELS[OrderStatus.Delivered],
      canBeChosen: false,
    },
    {
      value: OrderStatus.Cancelled,
      label: ORDER_STATUS_LABELS[OrderStatus.Cancelled],
      canBeChosen: true,
    },
  ];

  const handleOptionSelect = (newStatus: OrderStatus) => {
    const option = statusOptions.find((opt) => opt.value === newStatus);
    if (option?.canBeChosen && !loading) {
      onChange(newStatus);
      setIsOpen(false);
    }
  };

  const toggleDropdown = () => {
    if (!loading) {
      setIsOpen(!isOpen);
    }
  };

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="order-status-select" ref={selectRef}>
      <div className="order-status-select__dropdown">
        <button
          type="button"
          disabled={loading}
          className={classNames("order-status-select__button", {
            "order-status-select__button--open": isOpen && !loading,
            "order-status-select__button--loading": loading,
          })}
          onClick={toggleDropdown}
        >
          <Badge
            type={getStatusBadgeType(currentStatus)}
            text={ORDER_STATUS_LABELS[currentStatus]}
          />
          <IconArrowDown
            className={classNames("order-status-select__arrow", {
              "order-status-select__arrow--open": isOpen,
            })}
          />
        </button>

        {isOpen && !loading && (
          <ul className="order-status-select__list" role="listbox">
            {statusOptions.map((option) => (
              <li
                key={option.value}
                className={classNames("order-status-select__option", {
                  "order-status-select__option--active":
                    option.value === currentStatus,
                  "order-status-select__option--disabled": !option.canBeChosen,
                })}
                onClick={() => handleOptionSelect(option.value)}
                role="option"
                aria-selected={option.value === currentStatus}
              >
                <Badge
                  type={getStatusBadgeType(option.value)}
                  text={option.label}
                />
              </li>
            ))}
          </ul>
        )}
      </div>

      {loading && (
        <span className="order-status-select__loading">Mise à jour...</span>
      )}
    </div>
  );
};
