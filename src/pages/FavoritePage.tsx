import { useEffect, useState } from "react";
import FavoriteList from "../components/Favorite/FavoriteList"
import { useAppSelector } from "../hooks/hooks"
import { useNavigate } from "react-router-dom";
import openNotification from "../components/Notification/Notification";


function FavoritePage() {
    const navigate = useNavigate();
    const isAuth = useAppSelector((state) => state.auth.user !== null)
    const favoriteProducts = useAppSelector((state) => state.favorites.favorites)
    const [notificationShown, setNotificationShown] = useState(false);

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
            <FavoriteList favoriteProducts={favoriteProducts} />
        </div>
    )
}

export default FavoritePage