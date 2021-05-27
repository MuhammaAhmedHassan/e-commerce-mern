import { useEffect } from "react";
import { Form, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useHistory, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import qs from "querystring";
import { baseRoutes } from "../../../const/routes";
import { RootState } from "../../../const/types";

export function SearchForm() {
  const [form] = Form.useForm();
  const history = useHistory();
  const { search } = useLocation();
  const params = search.split("?").pop()!;
  const { query, min, max } = qs.parse(params);

  const { loading } = useSelector(({ product }: RootState) => ({
    loading: product.loading,
  }));

  useEffect(() => {
    if ((query as string)?.trim())
      form.setFieldsValue({
        search: query,
      });
    return () => {
      form.setFieldsValue({
        search: "",
      });
    };
  }, [query]);

  const createUrl = (search: string) => {
    let url = baseRoutes.SHOP + `?query=${search}`;
    if (min) url += `&min=${min}`;
    if (max) url += `&max=${max}`;
    return url;
  };

  const onFinishSearch = ({ search }: { search: string }) => {
    const url = createUrl(search);
    history.push(url);
  };

  return (
    <Form
      form={form}
      name="advanced_search"
      className="ant-advanced-search-form"
      onFinish={onFinishSearch}
    >
      <Form.Item name="search">
        <Input
          disabled={loading}
          placeholder="Search"
          prefix={<SearchOutlined onClick={form.submit} />}
        />
      </Form.Item>
    </Form>
  );
}
