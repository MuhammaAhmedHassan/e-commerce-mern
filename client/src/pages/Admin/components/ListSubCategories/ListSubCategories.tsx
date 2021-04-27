import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { List, Skeleton, Row, Col, Typography, Modal, Input } from "antd";
import { RootState } from "../../../../const/types";
import CustomButton from "../../../../shared/components/CustomButton";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { adminRoutes } from "../../../../const/routes";
import { SubCategory } from "../../../../const/types/sub-category";
import {
  deleteSubCategory,
  fetchSubCategories,
} from "../../../../redux/actions/sub-category.action";

const { Title } = Typography;
const { Search } = Input;

function ListSubCategories() {
  const dispatch = useDispatch();
  const { subCategory } = useSelector(({ subCategory }: RootState) => ({
    subCategory,
  }));
  const { loading, subCategories } = subCategory;
  const [_subCategories, set_subCategories] = useState<SubCategory[]>(
    subCategories
  );

  useEffect(() => {
    dispatch(fetchSubCategories());
  }, []);

  useEffect(() => {
    set_subCategories(subCategories);
  }, [subCategory]);

  const handleSearch = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;

    if (value.length < 2) return;
    const matchingCategories: SubCategory[] = _subCategories.filter((c) =>
      c.name.toLowerCase().includes(value.toLowerCase())
    );
    const remainingCategories: SubCategory[] = _subCategories.filter(
      (c) => !c.name.toLowerCase().includes(value.toLowerCase())
    );

    set_subCategories([...matchingCategories, ...remainingCategories]);
  };

  const showModal = (subCategory: SubCategory) => {
    Modal.confirm({
      title: "Warning",
      content: `Are you sure you want to delete this sub category '${subCategory.slug}'?`,
      onOk() {
        dispatch(deleteSubCategory(subCategory));
      },
      onCancel() {
        return;
      },
    });
  };

  return (
    <Row align="middle" justify="center">
      <Col span={12}>
        <Title level={1}>Sub Categories</Title>
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
            subCategories.length ? (
              <CustomButton
                loading={loading}
                text="Load More"
                className="mt-1"
              />
            ) : null
          }
          dataSource={_subCategories}
          renderItem={(item: SubCategory) => (
            <List.Item
              actions={[
                <Link to={adminRoutes.SUB_CATEGORY + "/" + item.slug}>
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
                  onClick={() => showModal(item)}
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

export default React.memo(ListSubCategories);
