import { ProductCard } from "./ProductCard/ProductCard"
import nutrilon from '../assets/card/nutrilon.png'
import styles from "../styles/card.module.scss"
import { Col, Row, Typography } from "antd"
import { Button } from "./Button/Button"

const { Title } = Typography

function NewProductsList() {
    return (
        <div className={styles.newProducts_main}>
            <div className={styles.newProducts_container}>
                <div className={styles.newProducts_section__title}>
                    <Title style={{ fontSize: '24px', color: "#778692", fontWeight: '1000' }}>Самые популярные</Title>
                    <Button appearance={"yellow"} style={{ width: '140px', borderRadius: '10px', fontSize: '16px', fontWeight: '600' }}>Больше</Button>
                </div>
                <div className={styles.newProducts}>
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

export default NewProductsList