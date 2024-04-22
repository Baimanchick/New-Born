import React, { useEffect, useRef } from 'react';
import { Carousel } from 'antd';
import { CarouselRef } from 'antd/lib/carousel';
import styles from "./carousel.module.scss";
import arrowLeft from "../../assets/svgs/carousel/arrowLeft.svg";
import arrowRight from "../../assets/svgs/carousel/arrowRight.svg"
import { useDispatch, useSelector } from 'react-redux';
import { RootStates } from '../../store/store';
import { fetchCarousel } from '../../store/features/carousel/carouselSlice';
import { CarouselType } from './Carousel.props';
import { replaceUrl } from '../../helpers/functions/helperFunctions';

const BannerCarousel: React.FC = () => {
    const dispatch = useDispatch<any>()
    const carousel = useSelector((state: RootStates) => state.carousel.carousel)
    const ref = useRef<CarouselRef>(null);

    useEffect(() => {
        dispatch(fetchCarousel())
    }, [dispatch])

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
                    {carousel.map((carousel: CarouselType, index: number) => (
                        <div key={index} className={styles.banner_carousel__pages}>
                            <img src={replaceUrl(carousel.images)} />
                        </div>
                    ))}
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
