import React, { useEffect, useState } from "react";
import "./mesCommandesPage.scss";
import { getOrdersForConnectedUser } from "../../api/ordersApi";
import { Order } from "../../types/Order";
import { Loader } from "../../components/Loader/Loader";
import { CommandeCard } from "./CommandeCard";
import { useAuthCheck } from "../../helpers/hooks/useAuthCheck";

const MesCommandesPage: React.FC = () => {
  useAuthCheck(); // Проверяем аутентификацию
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadOrders = async () => {
    setLoading(true);
    try {
      const data = await getOrdersForConnectedUser();
      setOrders(data);
    } catch {
      setError("Erreur lors du chargement des commandes.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  return (
    <div className="mes-commandes-page">
      <h1 className="mes-commandes-page__title">Mes commandes</h1>
      {loading && <Loader />}
      {error && <div className="mes-commandes-page__error">{error}</div>}
      {!loading && !error && orders.length === 0 && (
        <div>Aucune commande trouvée.</div>
      )}
      {!loading && !error && (
        <div className="mes-commandes-page__orders">
          {orders.map((order, inx) => (
            <CommandeCard
              key={order.id}
              order={order}
              loadOrders={loadOrders}
              orderNumber={orders.length - inx}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default MesCommandesPage;
