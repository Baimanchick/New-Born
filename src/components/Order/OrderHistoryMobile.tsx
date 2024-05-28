import { Card, Divider, Flex, Typography } from 'antd'
import styles from "./order.module.scss"
import { formatNumberAndAddCurrency } from '../../helpers/functions/helperFunctions';
import { Cart } from '../../helpers/interfaces/cart.interface';
import { useAppSelector } from '../../hooks/hooks';

const { Title, Text } = Typography;

function OrderHistoryMobile() {
    const orderHistory = useAppSelector((state) => state.orderHistory.orderHistory);
    return (
        <>
            <Flex style={{ flexDirection: 'column' }} gap={15}>
                {orderHistory.map((order: any, index: number) => (
                    <Card
                        className={styles.CardCustom}
                        classNames={{
                            body: styles.bodyCustom,
                            header: styles.headCustom,
                            cover: styles.coverCustom,
                            extra: styles.extraCustom,
                        }}
                        extra={
                            <Title className={styles.TitleCustom}>Товар</Title>
                        }
                        cover={
                            order.items.map((item: any, index: number) => (
                                <Flex key={index} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <img className={styles.profileDefaultImage} src={`https://baby-back.ru/${item.product_details.default_image}`} />
                                    <Title className={styles.TitleProduct}>{item.product_details.name}</Title>
                                </Flex>
                            ))
                        }
                        key={index}
                    >
                        <Flex gap={10} style={{ flexDirection: 'column', marginTop: 10 }}>
                            <Flex gap={25}>
                                <Flex style={{ flexDirection: 'column', textAlign: 'left' }}>
                                    <Title className={styles.TitleInfoOrder}>Цена</Title>
                                    {order.items.map((item: any, index: number) => (
                                        <Text key={index} className={styles.TextInfoOrder}>{item.product_details.price}</Text>
                                    ))}
                                </Flex>
                                <Flex style={{ flexDirection: 'column' }}>
                                    <Title className={styles.TitleInfoOrder}>Адрес</Title>
                                    <Text className={styles.TextInfoOrder}>{order.shipping_address}</Text>
                                </Flex>
                            </Flex>
                            <Flex gap={25}>
                                <Flex style={{ flexDirection: 'column', textAlign: 'left' }}>
                                    <Title className={styles.TitleInfoOrder}>Количество</Title>
                                    <Text className={styles.TextInfoOrder}>{order.items[0].quantity} шт</Text>
                                </Flex>
                                <Flex style={{ flexDirection: 'column' }}>
                                    <Title className={styles.TitleInfoOrder}>В общем</Title>
                                    <Text className={`${styles.TextInfoOrder} ${styles.yellow}`}>{formatNumberAndAddCurrency(order.total_price, 'сом')}</Text>
                                </Flex>
                            </Flex>
                            <Divider />
                        </Flex>
                    </Card>
                ))}
            </Flex>
        </>
    )
}

export default OrderHistoryMobile