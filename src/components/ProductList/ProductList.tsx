import React from "react";
import { List } from "antd";
import { ProductProps } from "./Product.props";
import { ProductCard } from "../ProductCard/ProductCard";

function ProductList({ products, grid }: ProductProps) {
  return (
    <List
      size={"small"}
      grid={grid}
      loading={!products}
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
