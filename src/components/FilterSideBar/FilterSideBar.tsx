import React, { useEffect, useMemo, useState } from "react";
import { Flex, Layout, List, theme } from "antd";
import { ProductCard } from "../ProductCard/ProductCard";
import FilterMenuSideBar from "./FilterMenuSideBar";
import { fetchProducts } from "../../store/features/products/productSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import useWindowSize from "../../hooks/useWindowSize";
import Loading from "../Loader/Loading";
import ProductList from "../ProductList/ProductList";
import { useSearchParams } from "react-router-dom";

const { Content, Sider } = Layout;

function FilterSideBar() {
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const { products, loading } = useAppSelector((states) => states.products);
  const windowSize = useWindowSize();
  const isTablet = windowSize.width && windowSize.width < 1400;
  const filters = useMemo(
    () => Object.fromEntries(searchParams.entries()),
    [searchParams]
  );

  useEffect(() => {
    console.log(filters);
    dispatch(
      fetchProducts({
        ...filters,
        limit: 16,
        offset: 0,
      })
    );
  }, [searchParams]);

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
        {loading ? (
          <Loading />
        ) : (
          <ProductList
            products={products}
            grid={{ column: 4, md: 2, sm: 2, lg: 4, xl: 4, xs: 2 }}
          />
        )}
      </Content>
    </Layout>
  );
}

export default FilterSideBar;
