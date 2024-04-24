import React, { useEffect, useRef, useState } from "react";
import { Carousel, Typography } from "antd";
import { CarouselRef } from "antd/lib/carousel";
import styles from "./carousel.module.scss";
import arrowLeft from "../../assets/svgs/carousel/arrowLeft.svg";
import arrowRight from "../../assets/svgs/carousel/arrowRight.svg";
import { useDispatch, useSelector } from "react-redux";
import { fetchCustomerReviews } from "../../store/features/customer_reviews/customerReviewsSlice";
import { CustomerReviewsCarouselType } from "./CustomerReviews.props";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";

const { Title } = Typography;

export const CustomerReviewsCarousel: React.FC = () => {
  const ref = useRef<CarouselRef>(null);
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < 900);
  const dispatch = useAppDispatch();
  const customerReviews = useAppSelector(
    (state) => state.customerReviews.customerReviews
  );

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 900);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    dispatch(fetchCustomerReviews());
  }, [dispatch]);

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      day: "numeric",
      month: "long",
      year: "numeric",
    };
    return new Date(dateString).toLocaleDateString("ru-RU", options);
  };

  return (
    <div className={styles.reviews_carousel__container}>
      <Title style={{ fontSize: "24px", fontWeight: "1000", color: "#778692" }}>
        Что клиенты говорят о нас
      </Title>
      <div className={styles.reviews_carousel}>
        {isMobile ? (
          <Carousel
            dots={false}
            dotPosition="bottom"
            pauseOnHover={true}
            pauseOnDotsHover={true}
            ref={ref}
            effect="fade"
            swipeToSlide
            draggable
          >
            {customerReviews.map(
              (customer: CustomerReviewsCarouselType, index: number) => (
                <div key={index} className={styles.reviews_main}>
                  <div className={styles.reviews_container}>
                    <div className={styles.reviews}>
                      <p>{customer.text}</p>
                      <div>
                        <div>{customer.name}</div>
                        <span>{formatDate(customer.created_at)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )
            )}
          </Carousel>
        ) : (
          <Carousel
            slidesToShow={3}
            dots={false}
            dotPosition="bottom"
            pauseOnHover={false}
            pauseOnDotsHover={true}
            ref={ref}
            effect="fade"
            swipeToSlide
            draggable
          >
            <div className={styles.reviews_main}>
              <div className={styles.reviews_container}>
                {customerReviews.map(
                  (
                    customerReview: CustomerReviewsCarouselType,
                    index: number
                  ) => (
                    <div key={index} className={styles.reviews}>
                      <p>{customerReview.text}</p>
                      <div>
                        <div>{customerReview.name}</div>
                        <span>{formatDate(customerReview.created_at)}</span>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          </Carousel>
        )}
      </div>
      <div className={styles.reviews_carousel__button}>
        <button
          onClick={() => {
            ref.current && ref.current.prev();
          }}
        >
          <img src={arrowLeft} alt={"arrowLeft"} />
        </button>
        <button
          onClick={() => {
            ref.current && ref.current.next();
          }}
        >
          <img src={arrowRight} alt={"arrowRight"} />
        </button>
      </div>
    </div>
  );
};

export default CustomerReviewsCarousel;
