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
const { Title, Text, Paragraph } = Typography;

// interface DataType {
//   gender?: string;
//   name: {
//     title?: string;
//     first?: string;
//     last?: string;
//   };
//   email?: string;
//   picture: {
//     large?: string;
//     medium?: string;
//     thumbnail?: string;
//   };
//   nat?: string;
//   loading: boolean;
// }

// const count = 3;
// const fakeDataUrl = `https://randomuser.me/api/?results=${count}&inc=name,gender,email,nat,picture&noinfo`;

const fontStyles: React.CSSProperties = {
  fontSize: "20px",
  fontWeight: 700,
  lineHeight: "23px",
};

const headerItems = ["Товар", "Цена", "Количество", "В общем", "Удалить"];

export function CartList() {
  // const [data, setData] = useState<DataType[]>([]);
  // const [list, setList] = useState<DataType[]>([]);
  const dispatch = useAppDispatch();
  const carts = useAppSelector((state) => state.carts.carts);
  const [counts, setCounts] = useState<{ [key: string]: number }>(() => {
    const savedCounts = localStorage.getItem('cartCounts');
    return savedCounts ? JSON.parse(savedCounts) : {};
  });

  useEffect(() => {
    dispatch(fetchCarts());
  }, [dispatch]);

  useEffect(() => {
    setCounts((prevCounts) => {
      const newCounts: any = {};
      if (Array.isArray(carts)) {
        carts.forEach((cart) => {
          newCounts[cart.id] = prevCounts[cart.id] || 1;
        });
      }
      return newCounts;
    });
  }, [carts]);

  useEffect(() => {
    localStorage.setItem('cartCounts', JSON.stringify(counts));
  }, [counts]);

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
        // dataSource={list}
        renderItem={(index: number) => (
          <List.Item
            actions={[
              <ButtonAnt
                type={"primary"}
                danger
                icon={<MinusOutlined />}
                shape={"circle"}
              />,
            ]}
            key={index}
          >
            <List.Item.Meta
              className={styles.item}
              avatar={
                <Flex align={"center"} gap={20}>
                  <img src={agusha} width={100} height={100} />
                  <Text style={{ ...fontStyles, color: Colors.GREY }}>
                    Смесь сухая Nutrilon Пепти Аллергия 800г с 0 месяцев
                  </Text>
                </Flex>
              }
            />
            <List.Item.Meta
              className={styles.priceItemMeta}
              title={"2 699 сом"}
            />
            <List.Item.Meta
              className={styles.counterItemMeta}
              title={<Counter />}
            />
            <List.Item.Meta
              className={styles.priceItemMeta}
              title={"2 699 сом"}
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
            {formatNumberAndAddCurrency(2699, "Сом")}
          </Paragraph>
        </Flex>
      </Flex>
    </>
  );
}

export default CartList;
