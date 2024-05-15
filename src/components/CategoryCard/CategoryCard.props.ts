export interface CategoryI {
  category: CategoryType[];
  subcategories: any;
}

export type CategoryType = {
  id?: number;
  name: string;
  image: string;
  catalog: number;
};
