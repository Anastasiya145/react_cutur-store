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
    color: "#10b981",
  },
  {
    type: "production",
    text: "Temps de fabrication : 1-2 semaines",
    icon: "⏱️",
    color: "#f59e0b",
  },
  {
    type: "promotion",
    text: "Nouvelle collection disponible",
    icon: "✨",
    color: "#8b5cf6",
  },
];

export const deliveryMessages = {
  freeShipping: "Livraison gratuite à partir de 50€",
  freeShippingAvailable: "Livraison gratuite disponible!",
  standardShipping: "Livraison standard",
  expressShipping: "Livraison express",
};
