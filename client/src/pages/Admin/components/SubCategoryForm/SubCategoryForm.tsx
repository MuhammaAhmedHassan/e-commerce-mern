import React, { useEffect, useState } from "react";
import { Form, Select } from "antd";
import { RouteChildrenProps, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  formItemLayout,
  tailFormItemLayout,
} from "../../../../const/formLayout";
import InputField from "../../../../shared/components/InputField";
import { InputFieldRules } from "../../../../const/inputFiledRules";
import CustomButton from "../../../../shared/components/CustomButton";
import {
  createCategory,
  fetchCategories,
} from "../../../../redux/actions/category.action";
import { RootState } from "../../../../const/types";
import Spinner from "../../../../shared/components/Spinner";
import SelectField from "../../../../shared/components/SelectField";
import {
  createSubCategory,
  updateSubCategory,
} from "../../../../redux/actions/sub-category.action";
import { SubCategory } from "../../../../const/types/sub-category";
import { adminRoutes } from "../../../../const/routes";

const { Option } = Select;

function SubCategoryForm(props: RouteChildrenProps) {
  const { match, history } = props;
  const { subCategorySlug } = match?.params as {
    subCategorySlug: string;
  };
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const { category, subCategories } = useSelector(
    ({ category, subCategory: { subCategories } }: RootState) => ({
      category,
      subCategories,
    })
  );
  const { loading, categories } = category;

  useEffect(() => {
    if (!categories.length) dispatch(fetchCategories());
  }, []);

  const [subCategory, setSubCategory] = useState<SubCategory | null>(null);

  useEffect(() => {
    const subCat = subCategories.find(({ slug }) => slug === subCategorySlug);
    if (subCat) setSubCategory(subCat);
    else {
      setSubCategory(null);
      history.push(adminRoutes.SUB_CATEGORY);
    }
  }, [subCategorySlug, subCategories]);

  useEffect(() => {
    form.setFieldsValue({
      name: subCategory?.name ?? "",
      category:
        categories.find(({ _id }) => _id === subCategory?.parentCategory)
          ?.name ?? "",
    });
  }, [subCategory]);

  const onFinish = ({ name, category }: { name: string; category: string }) => {
    if (!subCategory)
      dispatch(createSubCategory(category, name, () => form.resetFields()));
    else
      dispatch(updateSubCategory(subCategory, name, () => form.resetFields()));
  };

  if (!categories.length) return <Spinner />;

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
            label="Sub Category Name"
            placeholder="Sub Category Name"
            rules={InputFieldRules.requiredField()}
            autoFocus={true}
          />

          <SelectField
            label="Categories"
            hasFeedback={true}
            name="category"
            rules={InputFieldRules.requiredField()}
            placeholder="Select Category"
          >
            {categories.map((c) => (
              <Option key={c._id} value={c._id}>
                {c.name}
              </Option>
            ))}
          </SelectField>

          <Form.Item wrapperCol={tailFormItemLayout()}>
            <CustomButton
              text={subCategory ? "Update" : "Create"}
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

export default SubCategoryForm;
