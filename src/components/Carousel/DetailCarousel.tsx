import React, { useState } from "react";
import { Card, Flex, Image, Layout } from "antd";
import styles from "../Detail/detail.module.scss";
import image from "../../assets/card/imagePng.png"


const { Content } = Layout;

function DetailCarousel() {


    return (
        <Content style={{ width: '100%', backgroundColor: '#fff', borderRadius: '20px', padding: '20px' }}>
            <Flex style={{ flexDirection: 'column' }}>
                <Flex justify="center">
                    <Image style={{ width: '100%', height: 'auto', cursor: 'pointer' }} src={image} />
                </Flex>
                <Flex style={{ marginTop: '15px' }} gap={15}>
                    {[1, 2, 3, 4].map((index) => (
                        <Card
                            style={{
                                width: '100px',
                                height: '74px',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                border: 'none',
                                backgroundColor: '#F8F8F8',
                                cursor: 'pointer'
                            }}
                            classNames={{ body: styles.bodyCustomCard }}
                            key={index}
                        >
                            <Image style={{ objectFit: 'contain' }} preview={false} src={image} />
                        </Card>
                    ))}
                </Flex>
            </Flex>
        </Content>
    );
}

export default DetailCarousel;
