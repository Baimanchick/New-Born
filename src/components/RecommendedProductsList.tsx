import styles from "../styles/card.module.scss"
import { ProductCard } from "./ProductCard/ProductCard"
import nutrilon from '../assets/card/nutrilon.png'
import { Typography } from "antd"
import { useDispatch, useSelector } from "react-redux"
import { RootStates } from "../store/store"
import { useEffect } from "react"
import { fetchRecAndPopProducts } from "../store/features/products/productSlice"
import { ProductCardType, default_filters } from "./ProductCard/ProductCard.props"

const { Title } = Typography

function RecommendedProductsList() {
    const dispatch = useDispatch<any>()
    const products = useSelector((state: RootStates) => state.products.products)

    useEffect(() => {
        dispatch(fetchRecAndPopProducts({
            ...default_filters,
            limit: 16
        }))
    }, [dispatch])

    return (
        <div className={styles.recommendedProducts_main}>
            <div className={styles.recommendedProducts_container}>
                <Title style={{ fontSize: '24px', fontWeight: '1000', color: '#fff' }}>Рекомендуем вам</Title>
                <div className={styles.recommendedProducts}>
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

export default RecommendedProductsList