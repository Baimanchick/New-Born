import { useEffect } from 'react'
import styles from "../styles/card.module.scss"
import BrandCard from './BrandCard/BrandCard'
import { Flex, Typography } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { RootStates } from '../store/store'
import { fetchBrand } from '../store/features/brand/brandSlice'
import { BrandType } from './BrandCard/BrandCard.props'

const { Title } = Typography

function BrandCardList() {
    const dispatch = useDispatch<any>()
    const brand = useSelector((state: RootStates) => state.brand.brand)

    useEffect(() => {
        dispatch(fetchBrand())
    }, [dispatch])


    return (
        <div className={styles.brandCard_main}>
            <div className={styles.brandCard_container}>
                <Title style={{ fontSize: '24px', fontWeight: '1000', color: "rgba(119, 134, 146, 1)" }}>Бренды с которыми сотрудничаем</Title>
                <Flex justify={'space-between'} wrap={'wrap'} style={{ rowGap: '15px' }} gap={15}>
                    {brand.map((brand: BrandType, index: number) => (
                        <BrandCard key={index} brand={brand} />
                    ))}
                </Flex>
            </div>
        </div>
    )
}

export default BrandCardList