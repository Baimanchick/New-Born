import { ProductCard } from "./ProductCard/ProductCard";
import styles from "../styles/card.module.scss";
import { Col, Row, Typography } from "antd";
import { Button } from "./Button/Button";
import { useEffect } from "react";
import { fetchProducts } from "../store/features/products/productSlice";
import { Product } from "../helpers/interfaces/product.interface";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";

const { Title } = Typography;

function NewProductsList() {
  // TODO это на время пока не точно
  const dispatch = useAppDispatch();
  const products = useAppSelector((states) => states.products.products);

  useEffect(() => {
    dispatch(
      fetchProducts({
        limit: 16,
        offset: 1,
      })
    );
  }, [dispatch]);
  return (
    <div className={styles.newProducts_main}>
      <div className={styles.newProducts_container}>
        <div className={styles.newProducts_section__title}>
          <Title
            style={{ fontSize: "24px", color: "#778692", fontWeight: "1000" }}
          >
            Новые товары
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
        </div>
        <div className={styles.newProducts}>
          {products.map((product: Product, index: number) => (
            <ProductCard key={index} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default NewProductsList;
