import React, { useState } from "react";
import { Button, Flex, message, Result, Steps, theme } from "antd";
import { ReactComponent as CartIcon } from "../assets/svgs/cart/cart.svg";
import { ReactComponent as CardIcon } from "../assets/svgs/cart/card.svg";
import { ReactComponent as SuccessIcon } from "../assets/svgs/cart/sucsess.svg";
import { ReactComponent as BusIcon } from "../assets/svgs/cart/bus.svg";

import { ArrowLeftOutlined, SmileOutlined } from "@ant-design/icons";
import CartList from "../components/CartList/CartList";
import { useNavigate } from "react-router-dom";
import Delivery from "../components/Delivery/Delivery";
import Payment from "../components/Payment/Payment";

const steps = [
  {
    title: "Моя корзина",
    content: <CartList />,
    icon: <CardIcon />,
  },
  {
    title: "Доставка",
    content: <Delivery />,
    icon: <BusIcon />,
  },
  {
    title: "Оплата",
    content: <Payment />,
    icon: <CardIcon />,
  },
  {
    title: "Подтверждение",
    content: (
      <Result
        icon={<SmileOutlined />}
        title="Спасибо за покупку"
        subTitle="Копия или краткое описание вашего заказа были отправлены по адресу customer@example.com"
        extra={<Button type="primary">К покупкам</Button>}
      />
    ),
    icon: <SuccessIcon />,
  },
];

function CartPage() {
  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);
  const navigation = useNavigate();

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
    icon: item.icon,
  }));
  console.log(current);

  const contentStyle: React.CSSProperties = {
    lineHeight: "260px",
    textAlign: "center",
    padding: "40px",
    color: token.colorTextTertiary,
    backgroundColor: token.colorWhite,
    borderRadius: "20px",
    width: current == 2 ? "700px" : "auto",
    margin: current == 2 ? "0 auto" : "auto",
    height: current == 2 ? "650px" : "auto",
    // border: `1px dashed ${token.colorBorder}`,
    marginTop: 16,
  };

  return (
    <div className="container">
      <Steps
        className="site-navigation-steps"
        responsive={false}
        labelPlacement="horizontal"
        type={"navigation"}
        current={current}
        items={items}
      />
      {current !== 3 ? (
        <div style={contentStyle}>
          {steps[current].content}
          <Flex align={"center"} justify={"space-between"}>
            {current === 0 && (
              <Button
                type={"link"}
                icon={<ArrowLeftOutlined />}
                style={{ margin: "0 8px", fontSize: "16px" }}
                onClick={() => navigation("/")}
              >
                К покупкам
              </Button>
            )}

            {current > 0 && (
              <Button
                type={"link"}
                icon={<ArrowLeftOutlined />}
                style={{ margin: "0 8px", fontSize: "16px" }}
                onClick={() => prev()}
              >
                Назад
              </Button>
            )}

            {current === steps.length - 1 && (
              <Button onClick={() => message.success("Processing complete!")}>
                Done
              </Button>
            )}
            {current < steps.length - 1 && (
              <Button onClick={() => next()} type={"primary"}>
                Next
              </Button>
            )}
          </Flex>
        </div>
      ) : (
        steps[3].content
      )}
    </div>
  );
}

export default CartPage;