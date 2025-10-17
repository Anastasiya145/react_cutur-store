import { FC, useState } from "react";
import { useFormatDate } from "../../helpers/hooks/useFormatDate";
import { Order, OrderItem, OrderStatus } from "../../types/Order";
import "./commandeCard.scss";
import { deleteOrder, updateOrderStatus } from "../../api/ordersApi";
import { LoadingButton } from "../../components/LoadingButton";
import { useAuth } from "../../context/AuthContext";
import { useNotification } from "../../context/NotificationContext";
import { OrderStatusSelect } from "./OrderStatusSelect";
import { OrderStatusBadge } from "../../components/OrderStatusBadge/OrderStatusBadge";

type CommandeCardProps = {
  order: Order;
  loadOrders: () => void;
  orderNumber: number;
};

export const CommandeCard: FC<CommandeCardProps> = ({
  order,
  loadOrders,
  orderNumber,
}) => {
  const formatDate = useFormatDate();
  const { isAdmin } = useAuth();
  const { showError } = useNotification();

  const [loading, setLoading] = useState(false);
  const [statusLoading, setStatusLoading] = useState(false);

  const handleOrderCancel = async () => {
    setLoading(true);
    try {
      await deleteOrder({
        id_commande: order.id,
        user_email: order.user_email,
      });
      loadOrders();
    } catch (err: any) {
      showError(err.message || "Erreur lors de l'annulation.");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (newStatus: string) => {
    setStatusLoading(true);
    try {
      await updateOrderStatus(order.id, newStatus as OrderStatus);
      loadOrders();
    } catch (err: any) {
      showError(err.message);
    } finally {
      setStatusLoading(false);
    }
  };

  return (
    <div className="commande-card">
      <div className="commande-card__header">
        <div className="commande-card__header-info">
          <span className="commande-card__id">Commande n°{orderNumber}</span>
          <span className="commande-card__date">
            {formatDate(order.created_at)}
          </span>
        </div>
        {isAdmin ? (
          <OrderStatusSelect
            currentStatus={order.status}
            onChange={handleStatusChange}
            loading={statusLoading}
          />
        ) : (
          <OrderStatusBadge
            status={order.status}
            className="commande-card__status"
          />
        )}
      </div>
      <div className="commande-card__items">
        {order.items.map((item: OrderItem) => (
          <div className="commande-card__item" key={item.id}>
            {item.image && (
              <img
                src={`img/products/${item.image}.jpg`}
                alt={item.name}
                className="commande-card__item-img"
              />
            )}
            <div className="commande-card__item-info">
              <div className="commande-card__item-name">{item.name}</div>
              <div className="commande-card__item-qty">
                Quantité: {item.quantity}
              </div>
              <div className="commande-card__item-price">
                prix: {item.price} €
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="commande-card__footer">
        <div className="commande-card__total">
          Total: <b>{order.total} €</b>
        </div>
        {order.status === OrderStatus.Created && (
          <LoadingButton
            text="Annuler la commande"
            loading={loading}
            onClick={handleOrderCancel}
            disabled={loading}
            className="commande-card__cancel-btn"
          />
        )}
      </div>
    </div>
  );
};
