import { Carousel, Flex, Image, Layout } from 'antd'
import { CarouselRef } from 'antd/es/carousel';
import { useRef } from 'react';
import { API_URL } from '../../utils/consts';
import styles from "../../components/Detail/detail.module.scss"
import arrowLeft from "../../assets/svgs/carousel/arrowLeft.svg";
import arrowRight from "../../assets/svgs/carousel/arrowRight.svg";

const { Content } = Layout

function DetailCarouselMobile({ product }: any) {
    const ref = useRef<CarouselRef>(null);

    return (
        <Content style={{ width: '100%', backgroundColor: '#fff', borderRadius: '20px', padding: '20px', position: 'relative' }}>
            <Carousel
                dots={true}
                dotPosition="bottom"
                pauseOnHover={true}
                pauseOnDotsHover={true}
                ref={ref}
                effect="fade"
                swipeToSlide
                draggable
                autoplay
            >
                {product.product_images.map(
                    (productImage: string, index: number) => (
                        <Flex key={index}>
                            <Image
                                preview={false}
                                src={`${API_URL}${productImage}`}

                            />
                        </Flex>
                    )
                )}
            </Carousel>
            <div className={styles.detail_carousel__button}>
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
        </Content>
    )
}

export default DetailCarouselMobile