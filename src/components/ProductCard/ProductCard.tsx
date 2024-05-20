import React, { useState, useEffect } from "react";
import { Card, Typography, Flex } from "antd";
import { Tag } from "antd";
import { Button as ButtonAnt } from "antd";
import { ReactComponent as Star } from "../../assets/svgs/card/star.svg";
import { ReactComponent as Fav } from "../../assets/svgs/card/heart.svg";
import { ReactComponent as FavFill } from "../../assets/svgs/card/filHeart.svg";
import { Button } from "../Button/Button";
import { ProductCardProps } from "./ProductCard.props";
import {
  formatNumberAndAddCurrency,
} from "../../helpers/functions/helperFunctions";
import styles from "./productCard.module.scss";
import { Colors } from "../../helpers/enums/color.enum";
import { useNavigate } from "react-router-dom";
import { Counter } from "../Counter/Counter";
import { useAppSelector } from "../../hooks/hooks";
import { AppDispatch } from "../../store/store";
import { useDispatch } from "react-redux";
import { addFavorites } from "../../store/features/favorite/favoriteSlice";
import openNotification from "../Notification/Notification";
import cn from "classnames";
import { addToCart, changeCountCartProduct, deleteCart, fetchCarts } from "../../store/features/cart/cartSlice";
import { Cart } from "../../helpers/interfaces/cart.interface";

const { Title, Paragraph, Text } = Typography;

export function ProductCard({ product }: ProductCardProps) {
  const navigate = useNavigate();
  const isAuth = useAppSelector((store) => store.auth.user !== null);
  const carts = useAppSelector((state) => state.carts.carts)
  const dispatch: AppDispatch = useDispatch();
  const favorites = useAppSelector((state) => state.favorites.favorites);
  const isProductInFavorites = favorites.some((fav) => fav.id === product?.id);
  const [addedToCart, setAddedToCart] = useState(false);

  useEffect(() => {
    const addedProducts = JSON.parse(localStorage.getItem('AddedProducts') || '[]');
    const addedToCart = addedProducts.includes(product?.id);
    setAddedToCart(addedToCart);
  }, [product]);

  useEffect(() => {
    dispatch(fetchCarts())
  }, [dispatch])

  const handleAddToCart = (productId: number) => {
    if (isAuth) {
      dispatch(addToCart({ count: 1, product_id: productId }));
      setAddedToCart(true);
    } else {
      navigate("/register");
      openNotification("error", "Ошибка", "Вы не авторизованы", 2);
    }
  };

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

  const navigateToDetail = (
    e: React.MouseEvent<HTMLDivElement>,
    id: number
  ) => {
    const target = e.target as HTMLElement;
    e.stopPropagation();
    if (e.currentTarget === target || e.target instanceof HTMLImageElement) {
      navigate(`/detail/${id}`);
    }
  };

  const handleClickFavorite = (product_id: number) => {
    if (isAuth) {
      dispatch(addFavorites(product_id));
    } else if (!isAuth) {
      navigate("/register");
      alert("Вы не авторизованы");
    }
  };

  const cartForProduct = carts.find((cart: Cart) => cart.product.id === product.id);

  return (
    <Card
      onClick={(e) => navigateToDetail(e, product.id)}
      className={styles.cardCustom}
      classNames={{
        body: styles.bodyCustom,
        header: styles.headCustom,
        cover: styles.coverCustom,
        extra: styles.extraCustom,
      }}
      extra={
        <Flex align={"flex-start"} justify={"space-between"}>
          <Flex align={"center"} wrap={"wrap"}>
            {product.extra_info.map((tag: string, index: number) => (
              <Tag
                key={index}
                className={styles.tag}
                color={Colors.BRAND_COLOR}
              >
                {tag}
              </Tag>
            ))}
          </Flex>
          <ButtonAnt
            className={cn(styles.favButton, {
              [styles.clickedHeartProduct]: isProductInFavorites,
            })}
            icon={isProductInFavorites ? <FavFill /> : <Fav />}
            shape="circle"
            danger
            onClick={() => handleClickFavorite(product.id)}
          />
        </Flex>
      }
      cover={
        <img
          src={product.default_image}
          alt={product.name}
          className={styles.productCardImage}
        />
      }
      actions={[
        <>
          {addedToCart && cartForProduct ? (
            <Counter
              initialValue={cartForProduct.count}
              onIncrement={(newCount) => incrementCount({ count: newCount, id: cartForProduct.id })}
              onDecrement={(newCount) => decrementCount({ count: newCount, id: cartForProduct.id })}
            />
          ) : (
            <Button
              className={styles.btnBuy}
              onClick={() => handleAddToCart(product.id)}
              appearance={"blue"}
              block
            >
              Купить
            </Button>
          )}
        </>
      ]}
    >
      <Flex vertical align={"center"}>
        <Flex
          justify={"space-between"}
          align={"center"}
          style={{ width: "100%" }}
        >
          <Title className={styles.priceTitle} style={{ margin: 0 }} level={4}>
            {formatNumberAndAddCurrency(product.price, "сом")}
          </Title>
          <Flex align={"center"}>
            <Star />
            <Text
              className={styles.productRating}
              style={{ fontSize: 18, marginLeft: 3 }}
            >
              {product.rating}
            </Text>
          </Flex>
        </Flex>
        <Paragraph className={styles.productParagraph}>
          {product.name}
        </Paragraph>
      </Flex>
    </Card >
  );
}
