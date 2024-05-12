import React, { useEffect, useRef, useState } from "react";
import { Carousel } from "antd";
import { CarouselRef } from "antd/lib/carousel";
import styles from "./carousel.module.scss";
import arrowLeft from "../../assets/svgs/carousel/arrowLeft.svg";
import arrowRight from "../../assets/svgs/carousel/arrowRight.svg";
import { fetchCarousel } from "../../store/features/carousel/carouselSlice";
import { CarouselType } from "./Carousel.props";
import Loading from "../Loader/Loading";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";

const BannerCarousel: React.FC = () => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);
  const carousel = useAppSelector((state) => state.carousel.carousel);

  const ref = useRef<CarouselRef>(null);

  useEffect(() => {
    dispatch(fetchCarousel())
    setLoading(false)
  }, [dispatch]);

  return (
    <div className={styles.banner_carousel__container}>
      {loading ? (
        <Loading />
      ) :
        <>
          <Carousel
            autoplay
            dots={true}
            dotPosition="bottom"
            pauseOnHover={true}
            pauseOnDotsHover={true}
            ref={ref}
            effect="fade"
            swipeToSlide
            draggable
          >
            {carousel?.map((carouselItem: CarouselType, index: number) => (
              <div key={index} className={styles.banner_carousel__pages}>
                <img src={carouselItem.images} alt={carouselItem.description} />
              </div>
            ))}
          </Carousel>
          <div className={styles.banner_carousel__button}>
            <button onClick={() => { ref.current && ref.current.prev(); }} >
              <img src={arrowLeft} alt={"arrowLeft"} />
            </button>
            <button onClick={() => { ref.current && ref.current.next(); }} >
              <img src={arrowRight} alt={"arrowRight"} />
            </button>
          </div>
        </>}
    </div>
  );
};

export default BannerCarousel;
