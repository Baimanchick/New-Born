export interface ReviewsI {
  reviews: ReviewType[]
}

export interface ReviewType {
    id?: number;
    user_name:string;
    text: string;
    rating: number;
    created_at: string;
    user: number;
    product: number
}