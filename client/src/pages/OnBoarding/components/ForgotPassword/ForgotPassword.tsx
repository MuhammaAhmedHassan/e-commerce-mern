import React from "react";
import { Typography, Form } from "antd";
import { RouteComponentProps } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  formItemLayout,
  tailFormItemLayout,
} from "../../../../const/formLayout";
import InputField from "../../../../shared/components/InputField";
import { InputFieldRules } from "../../../../const/inputFiledRules";
import CustomButton from "../../../../shared/components/CustomButton";
import { MailOutlined } from "@ant-design/icons";
import { RootState } from "../../../../const/types";
import { handleForgotPassword } from "../../../../redux/actions/user.action";

const { Title } = Typography;

function ForgotPassword(props: RouteComponentProps) {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { loading } = useSelector(({ user: { loading } }: RootState) => ({
    loading,
  }));

  const onFinish = async ({ email }: { email: string }) => {
    const callback = () => form.resetFields();
    dispatch(handleForgotPassword(email, callback));
  };

  return (
    <div className="form-container">
      <Title level={1}>Forgot Password</Title>
      <Form
        {...formItemLayout()}
        layout="vertical"
        className="form"
        form={form}
        name="register-form"
        onFinish={onFinish}
        initialValues={{
          email: "",
          password: "",
        }}
        scrollToFirstError
      >
        <InputField
          name="email"
          label="E-mail"
          rules={InputFieldRules.emailRules()}
        />

        <Form.Item wrapperCol={tailFormItemLayout()}>
          <CustomButton
            text="Forgot Password"
            type="primary"
            htmlType="submit"
            icon={<MailOutlined />}
            disabled={loading}
          />
        </Form.Item>
      </Form>
    </div>
  );
}

export default ForgotPassword;
