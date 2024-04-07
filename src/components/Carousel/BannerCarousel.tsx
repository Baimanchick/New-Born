import React, { useRef } from 'react';
import { Carousel } from 'antd';
import { CarouselRef } from 'antd/lib/carousel';
import styles from "./carousel.module.scss";
import arrowLeft from "../../assets/svgs/carousel/arrowLeft.svg";
import arrowRight from "../../assets/svgs/carousel/arrowRight.svg"
import img from "../../assets/carousel/image 1.png"


const BannerCarousel: React.FC = () => {
    const ref = useRef<CarouselRef>(null);

    return (
        <div className={styles.banner_carousel__container}>
            <div className={styles.banner_carousel}>
                <Carousel
                    autoplay
                    dots={true}
                    dotPosition='bottom'
                    pauseOnHover={true}
                    pauseOnDotsHover={true}
                    ref={ref}
                    effect='fade'
                    swipeToSlide
                    draggable
                >
                    <div className={styles.banner_carousel__pages}>
                        <img src={img} />
                    </div>
                    <div className={styles.banner_carousel__pages}>
                        <img src="https://turan-backend.online/media/media/carousel/MacBook-Air-15-Inch-Feature-Purple.jpg" />
                    </div>
                </Carousel>
            </div>
            <div className={styles.banner_carousel__button}>
                <button onClick={() => {
                    ref.current && ref.current.prev();
                }}>
                    <img
                        src={arrowLeft}
                    />
                </button>
                <button onClick={() => {
                    ref.current && ref.current.next();
                }}>
                    <img
                        src={arrowRight}
                    />
                </button>
            </div>
        </div>
    );
};

export default BannerCarousel;
