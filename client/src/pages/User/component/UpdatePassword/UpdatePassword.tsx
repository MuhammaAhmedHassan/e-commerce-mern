import React from "react";
import { Typography, Form } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  formItemLayout,
  tailFormItemLayout,
} from "../../../../const/formLayout";
import CustomButton from "../../../../shared/components/CustomButton";
import { InputFieldRules } from "../../../../const/inputFiledRules";
import InputField from "../../../../shared/components/InputField";
import { updatePassword } from "../../../../redux/actions/user.action";
import { RootState } from "../../../../const/types";

const { Title } = Typography;

function UpdatePassword() {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { loading } = useSelector(({ user: { loading } }: RootState) => ({
    loading,
  }));

  const onFinish = ({ newPassword }: { newPassword: string }) => {
    dispatch(updatePassword(newPassword));
    form.resetFields();
  };

  return (
    <div>
      <Title level={1} className="text-center mt-2">
        Update Password
      </Title>

      <Form
        {...formItemLayout()}
        layout="vertical"
        className="form"
        form={form}
        name="update-password-form"
        onFinish={onFinish}
        initialValues={{
          newPassword: "",
        }}
        scrollToFirstError
      >
        <InputField
          name="newPassword"
          label="New Password"
          rules={InputFieldRules.passwordRules()}
          type="password"
          autoFocus={true}
          hasFeedback={true}
          placeholder="New password"
        />

        <Form.Item wrapperCol={tailFormItemLayout()}>
          <CustomButton
            text="Register"
            type="primary"
            htmlType="submit"
            disabled={loading}
          />
        </Form.Item>
      </Form>
    </div>
  );
}

export default UpdatePassword;
