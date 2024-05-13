import type { MenuProps } from "antd";
import { Flex, Layout, Menu, Typography, theme } from "antd";
import PriceRangeSelector from "../PriceRangeSelector/PriceRangeSelector";
import styles from "./filterSideBar.module.scss";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { useEffect, useState } from "react";
import { fetchBrand } from "../../store/features/brand/brandSlice";
import { BrandType } from "../../helpers/interfaces/BrandCard.props";
import { fetchProducts } from "../../store/features/products/productSlice";

type MenuItem = Required<MenuProps>["items"][number];

const { Sider } = Layout;
const { Title } = Typography;

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group"
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const item1: MenuProps["items"] = [
  getItem("Искусственное вскармливание", "drop1", null, [
    getItem("Пюре овощные", ""),
  ]),
];

function FilterMenuSideBar() {
  const brands = useAppSelector((state) => state.brand.brand);
  const dispatch = useAppDispatch();
  const items = brands.map((brand: BrandType, index) => ({
    key: brand.id?.toString() || index.toString(),
    label: brand.name,
  }));
  const [brandKey, setBrandKey] = useState("");

  useEffect(() => {
    dispatch(fetchBrand());
  }, []);
  const onClick: MenuProps["onClick"] = (e) => {
    setBrandKey(e.key);
    const brand = items.find((item) => item.key == e.key);
    if (brand) {
      dispatch(fetchProducts({ brand: brand.label }));
    }
  };
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <>
      <Flex style={{ flexDirection: "column", padding: "20px" }}>
        <Title
          style={{
            color: "#1B81E7",
            fontWeight: "1000",
            fontSize: "22px",
            cursor: "pointer",
          }}
        >
          Каталог
        </Title>
        <Menu
          theme={"light"}
          onClick={onClick}
          style={{ width: "100%" }}
          defaultOpenKeys={["drop1"]}
          mode="inline"
          items={item1}
          className={styles.menuCustomFilter}
        />
      </Flex>

      <Menu
        theme={"light"}
        mode="inline"
        style={{ height: "100%", borderRadius: 20 }}
      >
        <Flex style={{ flexDirection: "column", padding: "20px" }}>
          <Title
            style={{ color: "#1B81E7", fontWeight: "1000", fontSize: "22px" }}
          >
            Цена, сом
          </Title>
          <PriceRangeSelector />
        </Flex>
      </Menu>

      <Flex style={{ flexDirection: "column", padding: "20px" }}>
        <Title
          style={{
            color: "#1B81E7",
            fontWeight: "1000",
            fontSize: "22px",
            cursor: "pointer",
          }}
        >
          Бренд
        </Title>
        <Menu
          onClick={onClick}
          theme={"light"}
          style={{ width: "100%" }}
          selectedKeys={[brandKey]}
          mode="inline"
          items={items}
        />
      </Flex>
    </>
  );
}

export default FilterMenuSideBar;
