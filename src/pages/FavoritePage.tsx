import { useEffect, useState } from "react";
import FavoriteList from "../components/Favorite/FavoriteList"
import { useAppDispatch, useAppSelector } from "../hooks/hooks"
import { useNavigate } from "react-router-dom";
import openNotification from "../components/Notification/Notification";
import { Flex, Result } from "antd";
import { Button } from "../components";
import { fetchFavorites } from "../store/features/favorite/favoriteSlice";


function FavoritePage() {
    const navigate = useNavigate();
    const isAuth = useAppSelector((state) => state.auth.user !== null)
    const favoriteProducts = useAppSelector((state) => state.favorites.favorites)
    const [notificationShown, setNotificationShown] = useState(false);
    const dispatch = useAppDispatch()
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        dispatch(fetchFavorites())
            .then(() => setLoading(false))
            .catch(() => setLoading(false));
    }, [dispatch])


    useEffect(() => {
        if (!isAuth) {
            setNotificationShown(true)
        }
    }, [])

    useEffect(() => {
        if (notificationShown) {
            navigate('/register');
            openNotification('warning', 'Предупреждение', 'Вы не авторизованы', 2);
        }
    }, [notificationShown]);


    return (
        <div className="container">
            {favoriteProducts.length === 0 ? (
                <Result
                    title="Нет товаров"
                    subTitle="Извините но вы еще не добавили продукты в избранное"
                    extra={
                        <Flex justify={'center'}>
                            <Button appearance="yellow" onClick={() => navigate('/')}>К покупкам</Button>
                        </Flex>
                    }
                />
            ) : (
                <FavoriteList favoriteProducts={favoriteProducts} />
            )}
        </div>
    )
}

export default FavoritePage