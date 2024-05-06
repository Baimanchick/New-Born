import React, { useEffect, useState } from "react";
import {
  Button as ButtonAnt,
  Divider,
  Flex,
  List,
  Typography,
} from "antd";
import styles from "./cartList.module.scss";
import { MinusOutlined } from "@ant-design/icons";
import { Counter } from "../Counter/Counter";
import agusha from "../../assets/card/agusha.png";
import { Colors } from "../../helpers/enums/color.enum";
import { formatNumberAndAddCurrency } from "../../helpers/functions/helperFunctions";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { changeCountCartProduct, deleteCart, fetchCarts } from "../../store/features/cart/cartSlice";
import { Cart } from "../../helpers/interfaces/cart.interface";
const { Text, Paragraph } = Typography;

const fontStyles: React.CSSProperties = {
  fontSize: "20px",
  fontWeight: 700,
  lineHeight: "23px",
};

const headerItems = ["Товар", "Цена", "Количество", "В общем", "Удалить"];

export function CartList({ carts }: any) {
  const dispatch = useAppDispatch();
  const [counts, setCounts] = useState<{ [key: string]: number }>(() => {
    const savedCounts = localStorage.getItem('cartCounts');
    return savedCounts ? JSON.parse(savedCounts) : {};
  });

  useEffect(() => {
    localStorage.setItem('cartCounts', JSON.stringify(counts));
  }, [counts]);

  useEffect(() => {
    setCounts((prevCounts) => {
      const newCounts: any = {};
      carts.forEach((cart: any) => {
        newCounts[cart.id] = prevCounts[cart.id] || 1;
      });
      return newCounts;
    });
  }, [carts]);

  const incrementCount = (id: string) => {
    dispatch(changeCountCartProduct({ count: counts[id] + 1, product_id: +id }));
    setCounts((prevCounts) => ({
      ...prevCounts,
      [id]: (prevCounts[id] || 0) + 1
    }));
  };

  const decrementCount = (id: string) => {
    const updatedCount = Math.max((counts[id] || 0) - 1, 0);
    setCounts((prevCounts) => ({
      ...prevCounts,
      [id]: updatedCount
    }));

    dispatch(changeCountCartProduct({ count: updatedCount, product_id: +id }));
    if (updatedCount < 1) {
      localStorage.removeItem("addedProducts");
      dispatch(deleteCart(+id));
    }
  };

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
        dataSource={carts}
        renderItem={(cart: Cart, index: number) => (
          <List.Item
            actions={[
              <ButtonAnt
                type={"primary"}
                danger
                icon={<MinusOutlined />}
                shape={"circle"}
                onClick={() => {
                  const stringProducts = localStorage.getItem("addedProducts");
                  const addedProducts = stringProducts ? JSON.parse(stringProducts) : [];

                  const updatedProducts = addedProducts.filter((productId: any) => productId !== cart.product.id);

                  if (JSON.stringify(addedProducts) !== JSON.stringify(updatedProducts)) {
                    localStorage.setItem("addedProducts", JSON.stringify(updatedProducts));
                  }

                  dispatch(deleteCart(cart.id));
                  dispatch(fetchCarts())
                }}
              />,
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
              title={<Counter initialValue={cart.count} onIncrement={() => incrementCount(cart.id)} onDecrement={() => decrementCount(cart.id)} />}
            />
            <List.Item.Meta
              className={`${styles.priceItemMeta} ${styles.priceItemMetaYellow}`}
              title={formatNumberAndAddCurrency(cart.product.price * cart.count, 'сом')}
              style={{ color: '#FABC22' }}
            />
          </List.Item>
        )}
      />
      <Divider />
      <Flex justify={"end"}>
        <Flex vertical={true} align={"end"}>
          <Text
            style={{ fontSize: "16px", fontWeight: 400, color: Colors.GREY }}
          >
            Итого:
          </Text>
          <Paragraph
            style={{ color: Colors.YELLOW, fontWeight: 600, fontSize: "24px" }}
          >
            {formatNumberAndAddCurrency(carts.reduce((total: any, cart: any) => total + (cart.product.price * cart.count), 0), 'сом')}
          </Paragraph>

        </Flex>
      </Flex>
    </>
  );
}

export default CartList;
