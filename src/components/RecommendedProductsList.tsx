// Ваш файл RecommendedProductsList.tsx

import React, { useEffect } from "react";
import { fetchRecAndPopProducts } from "../store/features/products/productSlice";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { default_filters } from "../utils/consts";
import { Button } from "./Button/Button";

import { Typography, Flex } from "antd";

import styles from "../styles/card.module.scss";
import ProductList from "./ProductList/ProductList";
import useWindowSize from "../hooks/useWindowSize";

const { Title } = Typography;

function RecommendedProductsList() {
  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.products.products);
  const windowSize = useWindowSize()
  const isMobile = windowSize.width && windowSize.width < 660;


  useEffect(() => {
    dispatch(
      fetchRecAndPopProducts({
        ...default_filters,
        limit: 16,
      })
    );
  }, [dispatch]);

  return (
    <div className={styles.recommendedProducts_main}>
      <div className={styles.recommendedProducts_container}>
        <Flex style={{ flexDirection: `${isMobile ? "column" : "initial"}` }} justify={`${isMobile ? '' : 'space-between'}`}>
          <Title
            style={{ fontSize: "24px", fontWeight: "1000", color: "#FABC22" }}
          >
            Рекомендуем вам
          </Title>
          <Button
            appearance={"yellow"}
            style={{
              width: "140px",
              borderRadius: "10px",
              fontSize: "16px",
              fontWeight: "600",
            }}
          >
            Больше
          </Button>
        </Flex>
        <div className={styles.recommendedProducts}>
          <ProductList
            products={products}
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
        </div>
      </div>
    </div>
  );
}

export default RecommendedProductsList;
