export interface BannerMessage {
  type: "delivery" | "production" | "promotion" | "info";
  text: string;
  icon?: string;
  color?: string;
}

export const bannerMessages: BannerMessage[] = [
  {
    type: "delivery",
    text: "Livraison gratuite à partir de 50€",
    icon: "🚚",
    color: "#77a270", // using success color
  },
  {
    type: "production",
    text: "Temps de fabrication : 1-2 semaines",
    icon: "⏱️",
    color: "#f2c94c", // using warning color
  },
  {
    type: "promotion",
    text: "Nouvelle collection disponible",
    icon: "✨",
    color: "#3b82f6", // using info color
  },
];

export const deliveryMessages = {
  freeShipping: "Livraison gratuite à partir de 50€",
  freeShippingAvailable: "Livraison gratuite disponible!",
  standardShipping: "Livraison standard",
  expressShipping: "Livraison express",
};
