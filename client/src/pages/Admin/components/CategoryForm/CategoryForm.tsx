import React, { useEffect } from "react";
import { Form } from "antd";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  formItemLayout,
  tailFormItemLayout,
} from "../../../../const/formLayout";
import InputField from "../../../../shared/components/InputField";
import { InputFieldRules } from "../../../../const/inputFiledRules";
import CustomButton from "../../../../shared/components/CustomButton";
import { createCategory } from "../../../../redux/actions/category.action";
import { RootState } from "../../../../const/types";

function CategoryForm() {
  const dispatch = useDispatch();
  const params = useParams() as { categoryId?: string; categoryName?: string };
  const [form] = Form.useForm();
  const { loading } = useSelector(({ category: { loading } }: RootState) => ({
    loading,
  }));

  useEffect(() => {
    if (params.categoryId)
      form.setFieldsValue({
        name: params.categoryName,
      });
  }, [params]);

  const onFinish = ({ name }: { name: string }) => {
    if (!params.categoryId)
      dispatch(createCategory(name, () => form.resetFields()));
    else {
      // update category is remaining
    }
  };

  return (
    <div>
      <div className="form-container">
        <Form
          {...formItemLayout()}
          layout="vertical"
          className="form"
          form={form}
          name="category-form"
          onFinish={onFinish}
          initialValues={{
            name: "",
          }}
          scrollToFirstError
        >
          <InputField
            name="name"
            label="Category Name"
            rules={InputFieldRules.requiredField()}
            autoFocus={true}
          />
          <Form.Item wrapperCol={tailFormItemLayout()}>
            <CustomButton
              text="Create"
              type="primary"
              htmlType="submit"
              loading={loading}
            />
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default CategoryForm;
