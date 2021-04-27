import { useEffect } from "react";
import "../../OnBoarding.less";
import { RouteComponentProps } from "react-router-dom";
import { Form, Button, Typography } from "antd";
import { useDispatch } from "react-redux";
import { auth } from "../../../../Firebase";
import InputField from "../../../../shared/components/InputField";
import { InputFieldRules } from "../../../../const/inputFiledRules";

import {
  formItemLayout,
  tailFormItemLayout,
} from "../../../../const/formLayout";
import { AppLocalStorage } from "../../../../utils/AppLocalStorage";
import { setAlertMessage } from "../../../../redux/actions/alert.action";
import { handleAuthForm } from "../../../../redux/actions/user.action";
import CustomButton from "../../../../shared/components/CustomButton";

const { Title } = Typography;

function RegisterCompleteForm(props: RouteComponentProps) {
  const { history } = props;
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  useEffect(() => {
    if (!auth.isSignInWithEmailLink(window.location.href))
      history.push(window.location.href + "/not-found");
  }, []);

  if (!AppLocalStorage.getItem("EMAIL_FOR_REGISTRATION")) {
    dispatch(
      setAlertMessage({
        type: "error",
        message: "Error",
        description:
          "No email found on this device, please complete the registration on the device you started or register again",
      })
    );
    return null;
  }

  const signInWithEmailLink = (email: string, password: string) => {
    const getUser = () =>
      auth.signInWithEmailLink(email!, window.location.href);

    dispatch(
      handleAuthForm(getUser, history, {
        type: "RegisterWithEmailAndPassword",
        password,
      })
    );
  };

  const onFinish = ({ email, password }: { email: string; password: string }) =>
    signInWithEmailLink(email, password);

  return (
    <div className="form-container">
      <Title level={1}>Complete Registration</Title>
      <Form
        {...formItemLayout()}
        layout="vertical"
        className="form"
        form={form}
        name="register-form"
        onFinish={onFinish}
        initialValues={{
          email: AppLocalStorage.getItem("EMAIL_FOR_REGISTRATION"),
          password: "",
        }}
        scrollToFirstError
      >
        <InputField
          name="email"
          label="E-mail"
          rules={InputFieldRules.emailRules()}
          contentEditable="false"
          disabled={true}
        />

        <InputField
          name="password"
          label="Password"
          rules={InputFieldRules.passwordRules()}
          autoFocus={true}
          type="password"
          hasFeedback={true}
        />
        <Form.Item wrapperCol={tailFormItemLayout()}>
          <CustomButton text="Register" type="primary" htmlType="submit" />
        </Form.Item>
      </Form>
    </div>
  );
}

export default RegisterCompleteForm;
