import React, { useEffect, useState } from "react";
import { Flex, Layout, List, theme } from "antd";
import { ProductCard } from "../ProductCard/ProductCard";
import FilterMenuSideBar from "./FilterMenuSideBar";
import { fetchProducts } from "../../store/features/products/productSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { Product } from "../../helpers/interfaces/product.interface";
import useWindowSize from "../../hooks/useWindowSize";
import Loading from "../Loader/Loading";
import ProductList from "../ProductList/ProductList";
import { useSearchParams } from "react-router-dom";

const { Content, Sider } = Layout;

function FilterSideBar() {
  const dispatch = useAppDispatch();
  const products = useAppSelector((states) => states.products.products);
  const windowSize = useWindowSize();
  const isTablet = windowSize.width && windowSize.width < 1400;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(
      fetchProducts({
        limit: 16,
        offset: 0,
      })
    )
      .then(() => setLoading(false))
      .catch(() => setLoading(false));
  }, [dispatch]);

  if (loading) {
    return <Loading />;
  }

  return (
    <Layout
      style={{
        margin: "20px auto",
        maxWidth: "1400px",
      }}
    >
      <Sider
        width={isTablet ? 300 : 400}
        theme={"light"}
        style={{ background: "transparent" }}
      >
        <FilterMenuSideBar />
      </Sider>
      <Content>
        <ProductList products={products} />
      </Content>
    </Layout>
  );
}

export default FilterSideBar;
