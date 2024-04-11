import styles from "../styles/card.module.scss"
import { ProductCard } from "./ProductCard/ProductCard"
import nutrilon from '../assets/card/nutrilon.png'
import { Typography } from "antd"

const { Title } = Typography

function RecommendedProductsList() {
    return (
        <div className={styles.recommendedProducts_main}>
            <div className={styles.recommendedProducts_container}>
                <Title style={{ fontSize: '24px', fontWeight: '1000', color: '#fff' }}>Рекомендуем вам</Title>
                <div className={styles.recommendedProducts}>
                    {[1, 2, 3, 4, 5].map((index: number) => (
                        <ProductCard
                            key={index}
                            price={2600}
                            rating={5}
                            title={"Смесь сухая Nutrilon Пепти Аллергия 800г с 0 месяцев"}
                            image={nutrilon}
                            tags={['800г', 'с 0 месяцев', 'new']}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default RecommendedProductsList