import React from "react";
import "./privacyPage.scss";
import { ContactEmailLink } from "../../components/ContactEmailLink/ContactEmailLink";

const PrivacyPage: React.FC = () => (
  <div className="privacy-page">
    <h2 className="privacy-page__title">Politique de confidentialité</h2>
    <p className="privacy-page__text">
      Nous respectons votre vie privée. Les données collectées sont utilisées uniquement pour le
      traitement de votre commande et la gestion de la relation client. Elles ne sont jamais
      transmises à des tiers sans votre consentement. Vous disposez d'un droit d'accès, de
      modification et de suppression de vos données personnelles. Pour toute demande, contactez-nous
      à <ContactEmailLink />.
    </p>
  </div>
);

export default PrivacyPage;
