import { ProductCard } from "./ProductCard/ProductCard";
import styles from "../styles/card.module.scss";
import { List, Typography } from "antd";
import { Button } from "./Button/Button";
import { useEffect } from "react";
import { Product } from "../helpers/interfaces/product.interface";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { fetchNewProducts } from "../store/features/products/productSlice";
import { default_filters } from "../utils/consts";


const { Title } = Typography;

function NewProductsList() {
  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.products.products);
  const carts = useAppSelector((state) => state.carts.carts)

  useEffect(() => {
    dispatch(
      fetchNewProducts({
        ...default_filters,
        limit: 16,
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
          <List
            grid={{
              gutter: 16,
              xs: 2,
              sm: 3,
              md: 4,
              lg: 4,
              xl: 6,
              xxl: 6,
            }}
            dataSource={products}
            renderItem={(product: Product, index: number) => (
              <List.Item style={{ backgroundColor: 'initial' }}>
                <ProductCard carts={carts} key={index} product={product} />
              </List.Item>
            )}
          />
        </div>
      </div>
    </div>
  );
}

export default NewProductsList;
