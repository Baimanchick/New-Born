import { useEffect, useState } from "react";
import { Button as ButtonAnt, Divider, Flex, List, Typography } from "antd";
import styles from "./cartList.module.scss";
import { MinusOutlined } from "@ant-design/icons";
import { Counter } from "../Counter/Counter";
import { Colors } from "../../helpers/enums/color.enum";
import { formatNumberAndAddCurrency } from "../../helpers/functions/helperFunctions";
import { useAppDispatch } from "../../hooks/hooks";
import {
  changeCountCartProduct,
  deleteCart,
} from "../../store/features/cart/cartSlice";
import { Cart } from "../../helpers/interfaces/cart.interface";
import useWindowSize from "../../hooks/useWindowSize";
import { ProductCard } from "../ProductCard/ProductCard";
import ProductList from "../ProductList/ProductList";
const { Text, Paragraph } = Typography;

const headerItems = ["Товар", "Цена", "Количество", "В общем", "Удалить"];

export function CartList({ carts }: any) {
  const dispatch = useAppDispatch();
  const windowSize = useWindowSize();
  const isMobile = windowSize.width && windowSize.width < 660;

  const incrementCount = ({ count, id }: { count: number; id: number }) => {
    dispatch(changeCountCartProduct({ count, product_id: id }));
  };

  const decrementCount = ({ count, id }: { count: number; id: number }) => {
    dispatch(changeCountCartProduct({ count, product_id: id }));
    if (count < 1) {
      dispatch(deleteCart(+id))
      localStorage.removeItem("AddedProducts")
    }
  };

  const sortCartsById = (carts: any) => {
    return [...carts].sort((a, b) => a.id - b.id);
  };

  const sortedCarts = sortCartsById(carts);

  return (
    <>
      {isMobile ? (
        sortedCarts.map((cart: Cart) => (
          <ProductList
            products={[cart.product]}
            grid={{
              gutter: 16,
              column: 6,
              xxl: 6,
              xl: 6,
              lg: 4,
              md: 3,
              sm: 2,
              xs: 2,
            }}
          />
        ))
      ) : (
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
                  return (
                    <Text key={index} className={styles.headerItem}>
                      {item}
                    </Text>
                  );
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
                    onClick={() => dispatch(deleteCart(cart.id))}
                  />,
                ]}
                key={index}
              >
                <List.Item.Meta
                  className={styles.item}
                  avatar={
                    <Flex align={"center"} gap={20}>
                      <img
                        src={cart.product.default_image}
                        width={100}
                        height={100}
                      />
                      <Text className={styles.cartProductName}>
                        {cart.product.name}
                      </Text>
                    </Flex>
                  }
                />
                <List.Item.Meta
                  className={styles.priceItemMeta}
                  title={formatNumberAndAddCurrency(cart.product.price, "сом")}
                />
                <List.Item.Meta
                  className={styles.counterItemMeta}
                  title={
                    <Counter
                      initialValue={cart.count}
                      onIncrement={(newCount) =>
                        incrementCount({ count: newCount, id: cart.id })
                      }
                      onDecrement={(newCount) =>
                        decrementCount({ count: newCount, id: cart.id })
                      }
                    />
                  }
                />
                <List.Item.Meta
                  className={`${styles.priceItemMeta} ${styles.priceItemMetaYellow}`}
                  title={formatNumberAndAddCurrency(
                    cart.product.price * cart.count,
                    "сом"
                  )}
                  style={{ color: "#FABC22" }}
                />
              </List.Item>
            )}
          />
        </>
      )
      }
      {isMobile ? null : <Divider />}
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
            {formatNumberAndAddCurrency(
              carts.reduce(
                (total: any, cart: any) =>
                  total + cart.product.price * cart.count,
                0
              ),
              "сом"
            )}
          </Paragraph>
        </Flex>
      </Flex>
    </>
  );
}

export default CartList;
