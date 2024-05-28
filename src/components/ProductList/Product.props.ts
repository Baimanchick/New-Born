import { Product } from "../../helpers/interfaces/product.interface";
import { ListGridType } from "antd/es/list";

export interface ProductProps {
  products: Product[];
  grid: ListGridType;
  newProducts?: Product[];
  productsPopRec?: Product[];
}
