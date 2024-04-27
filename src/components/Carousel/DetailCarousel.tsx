import React, { useState } from "react";
import { Card, Flex, Image, Layout } from "antd";
import styles from "../Detail/detail.module.scss";
import Loading from "../Loader/Loading";
import { API_URL } from "../../utils/consts";

const { Content } = Layout;

function DetailCarousel({ product }: any) {
    const [selectedImage, setSelectedImage] = useState(product.default_image);

    if (!product) {
        return <Loading />;
    }

    const handleThumbnailClick = (image: string) => {
        setSelectedImage(image);
    };

    return (
        <Content style={{ width: '100%', backgroundColor: '#fff', borderRadius: '20px', padding: '20px' }}>
            <Flex style={{ flexDirection: 'column' }}>
                <Flex justify="center">
                    <Image style={{ width: '100%', height: '350px', cursor: 'pointer', objectFit: 'cover' }} src={selectedImage} />
                </Flex>
                <Flex style={{ marginTop: '15px' }} gap={15}>
                    {product.product_images.map((productImage: string, index: number) => (
                        <Card
                            classNames={{ body: styles.bodyCustomCard }}
                            key={index}
                            onClick={() => handleThumbnailClick(`${API_URL}${productImage}`)}
                        >
                            <Image preview={false} src={`${API_URL}${productImage}`} />
                        </Card>
                    ))}
                </Flex>
            </Flex>
        </Content>
    );
}

export default DetailCarousel;
