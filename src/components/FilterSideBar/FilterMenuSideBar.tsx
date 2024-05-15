import type { MenuProps } from "antd";
import { Flex, Layout, Menu, Typography } from "antd";
import PriceRangeSelector from "../PriceRangeSelector/PriceRangeSelector";
import styles from "./filterSideBar.module.scss";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { useEffect, useState } from "react";
import { fetchBrand } from "../../store/features/brand/brandSlice";
// import { BrandType } from "../";
import { fetchProducts } from "../../store/features/products/productSlice";
import { useSearchParams } from "react-router-dom";
import {
  fetchCategory,
  fetchSubcategory,
} from "../../store/features/category/categorySlice";
import { CategoryType } from "../CategoryCard/CategoryCard.props";
import { SubCategory } from "../../helpers/interfaces/category.interface";

export interface BrandI {
  brand: BrandType[];
}

export type BrandType = {
  id?: number;
  name: string;
  image: string;
};

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

const inlineStylesFlex: React.CSSProperties = {
  flexDirection: "column",
  padding: "20px",
  background: "white",
  borderRadius: 20,
};

function FilterMenuSideBar() {
  const [searchParams, setSearchParams] = useSearchParams();
  const brands = useAppSelector((state) => state.brand.brand);
  const { category, subcategories } = useAppSelector((state) => state.category);
  const [brandKey, setBrandKey] = useState("");
  const [catalogKey, setCatalogKey] = useState("");
  const dispatch = useAppDispatch();

  const items = brands.map((brand: BrandType, index) => ({
    key: brand.id?.toString() || index.toString(),
    label: brand.name,
  }));

  const categoriesAndSubs = category.map(
    (item: CategoryType, index: number) => ({
      key: item.id?.toString() || index.toString(),
      label: item.name,
      children: subcategories
        .filter((sub: SubCategory) => sub.category === item.id)
        .map((sub: SubCategory) => ({ key: sub.id, label: sub.title })),
    })
  );

  useEffect(() => {
    dispatch(fetchBrand());
    dispatch(fetchCategory());
    dispatch(fetchSubcategory());
  }, []);

  // console.log(category.map(item=> ))
  const onClick: MenuProps["onClick"] = (e) => {
    setBrandKey(e.key);
    const brand = items.find((item) => item.key == e.key);
    if (brand) {
      dispatch(fetchProducts({ brand: brand.label }));
      setSearchParams({ brand: brand.label });
    }
  };

  // console.log(categoriesAndSubs);

  const catalogHandler: MenuProps["onClick"] = (e) => {
    setCatalogKey(e.key);
    const sub: SubCategory | undefined = subcategories.find(
      (item: SubCategory) => item.id === Number(e.key)
    );
    console.log(sub);
    if (sub) {
      // @ts-ignore
      dispatch(fetchProducts({ category: sub?.title }));
      // @ts-ignore
      // setSearchParams({ category: sub.title });
    }
  };
  const [stateOpenKeys, setStateOpenKeys] = useState(["2", "23"]);

  // const onOpenChange: MenuProps["onOpenChange"] = (openKeys) => {
  //   const currentOpenKey = openKeys.find(
  //     (key) => stateOpenKeys.indexOf(key) === -1
  //   );
  //   // open
  //   if (currentOpenKey !== undefined) {
  //     const repeatIndex = openKeys
  //       .filter((key) => key !== currentOpenKey)
  //       .findIndex(
  //         (key) => categoriesAndSubs[key] === categoriesAndSubs[currentOpenKey]
  //       );
  //
  //     setStateOpenKeys(
  //       openKeys
  //         // remove repeat key
  //         .filter((_, index) => index !== repeatIndex)
  //         // remove current level all child
  //         .filter(
  //           (key) => categoriesAndSubs[key] <= categoriesAndSubs[currentOpenKey]
  //         )
  //     );
  //   } else {
  //     // close
  //     setStateOpenKeys(openKeys);
  //   }
  // };

  return (
    <Flex gap={20} vertical>
      <Flex style={inlineStylesFlex}>
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
          onClick={catalogHandler}
          style={{ width: "100%" }}
          selectedKeys={[catalogKey]}
          mode="inline"
          items={categoriesAndSubs}
          className={styles.menuCustomFilter}
        />
      </Flex>

      <Flex style={inlineStylesFlex}>
        <Title
          style={{ color: "#1B81E7", fontWeight: "1000", fontSize: "22px" }}
        >
          Цена, сом
        </Title>
        <PriceRangeSelector />
      </Flex>

      <Flex style={inlineStylesFlex}>
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
    </Flex>
  );
}

export default FilterMenuSideBar;
