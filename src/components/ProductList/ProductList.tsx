import React from "react";
import { Card, List } from "antd";
import { ProductProps } from "./Product.props";
import { ProductCard } from "../ProductCard/ProductCard";

function ProductList({ products, grid }: ProductProps) {
  // const p = [...products, ...products, ...products];
  return (
    <List
      size={"small"}
      grid={grid}
      dataSource={products}
      renderItem={(item) => (
        <List.Item
          style={{
            background: "transparent",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: '10px',
            padding: 0,
          }}
        >
          <ProductCard product={item} />
        </List.Item>
      )}
    />
  );
}

export default React.memo(ProductList);
