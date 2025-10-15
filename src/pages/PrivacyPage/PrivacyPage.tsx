import React from "react";
import { PageSection, PageContact } from "../../components/PageSections";
import { PageLayout } from "../../makets/PageLayout";

const PrivacyPage: React.FC = () => (
  <PageLayout
    icon="🔒"
    title="Politique de confidentialité"
    description=""
    className="page-layout--privacy"
  >
    <div className="privacy-page__content">
      <PageSection
        icon="🔒"
        title="Respect de la vie privée"
        className="page-section--privacy"
        text="Nous respectons votre vie privée. Les données collectées sont utilisées uniquement pour le traitement de votre commande et la gestion de la relation client."
      />
      <PageSection
        icon="📦"
        title="Utilisation des données"
        className="page-section--highlight"
        text="Vos informations ne sont jamais transmises à des tiers sans votre consentement. Elles servent uniquement à assurer le bon déroulement de vos achats et à améliorer nos services."
      />

      <PageContact text="Pour toute question concernant la confidentialité ou vos données personnelles, n'hésitez pas à nous écrire à " />
    </div>
  </PageLayout>
);

export default PrivacyPage;
