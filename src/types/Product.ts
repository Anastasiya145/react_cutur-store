export type Product = {
  id: number;
  name: string;
  description: string;
  color: string;
  price: number;
  discount: number;
  final_price: number;
  material: string;
  category: string;
  images: string[];
};

export type ProductInCart = Product & {
  count: number;
};
