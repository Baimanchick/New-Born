import { Flex } from "antd"
import { useAppDispatch, useAppSelector } from "../../hooks/hooks"
import { useEffect, useState } from "react"
import { fetchFavorites } from "../../store/features/favorite/favoriteSlice"
import Loading from "../Loader/Loading"
import ProductList from "../ProductList/ProductList"

function FavoriteList({ favoriteProducts }: any) {
    const dispatch = useAppDispatch()

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        dispatch(fetchFavorites())
            .then(() => setLoading(false))
            .catch(() => setLoading(false));
    }, [dispatch])
    return (
        <>
            {loading ? (
                <Flex justify={'center'} align={'center'} style={{ width: "100%", height: "100%" }}>
                    <Loading />
                </Flex>
            ) : (
                <ProductList
                    products={favoriteProducts}
                    grid={{
                        gutter: 16,
                        column: 6,
                        xxl: 6,
                        xl: 6,
                        lg: 4,
                        md: 3,
                        sm: 2,
                        xs: 2,
                    }}
                />
            )}
        </>
    )
}

export default FavoriteList