import React, { useEffect, useState } from "react";
import "./ListCategories.less";
import { useDispatch, useSelector } from "react-redux";
import { List, Skeleton, Row, Col, Typography, Modal, Input } from "antd";
import { CategoryType, RootState } from "../../../../const/types";
import {
  deleteCategory,
  fetchCategories,
} from "../../../../redux/actions/category.action";
import CustomButton from "../../../../shared/components/CustomButton";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { adminRoutes } from "../../../../const/routes";

const { Title } = Typography;
const { Search } = Input;

function ListCategories() {
  const dispatch = useDispatch();
  const { loading, categories } = useSelector(
    ({ category: { loading, categories } }: RootState) => ({
      loading,
      categories,
    })
  );

  const [_categories, set_categories] = useState<CategoryType[]>(categories);

  useEffect(() => {
    dispatch(fetchCategories());
  }, []);

  useEffect(() => {
    if (categories.length) set_categories(categories);
  }, [categories]);

  const handleSearch = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;

    if (value.length < 2) return;
    const matchingCategories: CategoryType[] = _categories.filter((c) =>
      c.name.toLowerCase().includes(value.toLowerCase())
    );
    const remainingCategories: CategoryType[] = _categories.filter(
      (c) => !c.name.toLowerCase().includes(value.toLowerCase())
    );

    set_categories([...matchingCategories, ...remainingCategories]);
  };

  const showModal = (slug: string) => {
    Modal.confirm({
      title: "Warning",
      content: `Are you sure you want to delete category '${slug}'?`,
      onOk() {
        dispatch(deleteCategory(slug));
      },
      onCancel() {
        return;
      },
    });
  };

  // if (loading) {
  //   return <Spinner />;
  // }

  return (
    <Row align="middle" justify="center">
      <Col span={12}>
        <Title level={1}>Categories</Title>
        <Row className="mb-1">
          <Col span={12} offset={12}>
            <Search placeholder="input search text" onKeyUp={handleSearch} />
          </Col>
        </Row>
        <List
          className="loadmore-list"
          loading={loading}
          itemLayout="horizontal"
          loadMore={
            categories.length ? (
              <CustomButton
                loading={loading}
                text="Load More"
                className="mt-1"
              />
            ) : null
          }
          dataSource={_categories}
          renderItem={(item: CategoryType) => (
            <List.Item
              actions={[
                <Link
                  to={adminRoutes.CATEGORY + "/" + item.slug + "/" + item.name}
                >
                  <CustomButton
                    icon={<EditOutlined />}
                    key="edit-category"
                    className="edit-button"
                    text={"Edit"}
                  />
                </Link>,
                <CustomButton
                  icon={<DeleteOutlined />}
                  key="delete-category"
                  text="Delete"
                  onClick={() => showModal(item.slug)}
                />,
              ]}
            >
              <Skeleton avatar title={false} loading={loading} active>
                <List.Item.Meta
                  avatar={null}
                  title={item.name}
                  description={"Slug: " + item.slug}
                />
                {/* <div>content</div> */}
              </Skeleton>
            </List.Item>
          )}
        />
      </Col>
    </Row>
  );
}

export default React.memo(ListCategories);
