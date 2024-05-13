import React, { useEffect, useState } from "react";
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
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { fetchCarts } from "../store/features/cart/cartSlice";
import Loading from "../components/Loader/Loading";

function CartPage() {
  const { token } = theme.useToken();
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);
  const navigation = useNavigate();
  const dispatch = useAppDispatch();
  const isAuth = useAppSelector((states) => states.auth.user !== null);

  useEffect(() => {
    dispatch(fetchCarts());
  }, [dispatch]);

  const carts = useAppSelector((state) => state.carts.carts);
  console.log(carts);

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const steps = [
    {
      title: "Моя корзина",
      content: <CartList carts={carts} />,
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

  const contentStyle: React.CSSProperties = {
    lineHeight: "260px",
    textAlign: "center",
    padding: "40px",
    color: token.colorTextTertiary,
    backgroundColor: token.colorWhite,
    borderRadius: "20px",
    width: current === 2 ? "700px" : "auto",
    margin: current === 2 ? "0 auto" : "auto",
    height: current === 2 ? "650px" : "auto",
    marginTop: 16,
  };

  const navigationButtons = (
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
      {current === steps.length - 1 ? (
        <Button onClick={() => message.success("Processing complete!")}>
          Готово
        </Button>
      ) : (
        <Button onClick={() => next()} type={"primary"}>
          Далее
        </Button>
      )}
    </Flex>
  );

  if (!carts) {
    return <Loading />;
  }

  return (
    <div className="container">
      <Steps
        className="site-navigation-steps"
        responsive={false}
        labelPlacement="horizontal"
        type={"navigation"}
        current={current}
        items={steps.map((item) => ({
          key: item.title,
          title: item.title,
          icon: item.icon,
        }))}
      />
      {current !== 3 ? (
        <div style={contentStyle}>
          {steps[current].content}
          {navigationButtons}
        </div>
      ) : (
        steps[3].content
      )}
    </div>
  );
}

export default CartPage;
