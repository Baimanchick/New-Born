import { Product } from "./product.interface";

export interface FavoritesI {
  favorites: Favorite[];
}

export interface Favorite {
  id?: number;
  created_at: string;
  user: number;
  product: Product[];
}
