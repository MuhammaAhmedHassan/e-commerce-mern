import React, { useState, useEffect } from "react";
import "./Navbar.less";
import { useDispatch, useSelector } from "react-redux";
import { Menu } from "antd";
import {
  AppstoreAddOutlined,
  SettingOutlined,
  UserOutlined,
  UserAddOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { useLocation } from "react-router-dom";
import { MenuInfo } from "rc-menu/lib/interface";
import { Link } from "react-router-dom";
import {
  adminRoutes,
  onBoardingRoutes,
  userRoutes,
} from "../../../const/routes";
import { RootState } from "../../../const/types";
import { logoutUser } from "../../../redux/actions/user.action";
import { AppLocalStorage } from "../../../utils/AppLocalStorage";

const { SubMenu, Item } = Menu;

function Navbar() {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const getToken = () => AppLocalStorage.getItem("USER_AUTH_TOKEN");
  const { username, role } = useSelector(({ user }: RootState) => ({
    username: user.email?.length ? user.email.split("@")[0] : null,
    role: user.role,
  }));

  const [current, setCurrent] = useState(pathname);

  useEffect(() => setCurrent(pathname), [pathname]);

  const handleClick = (menuInfo: MenuInfo) => {
    const { key } = menuInfo;
    if (key === "logout") {
      dispatch(logoutUser());
    }
    // setCurrent(key.toString());
  };

  return (
    <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
      <Item key="home" icon={<AppstoreAddOutlined />}>
        <Link to="/">Home</Link>
      </Item>

      {!getToken() ? (
        <>
          <Item
            key={onBoardingRoutes.SIGN_UP}
            icon={<UserAddOutlined />}
            className="float-right"
          >
            <Link to={onBoardingRoutes.SIGN_UP}>Register</Link>
          </Item>
          <Item
            key={onBoardingRoutes.LOGIN}
            icon={<UserOutlined />}
            className="float-right"
          >
            <Link to={onBoardingRoutes.LOGIN}>Login</Link>
          </Item>
        </>
      ) : (
        <SubMenu
          key="SubMenu"
          icon={<SettingOutlined />}
          title={username ?? "Username"}
          className="float-right"
        >
          {role === "admin" ? (
            <Item key="option1">
              <Link to={userRoutes.HISTORY}>Dashboard</Link>
            </Item>
          ) : (
            <Item key="option1">
              <Link to={adminRoutes.DASHBOARD}>Dashboard</Link>
            </Item>
          )}
          <Item key="logout" icon={<LogoutOutlined />}>
            Logout
          </Item>
        </SubMenu>
      )}
    </Menu>
  );
}

export default Navbar;
