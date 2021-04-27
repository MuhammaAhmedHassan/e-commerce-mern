import React from "react";
import { Alert } from "antd";

interface Props {
  message: string;
  description?: string;
  type: "success" | "info" | "warning" | "error" | undefined;
  showIcon: boolean;
  className: string;
}

function CustomAlert(props: Props) {
  const { message, description, type, showIcon, className } = props;
  return (
    <Alert
      className={className}
      message={message}
      description={description}
      type={type}
      showIcon={showIcon}
      closable
    />
  );
}

export default CustomAlert;
