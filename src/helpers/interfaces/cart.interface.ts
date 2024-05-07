import { Product } from "./product.interface";

export interface Cart {
  id?: any;
  created_at: string;
  user: number;
  count: number;
  product: Product;
}
