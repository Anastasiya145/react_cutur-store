import React from "react";
import "./deliveriesDrawer.scss";
import { ContactEmailLink } from "../../components/ContactEmailLink/ContactEmailLink";
import { CustomDrawer } from "../../components/Drawer/CustomDrawer";

export const DeliveriesDrawer: React.FC<{
  open: boolean;
  setIsDrawerOpen: (open: boolean) => void;
}> = ({ open, setIsDrawerOpen }) => {
  return (
    <CustomDrawer
      open={open}
      title="Livraisons et retours"
      onClose={() => setIsDrawerOpen(false)}
      className="deliveries-drawer"
    >
      <div className="deliveries-drawer__content">
        <section className="deliveries-drawer__section">
          <h2 className="deliveries-drawer__subtitle">Livraisons</h2>
          <p className="deliveries-drawer__text">
            Les frais de livraison sont calculés selon les tarifs postaux en
            vigueur et inclus dans le total de la commande. Livraison en France
            et à l'international. Livraison offerte en France métropolitaine et
            Belgique dès 130€ d'achat via Mondial Relay. Expédition par Mondial
            Relay ou Colissimo. Les délais sont donnés à titre indicatif. Le
            risque du transport est à la charge de l'acheteur. En cas de
            problème à la réception, contactez-nous sous 5 jours à{" "}
            <ContactEmailLink />
            Les produits sont expédiés après réception du paiement total. En cas
            d'adresse incorrecte, la réexpédition sera à la charge de
            l'acheteur.
          </p>
        </section>
        <section className="deliveries-drawer__section">
          <h2 className="deliveries-drawer__subtitle">Retours</h2>
          <p className="deliveries-drawer__text">
            Conformément au Code de la consommation, le droit de rétractation ne
            s'applique pas pour les créations personnalisées ou réalisées sur
            demande. Toute commande spéciale est donc ferme et définitive.
          </p>
        </section>
        <section className="deliveries-drawer__section">
          <h2 className="deliveries-drawer__subtitle">Délais de fabrication</h2>
          <p className="deliveries-drawer__text">
            Chaque création du <b>brend</b> est réalisée à la commande pour
            garantir son originalité et sa qualité. Le délai d'expédition dépend
            du volume de commandes et de la complexité. Merci pour votre
            compréhension et votre patience !
          </p>
        </section>
      </div>
    </CustomDrawer>
  );
};
