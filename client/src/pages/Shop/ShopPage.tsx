import { RouteComponentProps } from "react-router-dom";
import qs from "querystring";
import { Layout } from "antd";
import { Sidebar, ContentPage } from "./components";

const { Sider, Content } = Layout;

export function ShopPage(props: RouteComponentProps) {
  return (
    <Layout>
      <Sider width={256} className="site-layout-background">
        <Sidebar {...props} />
      </Sider>
      <Layout className="content-container">
        <Content className="content">
          <ContentPage {...props} />
        </Content>
      </Layout>
    </Layout>
  );
}
