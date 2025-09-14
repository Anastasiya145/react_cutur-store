import React from "react";
import "./termsPage.scss";
import { ContactEmailLink } from "../../components/ContactEmailLink/ContactEmailLink";

const TermsPage: React.FC = () => (
  <div className="terms-page">
    <section className="terms-page__section">
      <h1 className="terms-page__title">Conditions Générales de Vente</h1>

      <p className="terms-page__text">
        Les présentes conditions générales régissent les ventes réalisées sur ce site. Toute
        commande implique l'acceptation pleine et entière de ces conditions. Les produits sont
        fabriqués à la main et peuvent présenter de légères variations. Les prix sont indiqués en
        euros, toutes taxes comprises. Le paiement est exigible à la commande. La livraison
        s'effectue à l'adresse indiquée par le client. En cas de litige, le droit français
        s'applique. Pour toute question, contactez-nous à <ContactEmailLink />.
      </p>
    </section>
  </div>
);

export default TermsPage;
