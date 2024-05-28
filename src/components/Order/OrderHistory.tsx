import React from "react";
import { Flex, Image, List, Typography } from "antd";
import styles from "./order.module.scss";
import { formatNumberAndAddCurrency, truncateTextAfterWords } from "../../helpers/functions/helperFunctions";
import { useAppSelector } from "../../hooks/hooks";
const { Text, Title } = Typography;

const headerItems = ["Товар", "Цена", "Количество", "Адрес", "В общем"];

export function OrderHistory() {
    const orderHistory = useAppSelector((state) => state.orderHistory.orderHistory);

    return (
        <>
            <List
                className={styles.list}
                header={
                    <Flex
                        align={"center"}
                        justify={"space-between"}
                        className={styles.headerItems}
                    >
                        {headerItems.map((item, index) => (
                            <Text key={index} className={styles.headerItem}>{item}</Text>
                        ))}
                    </Flex>
                }
                itemLayout="horizontal"
                dataSource={orderHistory}
                renderItem={(order: any, index: number) => (
                    <Flex key={index} justify={'space-between'} align={'center'}>
                        {order.items.map((item: any, index: number) => (
                            <React.Fragment key={index}>
                                <Flex>
                                    <Image
                                        preview={false}
                                        width={100}
                                        height={100}
                                        src={`https://baby-back.ru/${item.product_details.default_image}`}
                                        style={{ objectFit: 'contain' }}
                                    />
                                    <Text className={styles.profileProductName} >{truncateTextAfterWords(item.product_details.name, 5)}</Text>
                                </Flex>
                                <Flex>
                                    <Title className={styles.blackProfileFont} >{formatNumberAndAddCurrency(item.product_details.price, 'сом')}</Title>
                                </Flex>

                            </React.Fragment>
                        ))}
                        <Flex>
                            <Title className={styles.blackProfileFont}>{order.items[0].quantity} шт</Title>
                        </Flex>
                        <Flex>
                            <Title className={styles.blackProfileFont}>{order.shipping_address}</Title>
                        </Flex>
                        <Flex>
                            <Title className={styles.yellowProfileFont}>{formatNumberAndAddCurrency(order.total_price, 'сом')}</Title>
                        </Flex>
                    </Flex>
                )}
            />
        </>
    );
}

export default OrderHistory;
