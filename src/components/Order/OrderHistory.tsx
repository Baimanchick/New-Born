import React, { useEffect, useState } from "react";
import {
    Button as ButtonAnt,
    Divider,
    Flex,
    List,
    Typography,
} from "antd";
import styles from "./order.module.scss";
import { MinusOutlined } from "@ant-design/icons";
import { Counter } from "../Counter/Counter";
import { Colors } from "../../helpers/enums/color.enum";
import { formatNumberAndAddCurrency } from "../../helpers/functions/helperFunctions";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { changeCountCartProduct, deleteCart, fetchCarts } from "../../store/features/cart/cartSlice";
import { Cart } from "../../helpers/interfaces/cart.interface";
const { Text, Title } = Typography;

const fontStyles: React.CSSProperties = {
    fontSize: "20px",
    fontWeight: 700,
    lineHeight: "23px",
};

const headerItems = ["Товар", "Цена", "Количество", "Адрес", "В общем"];

export function OrderHistory({ carts }: any) {
    const dispatch = useAppDispatch();
    // const [counts, setCounts] = useState<{ [key: string]: number }>(() => {
    //     const storedCounts = localStorage.getItem("cartCounts");
    //     if (storedCounts && storedCounts !== "{}") {
    //         return JSON.parse(storedCounts);
    //     } else {
    //         const countObj = carts.reduce((acc: any, item: any) => {
    //             return { ...acc, [item.id]: item.count };
    //         }, {});
    //         localStorage.setItem("cartCounts", JSON.stringify(countObj));
    //         return countObj;
    //     }
    // });

    // useEffect(() => {
    //     if (Object.keys(counts).length === 0) {
    //         const countObj = carts.reduce((acc: any, item: any) => {
    //             return { ...acc, [item.id]: item.count };
    //         }, {});
    //         localStorage.setItem("cartCounts", JSON.stringify(countObj));
    //         setCounts(countObj);
    //     }
    // }, [carts]);

    // console.log(counts)

    // const incrementCount = (id: string) => {
    //     const newCounts = { ...counts };
    //     newCounts[id] = (newCounts[id] || 0) + 1;
    //     setCounts(newCounts);
    //     localStorage.setItem("cartCounts", JSON.stringify(newCounts));
    //     dispatch(changeCountCartProduct({ count: newCounts[id], product_id: +id }));
    // };

    // const decrementCount = (id: string) => {
    //     const newCounts = { ...counts };
    //     newCounts[id] = (newCounts[id] || 0) - 1;
    //     setCounts(newCounts);
    //     localStorage.setItem("cartCounts", JSON.stringify(newCounts));
    //     dispatch(changeCountCartProduct({ count: newCounts[id], product_id: +id }));
    //     if (newCounts[id] < 1) {
    //         localStorage.removeItem("addedProducts");
    //         dispatch(deleteCart(+id));
    //     }
    // };

    const sortCartsById = (carts: any) => {
        return [...carts].sort((a, b) => a.id - b.id);
    };

    const sortedCarts = sortCartsById(carts);

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
                        {headerItems.map((item, index: number) => {
                            return <Text key={index} className={styles.headerItem}>{item}</Text>;
                        })}
                    </Flex>
                }
                itemLayout="horizontal"
                dataSource={sortedCarts}
                renderItem={(cart: Cart, index: number) => (
                    <List.Item
                        actions={[
                            <List.Item.Meta
                                className={`${styles.priceItemMeta} ${styles.priceItemMetaYellow}`}
                                title={formatNumberAndAddCurrency(cart.product.price * cart.count, 'сом')}
                                style={{ color: '#FABC22' }}
                            />
                        ]}
                        key={index}
                    >
                        <List.Item.Meta
                            className={styles.item}
                            avatar={
                                <Flex align={"center"} gap={20}>
                                    <img src={cart.product.default_image} width={100} height={100} />
                                    <Text style={{ ...fontStyles, color: Colors.GREY }}>
                                        {cart.product.name}
                                    </Text>
                                </Flex>
                            }
                        />
                        <List.Item.Meta
                            className={styles.priceItemMeta}
                            title={formatNumberAndAddCurrency(cart.product.price, 'сом')}
                        />
                        <List.Item.Meta
                            className={styles.counterItemMeta}
                            title={<Title>2</Title>}
                        />
                        <List.Item.Meta
                            className={`${styles.priceItemMeta} ${styles.priceItemMetaYellow}`}
                            title={<Title>Исанова 53</Title>}
                            style={{ color: '#FABC22' }}
                        />
                    </List.Item>
                )}
            />
        </>
    );
}

export default OrderHistory;
