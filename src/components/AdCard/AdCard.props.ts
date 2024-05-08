export interface AdI {
    ad: AdType[]
}

export type AdType = {
    id? : number;
    image: string;
    link: string
}