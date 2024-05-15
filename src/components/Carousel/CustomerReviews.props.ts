export interface CustomerReviewsCarouselI {
    customerReviews: CustomerReviewsCarouselType[]
}

export type CustomerReviewsCarouselType = {
    id? : number;
    text: string;
    name: string;
    created_at: string;
    user: number
}