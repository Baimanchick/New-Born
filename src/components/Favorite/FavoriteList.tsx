import { Flex } from "antd"
import { useAppDispatch, useAppSelector } from "../../hooks/hooks"
import { useEffect, useState } from "react"
import { fetchFavorites } from "../../store/features/favorite/favoriteSlice"
import { ProductCard } from "../ProductCard/ProductCard"
import Loading from "../Loader/Loading"

function FavoriteList() {
    const dispatch = useAppDispatch()
    const favoriteProducts = useAppSelector((state) => state.favorites.favorites)
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
                <Flex>
                    {favoriteProducts.map((cardItem: any) => (
                        <ProductCard key={cardItem.id} product={cardItem} />
                    ))}
                </Flex>
            )}
        </>
    )
}

export default FavoriteList