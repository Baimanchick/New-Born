import { Cart } from "../../helpers/interfaces/cart.interface";
import { Product } from "../../helpers/interfaces/product.interface";

export interface ProductCardProps {
  product: Product;
  carts?: any;
}
