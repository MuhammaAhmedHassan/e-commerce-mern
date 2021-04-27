import React, { MouseEventHandler } from "react";
import { Button, Spin } from "antd";

interface Props {
  icon?: React.ReactNode;
  disabled?: boolean;
  loading?: boolean;
  onClick?: MouseEventHandler<HTMLElement>;
  className?: string;
  style?: React.CSSProperties;
  text: string | JSX.Element;
  htmlType?: "button" | "submit" | "reset";
  type?: "text" | "link" | "ghost" | "primary" | "default" | "dashed";
}

function CustomButton(props: Props) {
  const {
    text,
    icon,
    disabled,
    onClick,
    style,
    htmlType,
    type,
    loading,
    className,
  } = props;
  return (
    <Button
      type={type}
      htmlType={htmlType}
      block
      shape="round"
      icon={icon}
      size="large"
      style={style}
      disabled={disabled || loading}
      onClick={onClick}
      className={className}
    >
      {loading ? <Spin size="small" /> : text}
    </Button>
  );
}

export default CustomButton;
