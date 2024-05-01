import { useState } from "react";
import { MenuItem } from "./Navbar.props";
import NavbarMenu from "./NavbarMenu";
import MobileNavbar from "./MobileNavbar";
import SearchModalMobile from "./SearchModalMobile";
import useWindowSize from "../../hooks/useWindowSize";

const menuItems: MenuItem[] = [
  { label: "Главная", link: "/" },
  { label: "Акции", link: "/stock" },
  { label: "Все Бренды", link: "brands" },
  { label: "Войти", link: "/register" },
];

function Navbar() {
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [isFilterDrawerOpen, setFilterIsDrawerOpen] = useState<boolean>(false);
  const [isSearchModalVisible, setIsSearchModalVisible] =
    useState<boolean>(false);
  const windowSize = useWindowSize();
  const isMobile = windowSize.width && windowSize.width < 660;

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
