import { Rule } from "antd/lib/form";

class InputFieldRules {
  static emailRules(): Rule[] {
    return [
      {
        type: "email",
        message: "The input is not valid E-mail!",
      },
      {
        required: true,
        message: "Please input your E-mail!",
      },
    ];
  }

  static passwordRules(): Rule[] {
    return [
      {
        required: true,
        message: "Password must be atleast 4 characters long",
      },
      ({ getFieldValue }) => ({
        validator(_, value) {
          if (!value || /.{4,}/g.test(value)) {
            return Promise.resolve();
          }
          return Promise.reject(
            new Error("Password length must be atlest 4 characters!")
          );
        },
      }),
    ];
  }

  static confirmPassword(dependentOn: string): Rule[] {
    return [
      {
        required: true,
        message: "Please confirm your password!",
      },
      ({ getFieldValue }) => ({
        validator(_, value) {
          if (!value || getFieldValue("newPassword") === value) {
            return Promise.resolve();
          }
          return Promise.reject(
            new Error("The two passwords that you entered do not match!")
          );
        },
      }),
    ];
  }

  static requiredField(): Rule[] {
    return [
      {
        required: true,
        message: "This field is required",
      },
    ];
  }

  static priceField(): Rule[] {
    return [
      {
        required: true,
        message: "Price must be valid",
        pattern: /^[1-9]{1,32}$/,
        validator: (_, value) => {
          if (!value || Number(value) > 0) {
            return Promise.resolve();
          }
          return Promise.reject(new Error("Price must be greater than 0"));
        },
      },
    ];
  }
}

export { InputFieldRules };
