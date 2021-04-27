import React, { PropsWithChildren } from "react";
import { RouteChildrenProps } from "react-router-dom";
import { Layout } from "antd";
import Sidebar from "../Sidebar";

const { Content, Sider } = Layout;

function DashboardLayout(props: PropsWithChildren<RouteChildrenProps>) {
  const { children, ...rest } = props;
  return (
    <Layout>
      <Sider width={256} className="site-layout-background">
        <Sidebar {...rest} />
      </Sider>
      <Layout className="content-container">
        <Content className="content">{children}</Content>
      </Layout>
    </Layout>
  );
}

export default DashboardLayout;
