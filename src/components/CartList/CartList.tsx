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
    const storedCounts = localStorage.getItem("cartCounts");
    if (storedCounts && storedCounts !== "{}") {
      return JSON.parse(storedCounts);
    } else {
      const countObj = carts.reduce((acc: any, item: any) => {
        return { ...acc, [item.id]: item.count };
      }, {});
      localStorage.setItem("cartCounts", JSON.stringify(countObj));
      return countObj;
    }
  });

  useEffect(() => {
    if (Object.keys(counts).length === 0) {
      const countObj = carts.reduce((acc: any, item: any) => {
        return { ...acc, [item.id]: item.count };
      }, {});
      localStorage.setItem("cartCounts", JSON.stringify(countObj));
      setCounts(countObj);
    }
  }, [carts]);

  console.log(carts)

  const incrementCount = (id: string) => {
    const newCounts = { ...counts };
    newCounts[id] = (newCounts[id] || 0) + 1;
    setCounts(newCounts);
    localStorage.setItem("cartCounts", JSON.stringify(newCounts));
    dispatch(changeCountCartProduct({ count: newCounts[id], product_id: +id }));
  };

  const decrementCount = (id: string) => {
    const newCounts = { ...counts };
    newCounts[id] = (newCounts[id] || 0) - 1;
    setCounts(newCounts);
    localStorage.setItem("cartCounts", JSON.stringify(newCounts));
    dispatch(changeCountCartProduct({ count: newCounts[id], product_id: +id }));
    if (newCounts[id] < 1) {
      localStorage.removeItem("addedProducts");
      dispatch(deleteCart(+id));
    }
  };

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
