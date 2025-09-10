import React from "react";
import "./deliveriesPage.scss";

const DeliveriesPage: React.FC = () => (
  <div className="deliveries">
    <h2 className="deliveries__title">Livraisons et retours</h2>
    <section className="deliveries__section">
      <h2 className="deliveries__subtitle">Livraisons</h2>
      <p className="deliveries__text">
        Les frais de livraison sont calculés selon les tarifs postaux en vigueur
        et inclus dans le total de la commande. Livraison en France et à
        l'international. Livraison offerte en France métropolitaine et Belgique
        dès 130€ d'achat via Mondial Relay. Expédition par Mondial Relay ou
        Colissimo. Les délais sont donnés à titre indicatif. Le risque du
        transport est à la charge de l'acheteur. En cas de problème à la
        réception, contactez-nous sous 5 jours à contact@my-brand.fr. Les
        produits sont expédiés après réception du paiement total. En cas
        d'adresse incorrecte, la réexpédition sera à la charge de l'acheteur.
      </p>
    </section>
    <section className="deliveries__section">
      <h2 className="deliveries__subtitle">Retours</h2>
      <p className="deliveries__text">
        Conformément au Code de la consommation, le droit de rétractation ne
        s'applique pas pour les créations personnalisées ou réalisées sur
        demande. Toute commande spéciale est donc ferme et définitive.
      </p>
    </section>
    <section className="deliveries__section">
      <h2 className="deliveries__subtitle">Délais de fabrication</h2>
      <p className="deliveries__text">
        Chaque création du <b>brend</b> est réalisée à la commande pour garantir
        son originalité et sa qualité. Le délai d'expédition dépend du volume de
        commandes et de la complexité. Merci pour votre compréhension et votre
        patience !
      </p>
    </section>
  </div>
);

export default DeliveriesPage;
