export type ProductDescription = {
  title: string;
  text: string[];
  advice: string;
};

export type Product = {
  id: number;
  name: string;
  description: ProductDescription;
  color: string;
  price: number;
  discount: number;
  final_price: number;
  material: string;
  category: string;
  images: string[];
  mainimage?: string;
  itemsleft?: number;
  colorsavailable: string[];
};

export type ProductInCart = Product & {
  count: number;
};
