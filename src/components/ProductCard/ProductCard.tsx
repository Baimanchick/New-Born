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
  truncateTextAfterSymbols,
  truncateTextAfterWords,
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
import { addToCart } from "../../store/features/cart/cartSlice";

const { Title, Paragraph, Text } = Typography;

export function ProductCard({ product }: ProductCardProps) {
  const navigate = useNavigate();
  const [isClicked, setIsClicked] = useState(false);
  const isAuth = useAppSelector((store) => store.auth.user !== null);
  const dispatch: AppDispatch = useDispatch();
  const favorites = useAppSelector((state) => state.favorites.favorites);
  const isProductInFavorites = favorites.some((fav) => fav.id === product?.id);

  const handleAddToCart = (productId: number) => {
    if (isAuth) {
      dispatch(addToCart({ count: 1, product_id: productId }));
    } else {
      navigate("/register");
      openNotification("error", "Ошибка", "Вы не авторизованы", 2);
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

  const handleDecrement = (newCount: number) => {
    if (newCount === 0) setIsClicked(false);
  };

  const handleBuyClick = (productId: number) => {
    setIsClicked(true);
    handleAddToCart(productId);
  };

  const handleClickFavorite = (product_id: number) => {
    if (isAuth) {
      dispatch(addFavorites(product_id));
    } else if (!isAuth) {
      navigate("/register");
      alert("Вы не авторизованы");
    }
  };

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
        !isClicked ? (
          <Button
            className={styles.btnBuy}
            onClick={() => handleBuyClick(product.id)}
            appearance={"blue"}
            block
          >
            Купить
          </Button>
        ) : (
          <Counter initialValue={1} onDecrement={handleDecrement} />
        ),
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
    </Card>
  );
}
