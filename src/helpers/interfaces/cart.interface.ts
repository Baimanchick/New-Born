export interface CartI {
  carts: Cart[];
}

export interface Cart {
  id?: any;
  created_at: string;
  user: number;
  product: any;
}
