import { useEffect } from "react";
import OrderHistory from "../components/Order/OrderHistory"
import ProfileList from "../components/ProfileList/ProfileList"
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { fetchCarts } from "../store/features/cart/cartSlice";
import { Flex, Typography } from "antd";

const { Title } = Typography

function ProfilePage() {
    const carts = useAppSelector((state) => state.carts.carts);
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(fetchCarts());
    }, [dispatch]);
    return (
        <div className="container">
            <ProfileList />
            <Flex style={{ marginTop: 30, marginBottom: 30 }} justify={'center'}>
                <Title
                    style={{
                        fontWeight: 1000,
                        fontSize: 40,
                        color: '#1B81E7'
                    }}
                >
                    История заказов
                </Title>
            </Flex>
            <OrderHistory carts={carts} />
        </div>
    )
}

export default ProfilePage