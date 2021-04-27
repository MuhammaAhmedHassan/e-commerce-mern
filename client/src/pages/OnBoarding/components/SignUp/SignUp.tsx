import "../../OnBoarding.less";
import { Form, Button } from "antd";
import { useDispatch } from "react-redux";
import {
  formItemLayout,
  tailFormItemLayout,
} from "../../../../const/formLayout";
import InputField from "../../../../shared/components/InputField";
import { InputFieldRules } from "../../../../const/inputFiledRules";
import { signUpWithEmail } from "../../../../redux/actions/user.action";
import CustomButton from "../../../../shared/components/CustomButton";

const SignUp = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const onFinish = async ({ email }: { email: string }) => {
    const callback = (): void => form.resetFields();
    dispatch(signUpWithEmail(email, callback));
  };

  return (
    <div className="form-container">
      <Form
        {...formItemLayout()}
        layout="vertical"
        className="form"
        form={form}
        name="register-form"
        onFinish={onFinish}
        initialValues={{
          email: "",
        }}
        scrollToFirstError
      >
        <InputField
          name="email"
          label="E-mail"
          rules={InputFieldRules.emailRules()}
          autoFocus={true}
        />
        <Form.Item wrapperCol={tailFormItemLayout()}>
          <CustomButton text="Register" type="primary" htmlType="submit" />
        </Form.Item>
      </Form>
    </div>
  );
};

export default SignUp;
