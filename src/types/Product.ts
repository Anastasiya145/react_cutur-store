export type ProductDescription = {
  title: string;
  text: string[];
  advice: string;
};

export type Product = {
  id: number;
  name: string;
  description: ProductDescription[];
  color: string;
  price: number;
  discount: number;
  final_price: number;
  material: string;
  category: string;
  images: string[];
  mainImage?: string;
  itemsLeft?: number;
  colorsAvailable: string[];
};

export type ProductInCart = Product & {
  count: number;
};
