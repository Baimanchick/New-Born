import React, { useState } from "react";
import { AutoComplete, Badge, Button, Flex, Input, SelectProps } from "antd";
import { useNavigate } from "react-router-dom";
import { MenuItem, NavbarMenuProps } from "./Navbar.props";
import logo from "../../assets/svgs/navbar/logo.svg";
import filter from "../../assets/svgs/navbar/filter.svg";
import favourite from "../../assets/svgs/navbar/favourites.svg";
import cart from "../../assets/svgs/navbar/cart.svg";
import phone from "../../assets/svgs/navbar/phone.svg";
import styles from "./navbar.module.scss";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { Product } from "../../helpers/interfaces/product.interface";
import openNotification from "../Notification/Notification";
import { searchProducts } from "../../store/features/products/productSlice";
import { store } from "../../store/store";

const NavbarMenu: React.FC<NavbarMenuProps> = ({ menuItems }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isOnFilterPage = window.location.pathname === "/filter";
  const [options, setOptions] = useState<SelectProps<object>["options"]>([]);
  const [activeMenuItem, setActiveMenuItem] = useState<string>();
  const [searchValue, setSearchValue] = useState<string>("");
  const cartItems = useAppSelector((store) => store.carts.carts);

  const handleSearch = async (value: string) => {
    setSearchValue(value);
    if (value.trim() !== "") {
      const resultAction = await dispatch(searchProducts(value.trim()));
      if (searchProducts.fulfilled.match(resultAction)) {
        const searchResults = resultAction.payload as unknown as Product[];
        setOptions(
          searchResults.map((product) => ({
            value: product.name,
            label: (
              <div
                key={product.id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
                onClick={() => {
                  navigate(`/detail/${product.id}`);
                }}
              >
                <span style={{ cursor: "pointer" }}>
                  <strong>Найдено:</strong> {product.name}
                </span>
              </div>
            ),
          }))
        );
      } else {
        setOptions([]);
      }
    } else {
      setOptions([]);
    }
  };
  const onSelect = (value: string) => {
    // setSearchValue("");
    console.log(value);
  };
  const handleFilterButtonClick = () => {
    if (isOnFilterPage) {
      openNotification(
        "warning",
        "Предупреждение",
        "Вы уже на странице фильтров",
        2
      );
    } else {
      navigate("/filter");
      setActiveMenuItem("");
    }
  };

  return (
    <div className={`${styles.navbar}`}>
      <div className={styles.nav_up}>
        <div className={styles.phone}>
          <img src={phone} alt="Телефон" />
          <span>
            Горячая линия <a href="tel:+01112352566">+01 112 352 566</a>
          </span>
        </div>
        <ul className={styles.navbar_navigation}>
          {menuItems.map((item: MenuItem, index: number) => (
            <li
              className={`${styles.menuItem} ${
                item.label === activeMenuItem ? styles.active : ""
              }`}
              onClick={() => {
                setActiveMenuItem(item.label);
                navigate(item.link);
                if (item.action) {
                  item.action();
                }
              }}
              key={index}
              style={{ fontSize: 12, cursor: "pointer", fontWeight: 400 }}
            >
              {item.label}
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.nav_down}>
        <div className={styles.logo}>
          <img
            onClick={() => {
              setActiveMenuItem("Главная");
              navigate("/");
            }}
            style={{ cursor: "pointer" }}
            src={logo}
            alt="Логотип"
          />
        </div>
        <div className={styles.form}>
          <Button
            icon={
              <img
                src={filter}
                style={{ width: "24px", height: "24px" }}
                alt={"filter"}
              />
            }
            className={styles.btn}
            type="default"
            onClick={handleFilterButtonClick}
          >
            Фильтр
          </Button>
          <Flex
            className={styles.searchNavbarMenu}
            style={{ flexDirection: "column" }}
          >
            <AutoComplete
              popupMatchSelectWidth={500}
              className={styles.dropdownCustomAntd}
              style={{ width: 810 }}
              options={options}
              size="large"
              onSelect={onSelect}
              onSearch={handleSearch}
            >
              <Input.Search
                style={{ height: "50px" }}
                placeholder="Я ищу…"
                enterButton
                variant={"borderless"}
              />
            </AutoComplete>
          </Flex>
        </div>
        <div className={styles.icon}>
          <img
            src={favourite}
            onClick={() => {
              setActiveMenuItem("");
              navigate("/favorite");
            }}
            className={styles.icon__item}
            alt="Избранное"
          />
          <Badge count={cartItems.length} color={"#FABC22"}>
            <img
              src={cart}
              onClick={() => {
                setActiveMenuItem("");
                navigate("/cart");
              }}
              className={styles.icon__item}
              alt="Корзина"
            />
          </Badge>
        </div>
      </div>
    </div>
  );
};

export default NavbarMenu;
