export interface BrandI {
    brand: BrandType[]
}

export type BrandType = {
    id? : number;
    name: string
    image: string;
}