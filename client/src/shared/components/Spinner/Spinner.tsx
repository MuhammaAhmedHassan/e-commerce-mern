import React from "react";
import { Row, Col, Spin } from "antd";

function Spinner() {
  return (
    <Row align="middle" justify="center" style={{ height: "100%" }}>
      <Col>
        <Spin size="large" />
      </Col>
    </Row>
  );
}

export default Spinner;
