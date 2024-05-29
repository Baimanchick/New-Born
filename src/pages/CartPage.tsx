import React, { useEffect, useState } from "react";
import { Button as ButtonAntd, Flex, message, Result, Steps, theme, Typography } from "antd";
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
import openNotification from "../components/Notification/Notification";
import useWindowSize from "../hooks/useWindowSize";
import styles from "../components/CartList/cartList.module.scss"
import { formatNumberAndAddCurrency } from "../helpers/functions/helperFunctions";
import { Colors } from "../helpers/enums/color.enum";
import { Button } from "../components";

const { Title, Paragraph, Text } = Typography

function CartPage() {
  const { token } = theme.useToken();
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);
  const [notificationShown, setNotificationShown] = useState(false);
  const navigation = useNavigate();
  const dispatch = useAppDispatch();
  const isAuth = useAppSelector((states) => states.auth.user !== null);
  const carts = useAppSelector((state) => state.carts.carts);
  const windowWidth = useWindowSize()
  const isMobile = windowWidth.width && windowWidth.width < 660;


  useEffect(() => {
    dispatch(fetchCarts());
  }, [dispatch]);
  useEffect(() => {
    if (!isAuth) {
      setNotificationShown(true);
    }
  }, []);
  useEffect(() => {
    if (notificationShown) {
      openNotification("warning", "Предупреждение", "Вы не авторизованы", 2);
      navigate("/register");
    }
  }, [notificationShown]);

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const steps = [
    {
      title: <Title className={styles.stepTitle}>Моя корзина</Title>,
      content: <CartList carts={carts} />,
      icon: <CardIcon className={isMobile ? 'small-icon' : ''} />,
    },
    {
      title: <Title className={styles.stepTitle}>Доставка</Title>,
      content: <Delivery />,
      icon: <BusIcon className={isMobile ? 'small-icon' : ''} />,
    },
    {
      title: <Title className={styles.stepTitle}>Оплата</Title>,
      content: <Payment />,
      icon: <CardIcon className={isMobile ? 'small-icon' : ''} />,
    },
    {
      title: <Title className={styles.stepTitle}>Подтверждение</Title>,
      content: (
        <Result
          icon={<SmileOutlined />}
          title="Спасибо за покупку"
          subTitle="Копия или краткое описание вашего заказа были отправлены по адресу customer@example.com"
          extra={<ButtonAntd onClick={() => navigate('/')} type="primary">К покупкам</ButtonAntd>}
        />
      ),
      icon: <SuccessIcon className={isMobile ? 'small-icon' : ''} />,
    },
  ];

  const contentStyle: React.CSSProperties = {
    lineHeight: "260px",
    textAlign: "center",
    padding: isMobile ? '10px' : "40px",
    color: token.colorTextTertiary,
    backgroundColor: token.colorWhite,
    borderRadius: "20px",
    width: current === 2 ? "700px" : "auto",
    margin: current === 2 ? "0 auto" : "auto",
    height: current === 2 ? "650px" : "auto",
    marginTop: 16,
  };

  const cartStyle: React.CSSProperties = {
    display: current === 0 ? 'flex' : '',
    justifyContent: current === 0 ? 'center' : '',
    gap: current === 0 ? 5 : 0,
    flexWrap: current === 0 ? 'wrap' : 'initial'
  }

  const navigationButtonAntds = (
    <>

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

      <Flex align={"center"} justify={"space-between"}>
        {current === 0 && (
          <ButtonAntd
            type={"link"}
            icon={<ArrowLeftOutlined />}
            style={{ margin: "0 8px", fontSize: "16px" }}
            onClick={() => navigation("/")}
          >
            К покупкам
          </ButtonAntd>
        )}
        {current > 0 && (
          <ButtonAntd
            type={"link"}
            icon={<ArrowLeftOutlined />}
            style={{ margin: "0 8px", fontSize: "16px" }}
            onClick={() => prev()}
          >
            Назад
          </ButtonAntd>
        )}
        {current === steps.length - 1 ? (
          <ButtonAntd onClick={() => message.success("Processing complete!")}>
            Готово
          </ButtonAntd>
        ) : (
          <ButtonAntd onClick={() => next()} type={"primary"}>
            Далее
          </ButtonAntd>
        )}
      </Flex>
    </>
  );

  if (!carts) {
    return <Loading />;
  }

  return (
    <div className="container">
      {carts.length === 0 ? (
        <Result
          title="Нет товаров"
          subTitle="Извините но вы еще не добавили продукты в корзину"
          extra={
            <Flex justify={'center'}>
              <Button appearance="yellow" onClick={() => navigate('/')}>К покупкам</Button>
            </Flex>
          }
        />
      ) : (
        <>
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
              {isMobile && current === 0 ? (
                <>
                  <div style={cartStyle}>
                    {steps[current].content}
                  </div>
                  <div>
                    {navigationButtonAntds}
                  </div>
                </>
              ) : (
                <>
                  {steps[current].content}
                  {navigationButtonAntds}
                </>
              )}

            </div>
          ) : (
            steps[3].content
          )}
        </>
      )}

    </div>
  );
}

export default CartPage;
