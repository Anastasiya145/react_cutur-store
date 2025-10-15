export type ProductDescription = {
  title: string;
  text: string[];
  advice: string;
};

export type Product = {
  id: string;
  name: string;
  description: ProductDescription;
  color: string;
  price: number;
  discount: number;
  final_price: number;
  material: string;
  category: string;
  images: string[];
  main_image: string;
  items_left: number;
  colors_available: string[];
};

export type ProductInCart = Product & {
  count: number;
};
