import { Badge, Button, Drawer } from "antd";
import { MenuItem, MobileNavbarProps } from "./Navbar.props";
import styles from "./navbar.module.scss";
import phoneWhite from "../../assets/svgs/navbar/phoneWhite.svg";
import logo from "../../assets/svgs/navbar/logo.svg";
import cart from "../../assets/svgs/navbar/cart.svg";
import favourite from "../../assets/svgs/navbar/favourites.svg";
import filter from "../../assets/svgs/navbar/filter.svg";
import burger from "../../assets/svgs/navbar/burgerMenu.svg";
import "../../styles/antd.scss";
import FilterNavBar from "./FilterNavBar";
import { useNavigate } from "react-router-dom";
import React from "react";
import { useAppSelector } from "../../hooks/hooks";

function MobileNavbar({
  setIsDrawerOpen,
  menuItems,
  isDrawerOpen,
  openSearchModal,
  isFilterDrawerOpen,
  setFilterIsDrawerOpen,
}: MobileNavbarProps) {
  const isOnFilterPage = window.location.pathname === "/filter";
  const navigate = useNavigate();
  const cartItems = useAppSelector((store) => store.carts.carts);

  return (
    <div className={styles.navbar_mobile}>
      <div className={styles.nav_up__mobile}>
        <div className={styles.logo_mobile}>
          <img
            src={logo}
            alt={"logo"}
            onClick={() => navigate("/")}
            className={styles.logo_mobile__image}
          />
        </div>
        <div className={styles.icon_mobile}>
          <img
            src={favourite}
            onClick={() => navigate("/favorite")}
            className={styles.icon_mobile__item}
            alt="Избранное"
          />
          <Badge count={cartItems.length} color={"#FABC22"}>
            <img
              src={cart}
              onClick={() => navigate("/cart")}
              className={styles.icon_mobile__item}
              alt="Корзина"
            />
          </Badge>
          <img
            src={burger}
            className={styles.icon_mobile__item}
            alt="Меню"
            onClick={() => setIsDrawerOpen && setIsDrawerOpen(true)}
          />
        </div>
      </div>
      <div className={styles.nav_down__mobile}>
        <div className={styles.form_mobile}>
          <Button
            className={styles.search}
            type="default"
            onClick={openSearchModal}
          >
            Я ищу…
          </Button>
          <Button
            className={styles.btn}
            type="default"
            icon={
              <img
                src={filter}
                style={{ width: "24px", height: "24px" }}
                alt={"filter"}
              />
            }
            onClick={
              isOnFilterPage
                ? () => setFilterIsDrawerOpen && setFilterIsDrawerOpen(true)
                : () => navigate("/filter")
            }
          >
            Фильтр
          </Button>
        </div>
      </div>
      <Drawer
        closable={true}
        classNames={{ header: styles.navbar_mobile__drawer }}
        bodyStyle={{ backgroundColor: "rgba(27, 129, 231, 1)" }}
        width={"100%"}
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        placement="right"
      >
        <ul className={styles.sideBar_navigation}>
          {menuItems.map((item: MenuItem, index: number) => (
            <li
              onClick={() => {
                setIsDrawerOpen(false);
                navigate(item.link);
              }}
              key={index}
            >
              {item.label}
            </li>
          ))}
        </ul>
        <div className={styles.navbar_mobile__footer}>
          <img src={phoneWhite} alt={"phone"} />
          <div>
            Горячая линия <a href="#">+01 112 352 566</a>
          </div>
        </div>
      </Drawer>
      <FilterNavBar
        isFilterDrawerOpen={isFilterDrawerOpen}
        setFilterIsDrawerOpen={setFilterIsDrawerOpen}
      />
    </div>
  );
}

export default MobileNavbar;
