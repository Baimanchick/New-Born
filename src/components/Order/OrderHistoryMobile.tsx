import { Card, Divider, Flex, Typography } from 'antd'
import styles from "./order.module.scss"
import { formatNumberAndAddCurrency } from '../../helpers/functions/helperFunctions';
import { Cart } from '../../helpers/interfaces/cart.interface';

const { Title, Text } = Typography;

function OrderHistoryMobile({ carts }: any) {
    const fakeCart = {
        adress: 'Исанова 33',
    }
    return (
        <>
            <Flex style={{ flexDirection: 'column' }} gap={15}>
                {carts.map((cart: Cart, index: number) => (
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
                            <Flex style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <img className={styles.profileDefaultImage} src={cart.product.default_image} />
                                <Title className={styles.TitleProduct}>{cart.product.name}</Title>
                            </Flex>
                        }
                        key={index}
                    >
                        <Flex gap={10} style={{ flexDirection: 'column', marginTop: 10 }}>
                            <Flex gap={25}>
                                <Flex style={{ flexDirection: 'column', textAlign: 'left' }}>
                                    <Title className={styles.TitleInfoOrder}>Цена</Title>
                                    <Text className={styles.TextInfoOrder}>{cart.product.price}</Text>
                                </Flex>
                                <Flex style={{ flexDirection: 'column' }}>
                                    <Title className={styles.TitleInfoOrder}>Адрес</Title>
                                    <Text className={styles.TextInfoOrder}>{fakeCart.adress}</Text>
                                </Flex>
                            </Flex>
                            <Flex gap={25}>
                                <Flex style={{ flexDirection: 'column', textAlign: 'left' }}>
                                    <Title className={styles.TitleInfoOrder}>Количество</Title>
                                    <Text className={styles.TextInfoOrder}>{cart.count} шт</Text>
                                </Flex>
                                <Flex style={{ flexDirection: 'column' }}>
                                    <Title className={styles.TitleInfoOrder}>В общем</Title>
                                    <Text className={`${styles.TextInfoOrder} ${styles.yellow}`}>{formatNumberAndAddCurrency(cart.product.price * cart.count, 'сом')}</Text>
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