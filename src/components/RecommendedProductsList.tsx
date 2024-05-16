import styles from "../styles/card.module.scss";
import { ProductCard } from "./ProductCard/ProductCard";
import { List, Typography } from "antd";
import React, { useEffect } from "react";
import { fetchRecAndPopProducts } from "../store/features/products/productSlice";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { default_filters } from "../utils/consts";
import { Product } from "../helpers/interfaces/product.interface";
import ProductList from "./ProductList/ProductList";

const { Title } = Typography;

function RecommendedProductsList() {
  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.products.products);
  const carts = useAppSelector((state) => state.carts.carts);

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
        <Title
          style={{ fontSize: "24px", fontWeight: "1000", color: "#FABC22" }}
        >
          Рекомендуем вам
        </Title>
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
