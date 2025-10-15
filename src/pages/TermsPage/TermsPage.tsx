import React from "react";
import "./termsPage.scss";
import { ContactEmailLink } from "../../components/ContactEmailLink/ContactEmailLink";
import { PageLayout } from "../../makets/PageLayout";
import {
  TermsSection,
  TermsText,
  TermsHighlightBox,
  TermsContact,
} from "./components";

const TermsPage: React.FC = () => (
  <div className="terms-page">
    <PageLayout
      icon="📋"
      title="Conditions Générales de Vente"
      description=""
      className="page-layout--terms"
    >
      <div className="terms-page__content">
        <TermsSection
          icon="✅"
          title="Acceptation des conditions"
          variant="highlight"
        >
          <TermsText>
            Les présentes conditions générales de vente s'appliquent à toutes
            les commandes passées sur notre boutique en ligne. En effectuant une
            commande, vous reconnaissez avoir pris connaissance de ces
            conditions et les acceptez pleinement et sans réserve.
          </TermsText>
        </TermsSection>

        <TermsSection
          icon="🎨"
          title="Nos produits artisanaux"
          variant="crafted"
        >
          <TermsText>
            Tous nos articles (béguins, bavoirs et doudous) sont confectionnés à
            la main avec amour et attention. Chaque pièce est unique et peut
            présenter de légères variations de forme, de couleur ou de finition
            qui témoignent de son caractère artisanal authentique. Ces
            variations ne constituent pas un défaut mais font la beauté de nos
            créations.
          </TermsText>
        </TermsSection>

        <TermsSection icon="⏱️" title="Délais de fabrication" variant="timing">
          <TermsText>
            Nos produits étant fabriqués sur commande, prévoyez un délai de
            <strong>1 à 2 semaines</strong> avant expédition.
          </TermsText>
          <TermsHighlightBox type="info" icon="ℹ️">
            Ce délai peut être prolongé en période de forte demande (fêtes,
            promotions). Nous vous tiendrons informé par email en cas de retard
            exceptionnel.
          </TermsHighlightBox>
        </TermsSection>

        <TermsSection icon="💳" title="Prix et paiement" variant="payment">
          <TermsText>
            Tous les prix sont affichés en euros, toutes taxes comprises (TVA
            française incluse). Le paiement s'effectue intégralement au moment
            de la commande via notre système de paiement sécurisé. Nous
            acceptons les cartes bancaires Visa, MasterCard et American Express.
          </TermsText>
        </TermsSection>

        <TermsSection
          icon="🚚"
          title="Livraison et frais de port"
          variant="delivery"
        >
          <TermsText>
            La livraison s'effectue à l'adresse que vous indiquez lors de votre
            commande. Les frais de port sont de <strong>5,99€</strong> pour la
            France métropolitaine.
          </TermsText>
          <TermsHighlightBox type="success" icon="🎉">
            <strong>
              Bonne nouvelle : la livraison est GRATUITE pour toute commande de
              50€ et plus !
            </strong>
          </TermsHighlightBox>
          <TermsText>
            Les délais de livraison sont de 3 à 5 jours ouvrés après expédition.
          </TermsText>
        </TermsSection>

        <TermsSection icon="↩️" title="Droit de rétractation" variant="return">
          <TermsText>
            Conformément à la législation française, vous disposez d'un délai de
            14 jours à compter de la réception de votre commande pour exercer
            votre droit de rétractation. Les articles doivent être retournés
            dans leur état d'origine, non utilisés et dans leur emballage
            d'origine. Les frais de retour sont à votre charge sauf en cas
            d'erreur de notre part.
          </TermsText>
        </TermsSection>

        <TermsSection
          icon="🛡️"
          title="Garantie et service client"
          variant="warranty"
        >
          <TermsText>
            Nous garantissons la qualité de nos produits artisanaux. En cas de
            défaut de fabrication constaté dans les 30 jours suivant la
            réception, nous nous engageons à reprendre l'article ou à vous
            proposer un échange. Notre équipe est à votre disposition pour toute
            question ou réclamation.
          </TermsText>
        </TermsSection>

        <TermsSection
          icon="🔒"
          title="Protection des données"
          variant="privacy"
        >
          <TermsText>
            Vos données personnelles sont collectées et traitées dans le respect
            du RGPD. Elles ne sont utilisées que pour le traitement de vos
            commandes et ne sont jamais transmises à des tiers. Vous disposez
            d'un droit d'accès, de rectification et de suppression de vos
            données.
          </TermsText>
        </TermsSection>

        <TermsSection icon="⚖️" title="Droit applicable" variant="legal">
          <TermsText>
            Les présentes conditions générales sont régies par le droit
            français. En cas de litige, les tribunaux français seront seuls
            compétents.
          </TermsText>
        </TermsSection>

        <TermsContact>
          <TermsText>
            Pour toute question concernant ces conditions générales de vente,
            n'hésitez pas à nous contacter à <ContactEmailLink />.
          </TermsText>
        </TermsContact>
      </div>
    </PageLayout>
  </div>
);

export default TermsPage;
