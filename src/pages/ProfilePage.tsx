import { useEffect, useState } from "react";
import OrderHistory from "../components/Order/OrderHistory"
import ProfileList from "../components/ProfileList/ProfileList"
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { fetchCarts } from "../store/features/cart/cartSlice";
import { Flex, Typography } from "antd";
import Loading from "../components/Loader/Loading";
import useWindowSize from "../hooks/useWindowSize";
import OrderHistoryMobile from "../components/Order/OrderHistoryMobile";
import styles from "../components/ProfileList/profile.module.scss"
import { fetchOrderHistory } from "../store/features/orders/orderHistorySlice";

const { Title } = Typography

function ProfilePage() {
    const userString = localStorage.getItem('user');
    const user = userString ? JSON.parse(userString) : null;
    const dispatch = useAppDispatch()
    const orderHistory = useAppSelector((state) => state.orderHistory.orderHistory);
    const windowSize = useWindowSize();
    const [loading, setLoading] = useState(true)
    const isMobile = windowSize.width && windowSize.width < 660;
    useEffect(() => {
        dispatch(fetchOrderHistory())
            .then(() => setLoading(false))
    }, [dispatch]);
    if (loading) {
        return <Loading />
    }

    return (
        <div className="container">
            <ProfileList user={user} />
            <Flex style={{ marginTop: 30, marginBottom: 30 }} justify={'center'}>
                <Title className={styles.profileTitlePage}>
                    История заказов
                </Title>
            </Flex>
            {
                isMobile ? (
                    <OrderHistoryMobile orderHistory={orderHistory} />
                ) : (
                    <OrderHistory />
                )
            }
        </div >
    )
}

export default ProfilePage