import { useEffect } from "react";
import "./ProductPage.less";
import { RouteComponentProps, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Typography, List, Card, Modal } from "antd";

import CustomButton from "../../../../shared/components/CustomButton";
import { adminRoutes } from "../../../../const/routes";
import {
  deleteProduct,
  readProductsPerPage,
} from "../../../../redux/actions/product.action";
import { RootState } from "../../../../const/types";
import Spinner from "../../../../shared/components/Spinner";
import {
  DeleteOutlined,
  EditOutlined,
  EllipsisOutlined,
} from "@ant-design/icons";
import { Product } from "../../../../const/types/product";

const { Title, Paragraph } = Typography;

function ProductPage(props: RouteComponentProps) {
  const {
    productsPerPage,
    pageNumber,
    loading,
    totalProducts,
    hasMore,
  } = useSelector(({ product }: RootState) => ({
    productsPerPage: product.productsPerPage,
    pageNumber: product.pageNumber,
    loading: product.loading,
    totalProducts: product.totalProducts,
    hasMore: product.pageNumber * 10 < product.totalProducts,
  }));
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(readProductsPerPage(0));
    return () => {};
  }, []);

  const handlePagination = (page: number) => {};

  const showModal = (product: Product) => {
    Modal.confirm({
      title: "Warning",
      content: `Are you sure you want to delete category '${product.title}'?`,
      onOk() {
        dispatch(deleteProduct(product));
      },
      onCancel() {
        return;
      },
    });
  };

  if (loading) return <Spinner />;

  return (
    <div className="mt-2">
      <Row align="middle" justify="space-between">
        <Col>
          <Title level={1}>Products</Title>
        </Col>
        <Col>
          <CustomButton
            text="Create Product"
            onClick={() => {
              props.history.push(adminRoutes.PRODUCT);
            }}
          />
        </Col>
      </Row>

      <List
        grid={{ gutter: 16 }}
        dataSource={Object.values(productsPerPage)}
        size="large"
        pagination={{
          total: totalProducts,
          pageSize: 10,
          onChange: handlePagination,
        }}
        className="product-list"
        renderItem={(item) => {
          return (
            <List.Item>
              <Card
                className="product-card"
                cover={
                  <img
                    alt="example"
                    src={
                      item.images?.length
                        ? item.images[0].url
                        : "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                    }
                  />
                }
                actions={[
                  <Link to={adminRoutes.PRODUCT + `/${item._id}/${item.slug}`}>
                    <EditOutlined key="edit" />
                  </Link>,
                  <DeleteOutlined
                    key="delete"
                    onClick={() => showModal(item)}
                  />,
                  <EllipsisOutlined key="ellipsis" />,
                ]}
              >
                <Card.Meta
                  title={item.title}
                  description={
                    <Paragraph ellipsis={true}>{item.description}</Paragraph>
                  }
                />
              </Card>
            </List.Item>
          );
        }}
      >
        {loading && hasMore && (
          <div className="demo-loading-container">
            <Spinner />
          </div>
        )}
      </List>
    </div>
  );
}

export default ProductPage;
