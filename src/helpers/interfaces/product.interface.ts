export interface Product {
  id: number;
  category_name: string;
  brand_name: string;
  name: string;
  description: string;
  arrived: boolean;
  price: string;
  default_image: string;
  product_images: string[];
  weight: number;
  rating: number;
  discount: number;
  created_at: string;
  extra_info: string[];
  category: number;
  subcategory: number;
  brand: number;
  subcategory_title: string;
}

export interface FilterProduct {
  limit: number;
  offset: number;
  min_price?: number;
  max_price?: number;
  brand?: number;
  category?: number;
  product_name?: string;
}
