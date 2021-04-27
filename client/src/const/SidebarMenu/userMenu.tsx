import { Link } from "react-router-dom";
import { Menu } from "antd";
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
  ShopFilled,
  ShopOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { userRoutes } from "../routes";

export default {
  menuItems: (
    <>
      <Menu.Item key={userRoutes.HISTORY} icon={<ShopOutlined />}>
        <Link to={userRoutes.HISTORY}>Product History</Link>
      </Menu.Item>
      <Menu.Item key={userRoutes.UPDATE_PASSWORD} icon={<UserOutlined />}>
        <Link to={userRoutes.UPDATE_PASSWORD}>Update Password</Link>
      </Menu.Item>
      <Menu.Item key={userRoutes.WISHLIST} icon={<ShopFilled />}>
        <Link to={userRoutes.WISHLIST}>Wishlist</Link>
      </Menu.Item>
    </>
  ),
};
