import React from "react";
import "./termsPage.scss";
import { ColorfulSectionWithIcon } from "../../components/ColorfulSectionWithIcon/ColorfulSectionWithIcon";
import { ContactInfoBox } from "../../components/ContactInfoBox/ContactInfoBox";
import { HighlightTextBoxWithIcon } from "../../components/HighlightTextBox/HighlightTextBoxWithIcon";
import { PageLayout } from "../../makets/PageLayout/PageLayout";

const TermsPage: React.FC = () => (
  <div className="terms-page">
    <PageLayout
      icon="📋"
      title="Conditions Générales de Vente"
      description=""
      className="terms-page"
    >
      <div className="terms-page__content">
        <ColorfulSectionWithIcon
          icon="✅"
          title="Acceptation des conditions"
          className="page-section--highlight"
          text="Les présentes conditions générales de vente s'appliquent à toutes les commandes passées sur notre boutique en ligne. En effectuant une commande, vous reconnaissez avoir pris connaissance de ces conditions."
        />

        <ColorfulSectionWithIcon
          icon="🎨"
          title="Nos produits artisanaux"
          className="page-section--crafted"
          text="Tous nos articles (béguins, bavoirs et doudous) sont confectionnés à la main avec amour et attention. Chaque pièce est unique et peut présenter de légères variations de forme, de couleur ou de finition."
        />

        <ColorfulSectionWithIcon
          icon="⏱️"
          title="Délais de fabrication"
          className="page-section--timing"
          text="Nos produits étant fabriqués sur commande, prévoyez un délai de 1 à 2 semaines avant expédition."
        >
          <HighlightTextBoxWithIcon
            type="info"
            icon="ℹ️"
            text="Ce délai peut être prolongé en période de forte demande (fêtes, promotions). Nous vous tiendrons informé par email en cas de retard exceptionnel."
          />
        </ColorfulSectionWithIcon>

        <ColorfulSectionWithIcon
          icon="💳"
          title="Prix et paiement"
          className="page-section--payment"
          text="Tous les prix sont affichés en euros, toutes taxes comprises (TVA française incluse). Le paiement s'effectue intégralement au moment de la commande via notre système de paiement sécurisé. Nous"
        />

        <ColorfulSectionWithIcon
          icon="🚚"
          title="Livraison et frais de port"
          className="page-section--delivery"
          text="La livraison s'effectue à l'adresse que vous indiquez lors de votre commande. Les frais de port sont de 5,99€ pour la France métropolitaine."
        >
          <HighlightTextBoxWithIcon
            type="success"
            icon="🎉"
            text="Bonne nouvelle : la livraison est GRATUITE pour toute commande de 50€ et plus !"
          />
        </ColorfulSectionWithIcon>

        <ColorfulSectionWithIcon
          icon="↩️"
          title="Droit de rétractation"
          className="page-section--return"
          text="Conformément à la législation française, vous disposez d'un délai de 14 jours à compter de la réception de votre commande pour exercer votre droit de rétractation. Les articles doivent être retournés dans leur état d'origine, non utilisés et dans leur emballage d'origine. Les frais de retour sont à votre charge sauf en cas d'erreur de notre part."
        />

        <ColorfulSectionWithIcon
          icon="🛡️"
          title="Garantie et service client"
          className="page-section--warranty"
          text="Nous garantissons la qualité de nos produits artisanaux. En cas de défaut de fabrication constaté dans les 30 jours suivant la réception, nous nous engageons à reprendre l'article ou à vous proposer un échange."
        />

        <ColorfulSectionWithIcon
          icon="🔒"
          title="Protection des données"
          className="page-section--privacy"
          text="Vos données personnelles sont collectées et traitées dans le respect du RGPD. Elles ne sont utilisées que pour le traitement de vos commandes et ne sont jamais transmises à des tiers. Vous disposez d'un droit d'accès, de rectification et de suppression de vos données."
        />

        <ColorfulSectionWithIcon
          icon="⚖️"
          title="Droit applicable"
          className="page-section--legal"
          text="Les présentes conditions générales sont régies par le droit français. En cas de litige, les tribunaux français seront seuls compétents."
        />

        <ContactInfoBox text="Pour toute question concernant ces conditions générales de vente, n'hésitez pas à nous contacter à " />
      </div>
    </PageLayout>
  </div>
);

export default TermsPage;
