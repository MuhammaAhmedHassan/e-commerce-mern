import "../../OnBoarding.less";
import { Link, RouteComponentProps } from "react-router-dom";
import { Form, Button, Typography } from "antd";

import { useDispatch, useSelector } from "react-redux";
import { auth, googleAuthProvider, firebase } from "../../../../Firebase";
import InputField from "../../../../shared/components/InputField";
import { InputFieldRules } from "../../../../const/inputFiledRules";

import {
  formItemLayout,
  tailFormItemLayout,
} from "../../../../const/formLayout";
import { GooglePlusCircleFilled, MailOutlined } from "@ant-design/icons";

import { RootState } from "../../../../const/types";
import { onBoardingRoutes } from "../../../../const/routes";
import CustomButton from "../../../../shared/components/CustomButton";
import { handleAuthForm } from "../../../../redux/actions/user.action";

const { Title } = Typography;

function Login(props: RouteComponentProps) {
  const { history } = props;
  const dispatch = useDispatch();
  const { loading } = useSelector(({ user: { loading } }: RootState) => ({
    loading,
  }));
  const [form] = Form.useForm();

  const handleLogin = async (
    getUser: () => Promise<firebase.auth.UserCredential>
  ) => {
    dispatch(handleAuthForm(getUser, history));
  };

  const onFinish = async (values: { email: string; password: string }) => {
    const { email, password } = values;
    handleLogin(() => auth.signInWithEmailAndPassword(email, password));
  };

  const handleGoogleLogin = async () => {
    handleLogin(() => auth.signInWithPopup(googleAuthProvider));
  };

  return (
    <div className="form-container">
      <Title level={1}>Login</Title>
      <Form
        {...formItemLayout()}
        layout="vertical"
        className="form"
        form={form}
        name="login-form"
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
          placeholder="Your email"
          autoFocus={true}
        />

        <InputField
          name="password"
          label="Password"
          rules={InputFieldRules.passwordRules()}
          type="password"
          hasFeedback={true}
          placeholder="Your password"
        />
        <Form.Item wrapperCol={tailFormItemLayout()}>
          <CustomButton
            text="Login with Email & password"
            type="primary"
            htmlType="submit"
            icon={<MailOutlined />}
            disabled={loading}
          />
        </Form.Item>

        <Form.Item wrapperCol={tailFormItemLayout()}>
          <CustomButton
            text="Login with Google"
            type="primary"
            htmlType="button"
            icon={<GooglePlusCircleFilled />}
            style={{
              backgroundColor: "#DB4437",
              borderColor: "#DB4437",
            }}
            disabled={loading}
            onClick={handleGoogleLogin}
          />
        </Form.Item>

        <Form.Item>
          <Button type="link">
            <Link to={onBoardingRoutes.FORGOT_PASSWORD}>Forgot password?</Link>
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default Login;
