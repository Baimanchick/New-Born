import { useMemo, useState } from "react";
import { MenuItem } from "./Navbar.props";
import NavbarMenu from "./NavbarMenu";
import MobileNavbar from "./MobileNavbar";
import SearchModalMobile from "./SearchModalMobile";
import useWindowSize from "../../hooks/useWindowSize";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { setLogout } from "../../store/features/auth/authSlice";

function Navbar() {
  const dispatch = useAppDispatch();
  const isAuth = useAppSelector((store) => store.auth.user !== null);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [isFilterDrawerOpen, setFilterIsDrawerOpen] = useState<boolean>(false);
  const [isSearchModalVisible, setIsSearchModalVisible] =
    useState<boolean>(false);
  const windowSize = useWindowSize();
  const isMobile = windowSize.width && windowSize.width < 660;

  const menuItems: MenuItem[] = useMemo(() => {
    const items: MenuItem[] = [
      { label: "Главная", link: "/" },
      { label: "Акции", link: "/stock" },
      { label: "Все Бренды", link: "/brands" },
    ];

    if (isAuth) {
      items.push({ label: "Личный кабинет", link: "/profile" });
      items.push({
        label: "Выйти",
        link: "",
        action: () => dispatch(setLogout()),
      });
    } else {
      items.push({ label: "Войти", link: "/register" });
    }

    return items;
  }, [isAuth]);

  const openSearchModal = () => {
    setIsSearchModalVisible(true);
  };

  const closeSearchModal = () => {
    setIsSearchModalVisible(false);
  };

  return (
    <div className="container">
      {isMobile ? (
        <>
          <MobileNavbar
            openSearchModal={openSearchModal}
            setIsDrawerOpen={setIsDrawerOpen}
            menuItems={menuItems}
            isDrawerOpen={isDrawerOpen}
            isFilterDrawerOpen={isFilterDrawerOpen}
            setFilterIsDrawerOpen={setFilterIsDrawerOpen}
          />
          <SearchModalMobile
            isVisible={isSearchModalVisible}
            onClose={closeSearchModal}
          />
        </>
      ) : (
        <NavbarMenu menuItems={menuItems} openSearchModal={openSearchModal} />
      )}
    </div>
  );
}

export default Navbar;
