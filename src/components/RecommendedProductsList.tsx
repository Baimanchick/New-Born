import styles from "../styles/card.module.scss";
import { ProductCard } from "./ProductCard/ProductCard";
import { List, Typography } from "antd";
import { useEffect } from "react";
import { fetchRecAndPopProducts } from "../store/features/products/productSlice";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { default_filters } from "../utils/consts";
import { Product } from "../helpers/interfaces/product.interface";

const { Title } = Typography;

function RecommendedProductsList() {
  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.products.products);

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
        <Title style={{ fontSize: "24px", fontWeight: "1000", color: "#fff" }}>
          Рекомендуем вам
        </Title>
        <div className={styles.recommendedProducts}>
          <List
            grid={{ gutter: 16, column: 5 }}
            dataSource={products}
            renderItem={(product: Product, index: number) => (
              <List.Item style={{ backgroundColor: 'initial' }}>
                <ProductCard key={index} product={product} />
              </List.Item>
            )}
          />
        </div>
      </div>
    </div>
  );
}

export default RecommendedProductsList;
