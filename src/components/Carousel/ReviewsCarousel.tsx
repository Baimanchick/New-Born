import React, { useEffect, useRef, useState } from 'react';
import { Carousel } from 'antd';
import { CarouselRef } from 'antd/lib/carousel';
import styles from "./carousel.module.scss";
import arrowLeft from "../../assets/svgs/carousel/arrowLeft.svg";
import arrowRight from "../../assets/svgs/carousel/arrowRight.svg"




export const ReviewsCarousel: React.FC = () => {
    const ref = useRef<CarouselRef>(null);
    const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < 900);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 900);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className={styles.reviews_carousel__container}>
            <div className={styles.reviews_carousel}>
                {isMobile ? (
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
                                    <div className={styles.reviews}>
                                        <p>"Мы очень довольны вашими продуктами! Мой сын с удовольствием ест пюре и каши из вашего ассортимента. Я спокойна, зная, что он получает только качественную и натуральную пищу. Благодарю за вашу заботу о здоровье наших детей!"</p>
                                        <div>
                                            <div>Иван Петров</div>
                                            <span>10 февраля 2024</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </Carousel>
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
                                    <div className={styles.reviews}>
                                        <p>"Мы очень довольны вашими продуктами! Мой сын с удовольствием ест пюре и каши из вашего ассортимента. Я спокойна, зная, что он получает только качественную и натуральную пищу. Благодарю за вашу заботу о здоровье наших детей!"</p>
                                        <div>
                                            <div>Иван Петров</div>
                                            <span>10 февраля 2024</span>
                                        </div>
                                    </div>
                                    <div className={styles.reviews}>
                                        <p>"Мы очень довольны вашими продуктами! Мой сын с удовольствием ест пюре и каши из вашего ассортимента. Я спокойна, зная, что он получает только качественную и натуральную пищу. Благодарю за вашу заботу о здоровье наших детей!"</p>
                                        <div>
                                            <div>Иван Петров</div>
                                            <span>10 февраля 2024</span>
                                        </div>
                                    </div>
                                    <div className={styles.reviews}>
                                        <p>"Мы очень довольны вашими продуктами! Мой сын с удовольствием ест пюре и каши из вашего ассортимента. Я спокойна, зная, что он получает только качественную и натуральную пищу. Благодарю за вашу заботу о здоровье наших детей!"</p>
                                        <div>
                                            <div>Иван Петров</div>
                                            <span>10 февраля 2024</span>
                                        </div>
                                    </div>
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
        </div >
    );
};

export default ReviewsCarousel;
