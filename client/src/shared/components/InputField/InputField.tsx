import React from "react";
import { Form, Input } from "antd";
import { Rule } from "antd/lib/form";

interface Props {
  name: string;
  label?: string;
  contentEditable?: "false" | "true" | "inherit";
  disabled?: boolean;
  rules?: Rule[];
  autoFocus?: boolean;
  type?: "password" | "number";
  hasFeedback?: boolean;
  dependencies?: string[];
  placeholder?: string;
  isTextArea?: boolean;
  min?: number;
  max?: number;
}

function InputField(props: Props) {
  const {
    name,
    label,
    contentEditable,
    disabled,
    rules,
    autoFocus,
    type,
    hasFeedback,
    dependencies,
    placeholder,
    isTextArea,
    min,
    max,
  } = props;

  return (
    <Form.Item
      name={name}
      label={label}
      rules={rules}
      hasFeedback={hasFeedback}
      dependencies={dependencies}
    >
      {isTextArea ? (
        <Input.TextArea />
      ) : (
        <Input
          contentEditable={contentEditable}
          autoFocus={autoFocus}
          disabled={disabled}
          type={type}
          placeholder={placeholder}
          size="large"
          min={min}
          max={max}
        />
      )}
    </Form.Item>
  );
}

export default InputField;
