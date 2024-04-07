import { ProductCard } from "./ProductCard/ProductCard"
import nutrilon from '../assets/card/nutrilon.png'
import styles from "../styles/card.module.scss"
import { Button } from "antd"

function PopularProductsList() {
    return (
        <div className={styles.popularProducts_main}>
            <div className={styles.popularProducts_container}>
                <div className={styles.popularProducts_section__title}>
                    <div>Новые товары</div>
                    <Button>Больше</Button>
                </div>
                <div className={styles.popularProducts}>
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

export default PopularProductsList