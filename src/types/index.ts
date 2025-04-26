export type Product = {
  id: number;
  title: string;
  price: number;
  images: string[];
  description: string;
};

export type CartItem = Product & {
  quantity: number;
  size: string;
  color: string;
};
