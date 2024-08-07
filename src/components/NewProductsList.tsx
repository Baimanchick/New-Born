import styles from "../styles/card.module.scss";
import { Typography } from "antd";
import { Button } from "./Button/Button";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { fetchNewProducts } from "../store/features/products/productSlice";
import { default_filters } from "../utils/consts";
import ProductList from "./ProductList/ProductList";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

function NewProductsList() {
  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.products.newProducts);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(
      fetchNewProducts({
        ...default_filters,
        limit: 6,
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
            onClick={() => navigate('/filter')}
          >
            Больше
          </Button>
        </div>
        <div className={styles.newProducts}>
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

export default NewProductsList;
