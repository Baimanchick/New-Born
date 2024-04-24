import React, { useEffect, useRef, useState } from 'react';
import { Carousel, Typography } from 'antd';
import { CarouselRef } from 'antd/lib/carousel';
import styles from "./carousel.module.scss";
import arrowLeft from "../../assets/svgs/carousel/arrowLeft.svg";
import arrowRight from "../../assets/svgs/carousel/arrowRight.svg"
import { useDispatch, useSelector } from 'react-redux';
import { RootStates } from '../../store/store';
import { fetchCustomerReviews } from '../../store/features/customer_reviews/customerReviewsSlice';
import { CustomerReviewsCarouselType } from './CustomerReviews.props';

const { Title } = Typography;

export const CustomerReviewsCarousel: React.FC = () => {
    const ref = useRef<CarouselRef>(null);
    const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < 900);
    const dispatch = useDispatch<any>()
    const customerReviews = useSelector((state: RootStates) => state.customerReviews.customerReviews)

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 900);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        dispatch(fetchCustomerReviews())
    }, [dispatch])

    return (
        <div className={styles.reviews_carousel__container}>
            <Title style={{ fontSize: '24px', fontWeight: '1000', color: '#778692' }}>Что клиенты говорят о нас</Title>
            <div className={styles.reviews_carousel}>
                {isMobile ? (
                    <div>Мы не поддердживаем мобилку</div>
                ) : (
                    <Carousel
                        autoplay
                        dots={false}
                        dotPosition='bottom'
                        pauseOnHover={true}
                        pauseOnDotsHover={true}
                        ref={ref}
                        effect='fade'
                        swipeToSlide
                        draggable
                    >
                        {[1, 2, 3,].map((index: number) => (
                            <div key={index} className={styles.reviews_main}>
                                <div className={styles.reviews_container}>
                                    {customerReviews.map((customerReviews: CustomerReviewsCarouselType, index: number) => (
                                        <div key={index} className={styles.reviews}>
                                            <p>{customerReviews.text}</p>
                                            <div>
                                                <div>{customerReviews.name}</div>
                                                <span>{customerReviews.created_at}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </Carousel>
                )}
            </div >
            <div className={styles.reviews_carousel__button}>
                <button onClick={() => {
                    ref.current && ref.current.prev();
                }}>
                    <img
                        src={arrowLeft}
                        alt={'arrowLeft'}

                    />
                </button>
                <button onClick={() => {
                    ref.current && ref.current.next();
                }}>
                    <img
                        src={arrowRight}
                        alt={'arrowRight'}
                    />
                </button>
            </div>
        </div >
    );
};

export default CustomerReviewsCarousel;
