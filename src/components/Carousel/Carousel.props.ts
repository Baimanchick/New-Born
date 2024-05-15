export interface CarouselI {
  carousel?: CarouselType[];
  carouselMobile?: CarouselType[];
}

export type CarouselType = {
  id?: number;
  images: string;
  description: string;
};
