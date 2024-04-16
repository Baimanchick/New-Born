export interface CarouselI {
    carousel: CarouselType[]
}

export type CarouselType = {
    id? : number;
    images: string;
    description: string
}