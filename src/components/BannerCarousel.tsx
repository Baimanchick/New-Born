import React, { useRef } from 'react';
import { Button, Carousel, Drawer } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { CarouselRef } from 'antd/lib/carousel';

const contentStyle: React.CSSProperties = {
    height: '160px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: 'red',
};

const BannerCarousel: React.FC = () => {
    const ref = useRef<CarouselRef>(null);

    return (
        <>
            <Carousel
                autoplay
                dots={true} dotPosition='bottom'
                pauseOnHover={true}
                pauseOnDotsHover={true}
                draggable
                ref={ref}
                effect='fade'
            >
                <div>
                    <h3 style={contentStyle}>1</h3>
                </div>
                <div>
                    <h3 style={contentStyle}>2</h3>
                </div>
                <div>
                    <h3 style={contentStyle}>3</h3>
                </div>
                <div>
                    <h3 style={contentStyle}>4</h3>
                </div>
            </Carousel>
            <div>
                <Button
                    onClick={() => {
                        ref.current && ref.current.prev();
                    }}
                >
                    Prev
                </Button>
                <Button
                    onClick={() => {
                        ref.current && ref.current.goTo(0);
                    }}
                >
                    Reset
                </Button>
                <Button
                    onClick={() => {
                        ref.current && ref.current.next();
                    }}
                >
                    Next
                </Button>
            </div>
        </>
    );
};

export default BannerCarousel;
