import { Link } from "react-router-dom";
import { Menu } from "antd";
import {
  DashboardFilled,
  PlusSquareOutlined,
  ShopFilled,
  ShopOutlined,
  TableOutlined,
  TabletFilled,
  UserOutlined,
} from "@ant-design/icons";
import { adminRoutes } from "../routes";

export default {
  menuItems: (
    <>
      <Menu.Item key={adminRoutes.DASHBOARD} icon={<DashboardFilled />}>
        <Link to={adminRoutes.DASHBOARD}>Dashboard</Link>
      </Menu.Item>
      <Menu.Item key={adminRoutes.PRODUCT} icon={<ShopOutlined />}>
        <Link to={adminRoutes.PRODUCT}>Product</Link>
      </Menu.Item>
      <Menu.Item key={adminRoutes.PRODUCTS} icon={<ShopFilled />}>
        <Link to={adminRoutes.PRODUCTS}>Products</Link>
      </Menu.Item>

      <Menu.Item key={adminRoutes.CATEGORY} icon={<TableOutlined />}>
        <Link to={adminRoutes.CATEGORY}>Category</Link>
      </Menu.Item>

      <Menu.Item key={adminRoutes.SUB_CATEGORY} icon={<TabletFilled />}>
        <Link to={adminRoutes.SUB_CATEGORY}>Sub Category</Link>
      </Menu.Item>

      <Menu.Item key={adminRoutes.COUPON} icon={<PlusSquareOutlined />}>
        <Link to={adminRoutes.COUPON}>Coupon</Link>
      </Menu.Item>

      <Menu.Item key={adminRoutes.UPDATE_PASSWORD} icon={<UserOutlined />}>
        <Link to={adminRoutes.UPDATE_PASSWORD}>Update Password</Link>
      </Menu.Item>
    </>
  ),
};
