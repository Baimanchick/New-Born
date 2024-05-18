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

const { Title } = Typography

function ProfilePage() {
    const carts = useAppSelector((state) => state.carts.carts);
    const userString = localStorage.getItem('user');
    const user = userString ? JSON.parse(userString) : null;
    const dispatch = useAppDispatch()
    const windowSize = useWindowSize();
    const [loading, setLoading] = useState(true)
    const isMobile = windowSize.width && windowSize.width < 660;
    useEffect(() => {
        dispatch(fetchCarts())
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
                    <OrderHistoryMobile carts={carts} />
                ) : (
                    <OrderHistory carts={carts} />
                )
            }
        </div >
    )
}

export default ProfilePage