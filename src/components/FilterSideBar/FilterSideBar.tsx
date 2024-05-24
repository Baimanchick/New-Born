import { useEffect, useMemo } from "react";
import { Layout } from "antd";
import FilterMenu from "./FilterMenu";
import { fetchProducts } from "../../store/features/products/productSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import Loading from "../Loader/Loading";
import ProductList from "../ProductList/ProductList";
import { useSearchParams } from "react-router-dom";
import styles from "./filterSideBar.module.scss";

const { Content, Sider } = Layout;

function FilterSideBar() {
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const { products, loading } = useAppSelector((states) => states.products);
  const filters = useMemo(
    () => Object.fromEntries(searchParams.entries()),
    [searchParams]
  );

  useEffect(() => {
    dispatch(
      fetchProducts({
        ...filters,
        limit: 16,
        offset: 0,
      })
    );
  }, [searchParams, filters]);

  return (
    <>
      <Layout className={styles.layoutFilter}>
        <Sider
          className={styles.siderFilter}
          width={400}
          theme={"light"}
          style={{ background: "transparent" }}
        >
          <FilterMenu />
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
    </>
  );
}

export default FilterSideBar;
