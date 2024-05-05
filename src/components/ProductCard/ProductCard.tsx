import React, { useState, useEffect } from "react";
import { Card, Typography, Flex } from "antd";
import { Tag } from "antd";
import { Button as ButtonAnt } from "antd";
import { ReactComponent as Star } from "../../assets/svgs/card/star.svg";
import { ReactComponent as Fav } from "../../assets/svgs/card/heart.svg";
import { ReactComponent as FavFill } from "../../assets/svgs/card/filHeart.svg";

import { Button } from "../Button/Button";
import { ProductCardProps } from "../../helpers/interfaces/ProductCard.props";
import {
  formatNumberAndAddCurrency,
  truncateTitle,
} from "../../helpers/functions/helperFunctions";
import styles from "./productCard.module.scss";
import { Colors } from "../../helpers/enums/color.enum";
import { useNavigate } from "react-router-dom";
import { Counter } from "../Counter/Counter";
import { useAppSelector } from "../../hooks/hooks";
import { AppDispatch } from "../../store/store";
import { useDispatch } from "react-redux";
import { addFavorites } from "../../store/features/favorite/favoriteSlice";

const { Title, Text } = Typography;

export function ProductCard({ product }: ProductCardProps) {
  const [isClicked, setIsClicked] = useState(false);
  const [clickedHeart, setClickedHeart] = useState(() => {
    const storedValue = localStorage.getItem('clickedHeart');
    return storedValue ? JSON.parse(storedValue) : false;
  });
  const isAuth = useAppSelector((store) => store.auth.user !== null);
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    setClickedHeart(clickedHeart);
  }, [clickedHeart]);

  const navigateToDetail = (e: React.MouseEvent<HTMLDivElement>, id: number) => {
    const target = e.target as HTMLElement;
    e.stopPropagation();
    if (e.currentTarget === target || e.target instanceof HTMLImageElement) {
      navigate(`/detail/${id}`);
    }
  };

  const handleDecrement = (newCount: number) => {
    if (newCount === 0) setIsClicked(false);
  };

  const handleBuyClick = () => {
    setIsClicked(true);
  };

  const handleClickFavorite = (product_id: number) => {
    if (isAuth) {
      const newClickedHeart = !clickedHeart;
      setClickedHeart(newClickedHeart);
      dispatch(addFavorites(product_id));
      localStorage.setItem('clickedHeart', JSON.stringify(newClickedHeart));
    } else if (!isAuth) {
      navigate("/auth");
      alert('Вы не авторизованы');
    }
  };

  return (
    <Card
      onClick={(e) => navigateToDetail(e, product.id)}
      className={styles.cardCustom}
      classNames={{
        body: styles.bodyCustom,
        header: styles.headCustom,
        extra: styles.extraCustom,
      }}
      extra={
        <Flex align={"center"}>
          <Flex
            className={styles.wrapper}
            align={"center"}
            wrap={"wrap"}
          >
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
            className={`${styles.favButton} ${clickedHeart ? styles.clickedHeartProduct : styles}`}
            icon={clickedHeart ? <FavFill /> : <Fav />}
            shape="circle"
            danger
            onClick={() => handleClickFavorite(product.id)}
          />
        </Flex>
      }
      cover={<img style={{ width: '100%', height: 'auto' }} src={product.default_image} alt={product.name} />}
      actions={[
        !isClicked ? (
          <Button onClick={handleBuyClick} appearance={"blue"} block>
            Купить
          </Button>
        ) : null,
      ]}
    >
      <Flex vertical align={"center"}>
        <Flex
          justify={"space-between"}
          align={"center"}
          style={{ width: "100%" }}
        >
          <Title style={{ margin: 0 }} level={4}>
            {formatNumberAndAddCurrency(product.price, "₽")}
          </Title>
          <Flex align={"center"}>
            <Star />
            <Text style={{ fontSize: 18, marginLeft: 3 }}>
              {product.rating}
            </Text>
          </Flex>
        </Flex>
        <Text style={{ marginBottom: 20, fontSize: 14 }}>
          {truncateTitle(product.name)}
        </Text>
        {(isClicked && (
          <Counter initialValue={1} onDecrement={handleDecrement} />
        )) ||
          null}
      </Flex>
    </Card>
  );
}
