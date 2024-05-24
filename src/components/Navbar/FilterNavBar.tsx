import { Drawer } from "antd";
import styles from "./navbar.module.scss";
import FilterMenu from "../FilterSideBar/FilterMenu";
const FilterNavBar = ({ isFilterDrawerOpen, setFilterIsDrawerOpen }: any) => {
  return (
    <Drawer
      classNames={{ header: styles.mobile_filter_drawer }}
      bodyStyle={{ backgroundColor: "rgba(248, 248, 248, 1)" }}
      width="100%"
      placement="right"
      onClose={() => setFilterIsDrawerOpen(false)}
      visible={isFilterDrawerOpen}
    >
      <FilterMenu setFilterIsDrawerOpen={setFilterIsDrawerOpen} />
    </Drawer>
  );
};

export default FilterNavBar;
