import { ProductCard } from "./ProductCard/ProductCard";
import styles from "../styles/card.module.scss";
import { Button } from "./Button/Button";
import { List, Typography } from "antd";
import React, { useEffect } from "react";
import { fetchRecAndPopProducts } from "../store/features/products/productSlice";
import { default_filters } from "../utils/consts";
import { Product } from "../helpers/interfaces/product.interface";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import ProductList from "./ProductList/ProductList";

const { Title } = Typography;

function PopularProductsList() {
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
    <div className={styles.popularProducts_main}>
      <div className={styles.popularProducts_container}>
        <div className={styles.popularProducts_section__title}>
          <Title
            style={{ fontSize: "24px", color: "#778692", fontWeight: "1000" }}
          >
            Самые популярные
          </Title>
          <Button
            appearance="yellow"
            style={{
              width: "140px",
              borderRadius: "10px",
              fontSize: "16px",
              fontWeight: "600",
            }}
          >
            Больше
          </Button>
        </div>
        <div className={styles.popularProducts}>
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

export default PopularProductsList;
