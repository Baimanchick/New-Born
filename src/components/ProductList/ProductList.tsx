import React from "react";
import { Card, List } from "antd";
import { ProductProps } from "./Product.props";
import { ProductCard } from "../ProductCard/ProductCard";

function ProductList({ products }: ProductProps) {
  // const p = [...products, ...products, ...products];
  return (
    <List
      size={"small"}
      grid={{ column: 4, md: 2, sm: 2, lg: 3, xl: 3 }}
      dataSource={products}
      renderItem={(item) => (
        <List.Item
          style={{
            background: "transparent",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ProductCard product={item} />
        </List.Item>
      )}
    />
  );
}

export default ProductList;
