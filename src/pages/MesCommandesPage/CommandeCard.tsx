import { FC, useState } from "react";
import { useFormatDate } from "../../helpers/hooks/useFormatDate";
import { Order, OrderItem, OrderStatus } from "../../types/Order";
import { CancelOrderButton } from "./CancelOrderButton";
import "./commandeCard.scss";
import { deleteOrder } from "../../api/ordersApi";
import { LoadingButton } from "../../components/LoadingButton";

type CommandeCardProps = {
  order: Order;
};

export const CommandeCard: FC<CommandeCardProps> = ({ order }) => {
  const formatDate = useFormatDate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCancel = async () => {
    setLoading(true);
    setError(null);
    try {
      await deleteOrder({
        id_commande: order.id,
        user_email: order.user_email,
      });
      //   setCancelled(true);
    } catch (err: any) {
      setError(err.message || "Erreur lors de l'annulation.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="commande-card">
      <div className="commande-card__header">
        <div>
          <span className="commande-card__id">Commande n°{order.id}</span>
          <span className="commande-card__date">
            {formatDate(order.created_at)}
          </span>
        </div>
        <span
          className={`commande-card__status commande-card__status--${order.status}`}
        >
          {order.status}
        </span>
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
        <LoadingButton text="Annuler la commande" loading={true} />
        <CancelOrderButton
          handleCancel={handleCancel}
          disabled={order.status !== OrderStatus.Created}
          loading={loading}
          error={error}
        />
      </div>
    </div>
  );
};
