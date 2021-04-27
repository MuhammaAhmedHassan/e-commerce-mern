import React, { useState, useEffect } from "react";
import "./Sidebar.less";
import { useSelector } from "react-redux";
import { Menu, Slider } from "antd";
import { RouteChildrenProps } from "react-router-dom";
import { categoriesMenu, adminMenu } from "../../../const/SidebarMenu";
import { userRoutes } from "../../../const/routes";
import { RootState } from "../../../const/types";
import Spinner from "../Spinner";

const { SubMenu } = Menu;

// submenu keys of first level
const rootSubmenuKeys = ["sub1", "sub2", "sub4"];

const marks = {
  0: "$0",
  100: {
    style: {
      color: "#f50",
    },
    label: <strong>$100</strong>,
  },
};

function Sidebar(props: RouteChildrenProps) {
  const {
    location: { pathname },
  } = props;
  const { role } = useSelector(({ user: { role } }: RootState) => ({ role }));

  const [openKeys, setOpenKeys] = useState<string[]>(["sub1"]);
  const [current, setCurrent] = useState(pathname);

  useEffect(() => {
    setCurrent(pathname);
  }, [pathname]);

  const onOpenChange = (keys: React.Key[]) => {
    const latestOpenKey = keys.find(
      (key) => openKeys.indexOf(key.toString()) === -1
    );
    if (rootSubmenuKeys.indexOf(latestOpenKey?.toString()!) === -1) {
      setOpenKeys(keys as string[]);
    } else {
      setOpenKeys((latestOpenKey ? [latestOpenKey] : []) as string[]);
    }
  };

  let sidebarMarkup: JSX.Element | null = null;

  if (!role) sidebarMarkup = <Spinner />;
  else if (role === "admin") {
    sidebarMarkup = adminMenu.menuItems;
  } else {
    <>
      <Slider
        range
        marks={marks}
        className="price-slider"
        defaultValue={[26, 37]}
      />
      {categoriesMenu.subMenu1}
      {categoriesMenu.subMenu2}
      {categoriesMenu.subMenu3}
    </>;
  }

  return (
    <Menu
      mode="inline"
      openKeys={openKeys}
      onOpenChange={onOpenChange}
      style={{ height: "100%" }}
      selectedKeys={[current]}
    >
      {sidebarMarkup}
    </Menu>
  );
}

export default Sidebar;
