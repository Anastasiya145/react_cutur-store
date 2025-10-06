import React from "react";
import {
  useNotification,
  Notification,
} from "../../context/NotificationContext";
import "./notificationContainer.scss";

const NotificationItem: React.FC<{ notification: Notification }> = ({
  notification,
}) => {
  const { removeNotification } = useNotification();

  const handleClose = () => {
    removeNotification(notification.id);
  };

  return (
    <div className={`notification notification--${notification.type}`}>
      <div className="notification__content">
        <span className="notification__message">{notification.message}</span>
        <button
          className="notification__close"
          onClick={handleClose}
          aria-label="Fermer"
        >
          ×
        </button>
      </div>
    </div>
  );
};

export const NotificationContainer: React.FC = () => {
  const { notifications } = useNotification();

  if (notifications.length === 0) {
    return null;
  }

  return (
    <div className="notification-container">
      {notifications.map((notification) => (
        <NotificationItem key={notification.id} notification={notification} />
      ))}
    </div>
  );
};
