import React from 'react'
import styles from "../styles/card.module.scss"
import BrandCard from './BrandCard/BrandCard'
import agusha from "../assets/card/agushaBrand.png"
import { Flex, Typography } from 'antd'

const { Title } = Typography

function BrandCardList() {
    return (
        <div className={styles.brandCard_main}>
            <div className={styles.brandCard_container}>
                <Title style={{ fontSize: '24px', fontWeight: '1000', color: "rgba(119, 134, 146, 1)" }}>Бренды с которыми сотрудничаем</Title>
                <Flex justify={'space-between'} wrap={'wrap'} style={{ rowGap: '15px' }} gap={15}>
                    {[1, 2, 3, 4, 5,].map((index: number) => (
                        <BrandCard key={index} image={agusha} />
                    ))}
                </Flex>
            </div>
        </div>
    )
}

export default BrandCardList