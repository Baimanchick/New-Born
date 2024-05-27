import { Product } from "./product.interface";

export interface OrderHistoryI {
  orderHistory: OrderHistoryType[];
}

export type OrderHistoryType = {
  id?: number;
  items: OrderHistoryItems;
  name: string;
  phone: string;
  email: string;
  total_price: string;
  shipping_address: string;
  created_at: string;
  user: number;
  product: Product;
};

type OrderHistoryItems = {
  product: Product;
  quantity: number;
};
