import React from 'react'
import styles from "../styles/card.module.scss"
import BrandCard from './BrandCard/BrandCard'
import agusha from "../assets/card/agushaBrand.png"


function BrandCardList() {
    return (
        <div className={styles.brandCard_main}>
            <div className={styles.brandCard_title}>
                Бренды с которыми сотрудничаем
            </div>
            <div className={styles.brandCard_container}>
                {[1, 2, 3, 4, 5,].map((index: number) => (
                    <BrandCard key={index} image={agusha} />
                ))}
            </div>
        </div>
    )
}

export default BrandCardList