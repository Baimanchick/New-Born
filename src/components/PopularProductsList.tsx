import { ProductCard } from "./ProductCard/ProductCard"
import nutrilon from '../assets/card/nutrilon.png'
import styles from "../styles/card.module.scss"
import { Button } from "./Button/Button"
import { Typography } from "antd"
import { useDispatch, useSelector } from "react-redux"
import { RootStates } from "../store/store"
import { useEffect } from "react"
import { fetchRecAndPopProducts } from "../store/features/products/productSlice"
import { ProductCardType, default_filters } from "./ProductCard/ProductCard.props"


const { Title } = Typography

function PopularProductsList() {
    const dispatch = useDispatch<any>()
    const products = useSelector((state: RootStates) => state.products.products)

    useEffect(() => {
        dispatch(fetchRecAndPopProducts({
            ...default_filters,
            limit: 16
        }))
    }, [dispatch])
    return (
        <div className={styles.popularProducts_main}>
            <div className={styles.popularProducts_container}>
                <div className={styles.popularProducts_section__title}>
                    <Title style={{ fontSize: '24px', color: "#778692", fontWeight: '1000' }}>Самые популярные</Title>
                    <Button appearance="yellow" style={{ width: '140px', borderRadius: '10px', fontSize: '16px', fontWeight: '600' }}>Больше</Button>
                </div>
                <div className={styles.popularProducts}>
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

export default PopularProductsList