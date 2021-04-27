import { Link } from "react-router-dom";
import { Menu } from "antd";
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
} from "@ant-design/icons";

const { SubMenu } = Menu;

export default {
  subMenu1: (
    <SubMenu key="sub1" icon={<MailOutlined />} title="Navigation One">
      <Menu.Item key="1">
        <Link to={"/"}>Option 1</Link>
      </Menu.Item>
      <Menu.Item key="2">
        <Link to={"/"}>Option 2</Link>
      </Menu.Item>
      <Menu.Item key="3">
        <Link to={"/"}>Option 3</Link>
      </Menu.Item>
      <Menu.Item key="4">
        <Link to={"/"}>Option 4</Link>
      </Menu.Item>
    </SubMenu>
  ),
  subMenu2: (
    <SubMenu key="sub2" icon={<AppstoreOutlined />} title="Navigation Two">
      <Menu.Item key="5">Option 5</Menu.Item>
      <Menu.Item key="6">Option 6</Menu.Item>
      <SubMenu key="sub3" title="Submenu">
        <Menu.Item key="7">Option 7</Menu.Item>
        <Menu.Item key="8">Option 8</Menu.Item>
      </SubMenu>
    </SubMenu>
  ),
  subMenu3: (
    <SubMenu key="sub4" icon={<SettingOutlined />} title="Navigation Three">
      <Menu.Item key="9">Option 9</Menu.Item>
      <Menu.Item key="10">Option 10</Menu.Item>
      <Menu.Item key="11">Option 11</Menu.Item>
      <Menu.Item key="12">Option 12</Menu.Item>
    </SubMenu>
  ),
};
