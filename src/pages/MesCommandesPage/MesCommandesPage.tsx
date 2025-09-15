import React, { useEffect, useState } from "react";
import "./mesCommandesPage.scss";
import { getOrdersByUserEmail } from "../../api/fetchData";
import { Order } from "../../types/Order";
import { useAuth } from "../../context/AuthContext";

const MesCommandesPage: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;
    getOrdersByUserEmail(user)
      .then((data) => setOrders(data))
      .catch(() => setError("Erreur lors du chargement des commandes."))
      .finally(() => setLoading(false));
  }, [user]);

  return (
    <div className="mes-commandes-page">
      <h1 className="mes-commandes-page__title">Mes commandes</h1>
      {loading && <div>Chargement...</div>}
      {error && <div style={{ color: "red" }}>{error}</div>}
      {!loading && !error && orders.length === 0 && (
        <div>Aucune commande trouvée.</div>
      )}
      {!loading &&
        !error &&
        orders.map((order) => (
          <div className="mes-commandes-page__order-card" key={order.id}>
            <div className="mes-commandes-page__order-header">
              <span className="mes-commandes-page__order-id">
                Commande n°{order.id}
              </span>
              <span className="mes-commandes-page__order-date">
                {order.date}
              </span>
              <span className="mes-commandes-page__order-status">
                {order.status}
              </span>
            </div>
            <div className="mes-commandes-page__order-items">
              {order.items.map((item, idx) => (
                <div className="mes-commandes-page__item" key={idx}>
                  <img
                    src={item.image}
                    alt={item.name}
                    className="mes-commandes-page__item-img"
                  />
                  <div className="mes-commandes-page__item-info">
                    <div className="mes-commandes-page__item-name">
                      {item.name}
                    </div>
                    <div className="mes-commandes-page__item-qty">
                      Quantité: {item.quantity}
                    </div>
                    <div className="mes-commandes-page__item-price">
                      Prix: {item.price} €
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {order.total && (
              <div className="mes-commandes-page__order-total">
                Total: <b>{order.total} €</b>
              </div>
            )}
          </div>
        ))}
    </div>
  );
};

export default MesCommandesPage;
