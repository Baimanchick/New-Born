import { Flex } from "antd"
import { useAppDispatch, useAppSelector } from "../../hooks/hooks"
import { useEffect, useState } from "react"
import { fetchFavorites } from "../../store/features/favorite/favoriteSlice"
import { ProductCard } from "../ProductCard/ProductCard"
import Loading from "../Loader/Loading"

function FavoriteList({ favoriteProducts }: any) {
    const dispatch = useAppDispatch()

    const [loading, setLoading] = useState(true);
    const carts = useAppSelector((state) => state.carts.carts)

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
                <Flex>
                    {favoriteProducts.map((cardItem: any) => (
                        <ProductCard carts={carts} key={cardItem.id} product={cardItem} />
                    ))}
                </Flex>
            )}
        </>
    )
}

export default FavoriteList