import { ProductCard } from "./ProductCard/ProductCard"
import nutrilon from '../assets/card/nutrilon.png'
import styles from "../styles/card.module.scss"
import { Col, Row, Typography } from "antd"
import { Button } from "./Button/Button"
import { useDispatch, useSelector } from "react-redux"
import { RootStates } from "../store/store"
import { useEffect } from "react"
import { fetchProducts } from "../store/features/products/productSlice"
import { ProductCardType } from "./ProductCard/ProductCard.props"

const { Title } = Typography

function NewProductsList() {
    // TODO это на время пока не точно
    const dispatch = useDispatch<any>()
    const products = useSelector((states: RootStates) => states.products.products)

    useEffect(() => {
        dispatch(fetchProducts({
            limit: 16,
            offset: 1
        }))
    }, [dispatch])
    return (
        <div className={styles.newProducts_main}>
            <div className={styles.newProducts_container}>
                <div className={styles.newProducts_section__title}>
                    <Title style={{ fontSize: '24px', color: "#778692", fontWeight: '1000' }}>Новые товары</Title>
                    <Button appearance={"yellow"} style={{ width: '140px', borderRadius: '10px', fontSize: '16px', fontWeight: '600' }}>Больше</Button>
                </div>
                <div className={styles.newProducts}>
                    {products.map((product: ProductCardType, index: number) => (
                        <ProductCard
                            key={index}
                            product={product}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default NewProductsList