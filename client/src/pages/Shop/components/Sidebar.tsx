import { useState, useEffect } from "react";
import "../Shop.less";
import { RouteChildrenProps } from "react-router-dom";
import { Menu, Slider, Typography, Checkbox } from "antd";
import {
  AppstoreOutlined,
  DollarOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import qs from "querystring";
import { useSelector, useDispatch } from "react-redux";
import { MenuInfo } from "rc-menu/lib/interface";
import { baseRoutes } from "../../../const/routes";
import { RootState } from "../../../const/types";
import { fetchCategories } from "../../../redux/actions/category.action";
import { CheckboxValueType } from "antd/lib/checkbox/Group";
import { makeUrlForShopPage } from "../../../utils/UtilityFunc";

// submenu keys of first level
const rootSubmenuKeys = ["sub1", "sub2", "sub4"];

const marks = {
  0: "$0",
  10000: {
    style: {
      color: "#f50",
    },
    label: <strong>$10000</strong>,
  },
};

const { SubMenu } = Menu;
const { Title } = Typography;

export function Sidebar(props: RouteChildrenProps) {
  const { location, history } = props;
  const { search } = location;
  const { query, min, max, categoryIds } = qs.parse(search.split("?").pop()!);
  const dispatch = useDispatch();

  const [catsIds, setCatsIds] = useState(categoryIds as string);

  const { loading, categories } = useSelector(
    ({ product, category }: RootState) => ({
      loading: product.loading,
      categories: category.categories,
    })
  );

  useEffect(() => {
    if (!categories || !Object.keys(categories).length) {
      dispatch(fetchCategories());
    }
    return () => {};
  }, []);

  const handlePriceSliderChange = ([min, max]: [number, number]) => {
    const minVal = min.toString() as string | string[];
    const maxVal = max.toString() as string | string[];

    history.push({
      search: makeUrlForShopPage({
        query,
        min: minVal,
        max: maxVal,
        categoryIds,
      }),
    });
  };

  const handleClick = (e: MenuInfo) => {
    console.log("click ", e);
  };

  const handleCategoriesSelect = (_categoryIds: CheckboxValueType[]) => {
    setCatsIds(_categoryIds.toString());

    history.push({
      search: makeUrlForShopPage({
        query,
        min,
        max,
        categoryIds: _categoryIds as string[] | string,
      }),
    });
  };

  return (
    <Menu
      onClick={(e) => handleClick(e)}
      style={{ width: 256, height: 100 + "%" }}
      defaultSelectedKeys={["1"]}
      defaultOpenKeys={["sub1", "sub2"]}
      mode="inline"
    >
      <SubMenu key="sub1" icon={<DollarOutlined />} title="Price">
        <Menu.Item key="1">
          <Slider
            tipFormatter={(v) => `$${v}`}
            range
            marks={marks}
            className="price-slider"
            defaultValue={[
              parseInt(min as string) ?? 0,
              parseInt(max as string) ?? 0,
            ]}
            min={0}
            max={10000}
            disabled={loading}
            onAfterChange={handlePriceSliderChange}
          />
        </Menu.Item>
      </SubMenu>
      <SubMenu key="sub2" icon={<AppstoreOutlined />} title="Categories">
        <Menu.Item key="2" className="categories-menu-item">
          <Checkbox.Group
            disabled={loading}
            className={"categories-sidebar-list"}
            options={categories.map((c) => ({ label: c.name, value: c._id }))}
            value={catsIds?.split(",") || []}
            onChange={handleCategoriesSelect}
          />
        </Menu.Item>
      </SubMenu>
      <SubMenu key="sub4" icon={<SettingOutlined />} title="Navigation Three">
        <Menu.Item key="9">Option 9</Menu.Item>
        <Menu.Item key="10">Option 10</Menu.Item>
        <Menu.Item key="11">Option 11</Menu.Item>
        <Menu.Item key="12">Option 12</Menu.Item>
      </SubMenu>
    </Menu>
  );
}
