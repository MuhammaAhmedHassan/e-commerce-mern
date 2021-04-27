import React, { PropsWithChildren } from "react";
import { Form, Select } from "antd";
import { Rule } from "antd/lib/form";

interface Props {
  name: string;
  label?: string;
  disabled?: boolean;
  rules?: Rule[];
  autoFocus?: boolean;
  hasFeedback?: boolean;
  dependencies?: string[];
  placeholder?: string;
  onChange?: (selectedValue: string) => void;
  mode?: "multiple" | "tags";
}

function SelectField(props: PropsWithChildren<Props>) {
  const {
    rules,
    label,
    hasFeedback,
    name,
    children,
    placeholder,
    onChange,
    mode,
  } = props;
  return (
    <Form.Item
      label={label}
      hasFeedback={hasFeedback}
      name={name}
      rules={rules}
    >
      <Select
        mode={mode}
        allowClear
        size="large"
        placeholder={placeholder}
        onChange={onChange}
      >
        {children}
      </Select>

      {/* <Select
      mode="multiple"
      style={{ width: '100%' }}
      placeholder="Please select"
      defaultValue={['a10', 'c12']}
      onChange={handleChange}
      options={options}
    /> */}
    </Form.Item>
  );
}

export default SelectField;
