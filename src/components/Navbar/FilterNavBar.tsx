import React, { useState } from "react";
import { Drawer, Button } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import styles from "./navbar.module.scss";
import FilterMenu from "../FilterSideBar/FilterMenu";
const FilterNavBar = ({ isFilterDrawerOpen, setFilterIsDrawerOpen }: any) => {
  return (
    <Drawer
      classNames={{ header: styles.mobile_filter_drawer }}
      bodyStyle={{ backgroundColor: "rgba(248, 248, 248, 1)" }}
      width="100%"
      placement="right"
      // onClick={() => setFilterIsDrawerOpen(false)}
      onClose={() => setFilterIsDrawerOpen(false)}
      visible={isFilterDrawerOpen}
    >
      <FilterMenu setFilterIsDrawerOpen={setFilterIsDrawerOpen} />
    </Drawer>
  );
};

export default FilterNavBar;
