export interface CategoryI {
    category: CategoryType[]
}

export type CategoryType = {
    id? : number;
    name: string;
    image: string;
    catalog: number
}