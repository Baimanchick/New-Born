import { useEffect, useState } from "react";
import { Flex, Layout, List } from "antd";
import { ProductCard } from "../ProductCard/ProductCard";
import FilterMenuSideBar from "./FilterMenuSideBar";
import { fetchProducts } from "../../store/features/products/productSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { Product } from "../../helpers/interfaces/product.interface";
import useWindowSize from "../../hooks/useWindowSize";
import Loading from "../Loader/Loading";

const { Content } = Layout;

function FilterSideBar() {
  const dispatch = useAppDispatch();
  const products = useAppSelector((states) => states.products.products);
  const windowSize = useWindowSize();
  const isMobile = windowSize.width && windowSize.width < 660;
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    dispatch(
      fetchProducts({
        limit: 16,
        offset: 0,
      })
    ).then(() => setLoading(false)).catch(() => setLoading(false));
  }, [dispatch]);

  if (loading) {
    return <Loading />
  }

  return (
    <Layout style={{ margin: "20px 0px 20px 0px" }}>
      <Content
        style={{
          display: "flex",
          gap: "20px",
          maxWidth: "1700px",
          margin: "40px auto",
        }}
      >
        <Layout
          style={{
            padding: "0px",
            background: "initial",
            display: `${isMobile ? "none" : "flex"}`,
            flexDirection: "column",
            rowGap: "20px",
          }}
        >
          <FilterMenuSideBar />
        </Layout>
        <Content>
          <Flex style={{ gap: 20 }} wrap={"wrap"}>
            {[1, 2, 3, 4, 5, 6, 7, 8,].map((indec: number) => (
              products.map((product: Product, index: number) => (
                <ProductCard key={index} product={product} />
              ))
            ))}

          </Flex>
        </Content>
      </Content>
    </Layout>
  );
}

export default FilterSideBar;
