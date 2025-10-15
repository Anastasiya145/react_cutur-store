import React from "react";
import { ColorfulSectionWithIcon } from "../../components/ColorfulSectionWithIcon/ColorfulSectionWithIcon";
import { ContactInfoBox } from "../../components/ContactInfoBox/ContactInfoBox";
import { PageLayout } from "../../makets/PageLayout/PageLayout";
import "./privacyPage.scss";

const PrivacyPage: React.FC = () => (
  <PageLayout
    icon="🔒"
    title="Politique de confidentialité"
    description=""
    className="privacy-page"
  >
    <div className="privacy-page__content">
      <ColorfulSectionWithIcon
        icon="🔒"
        title="Respect de la vie privée"
        className="page-section--privacy"
        text="Nous respectons votre vie privée. Les données collectées sont utilisées uniquement pour le traitement de votre commande et la gestion de la relation client."
      />
      <ColorfulSectionWithIcon
        icon="📦"
        title="Utilisation des données"
        className="page-section--highlight"
        text="Vos informations ne sont jamais transmises à des tiers sans votre consentement. Elles servent uniquement à assurer le bon déroulement de vos achats et à améliorer nos services."
      />

      <ContactInfoBox text="Pour toute question concernant la confidentialité ou vos données personnelles, n'hésitez pas à nous écrire à " />
    </div>
  </PageLayout>
);

export default PrivacyPage;
