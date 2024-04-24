
export interface ProductCardI {
    products: ProductCardType[],
}

export interface ProductCardType {
    id: number;
    category_name: string;
    brand_name: string;
    name: string;
    description: string;
    arrived: boolean;
    price: string; 
    default_image: string;
    weight: number;
    rating: number;
    discount: number
    created_at: string;
    extra_info: string[];
    category: number;
    subcategory: number;
    brand: number;
    subcategory_title: string; 
}

export interface FilterProductCardType {
    limit : number;
    offset : number;
    min_price?: number;
    max_price?: number;
    brand?: number;
    category?: number;
    product_name?: string
}

export const default_filters = {
    limit : 100,
    offset : 0,
    min_price: undefined,
    max_price: undefined,
    brand: undefined,
    category: undefined,
    product_name: ''
}