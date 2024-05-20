import { useRef, useState } from "react";
import arrowDown from "../../assets/svgs/navbar/blueArrowDown.svg";
import arrowDownBlack from "../../assets/svgs/navbar/blackArrowDown.svg";
import arrowUpBlack from "../../assets/svgs/navbar/blackArrowUp.svg";
import styles from "./navbar.module.scss";
import PriceRangeSelector from "../PriceRangeSelector/PriceRangeSelector";
import { Button } from "../Button/Button";
import { Drawer, Flex, Menu } from "antd";

function MobileNavbarFilterSideBar({
  isFilterDrawerOpen,
  setFilterIsDrawerOpen,
}: {
  isFilterDrawerOpen: boolean;
  setFilterIsDrawerOpen: (isOpen: boolean) => void;
}) {
  const [isOpenDropdown, setIsOpenDropdown] = useState<{
    [key: string]: boolean;
  }>({});
  const [isOpenChildDropdown, setIsOpenChildDropdown] = useState<{
    [key: string]: boolean;
  }>({});
  const [activeItem, setActiveItem] = useState("");

  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = (filterId: string) => {
    setIsOpenDropdown((prevState) => ({
      ...prevState,
      [filterId]: !prevState[filterId],
    }));
  };

  const toggleChildDropdown = (filterId: string) => {
    setIsOpenChildDropdown((prevState) => ({
      ...prevState,
      [filterId]: !prevState[filterId],
    }));
  };

  const handleItemClick = (item: string) => {
    setActiveItem(item);
  };

  return (
    <div>
      <Drawer
        classNames={{ header: styles.mobile_filter_drawer }}
        bodyStyle={{ backgroundColor: "rgba(248, 248, 248, 1)" }}
        width="100%"
        open={isFilterDrawerOpen}
        onClose={() => setFilterIsDrawerOpen(false)}
      >
        <Menu
          theme={"light"}
          style={{ width: "100%" }}
          mode="inline"
          className={styles.menuCustomFilter}
        />
      </Drawer>
    </div>
  );
}

export default MobileNavbarFilterSideBar;
