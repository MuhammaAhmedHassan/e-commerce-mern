import { useEffect, useState } from "react";
import "./ProductForm.less";
import { Typography, Form, Select } from "antd";
import { useSelector, useDispatch } from "react-redux";
import {
  formItemLayout,
  tailFormItemLayout,
} from "../../../../const/formLayout";
import InputField from "../../../../shared/components/InputField";
import { InputFieldRules } from "../../../../const/inputFiledRules";
import CustomButton from "../../../../shared/components/CustomButton";
import SelectField from "../../../../shared/components/SelectField";
import { CategoryType, RootState } from "../../../../const/types";
import { fetchCategories } from "../../../../redux/actions/category.action";
import { fetchSubCategories } from "../../../../redux/actions/sub-category.action";
import Spinner from "../../../../shared/components/Spinner";
import {
  brands,
  colors,
  shipping,
} from "../../../../const/formConstants/productForm.const";
import {
  createProduct,
  updateProduct,
} from "../../../../redux/actions/product.action";
import {
  Product,
  ProductFormValues,
  ResponseImageType,
} from "../../../../const/types/product";
import { SubCategory } from "../../../../const/types/sub-category";
import FileUpload from "../../../../shared/components/FileUpload";
import { RouteComponentProps } from "react-router";

const { Title } = Typography;
const { Option } = Select;

function ProductForm(props: RouteComponentProps) {
  const {
    match: { params },
  } = props;
  const { productId, productSlug } = params as {
    productSlug: string;
    productId: string;
  };

  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { category, subCategory, product } = useSelector(
    ({ category, subCategory, product }: RootState) => ({
      category,
      subCategory,
      product,
    })
  );

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
  const [productToUpdate, setProductToUpdate] = useState<Product | null>(null);

  useEffect(() => {
    if (category.categories.length < 1) dispatch(fetchCategories());
    if (subCategory.subCategories.length < 1) dispatch(fetchSubCategories());
  }, []);

  useEffect(() => {
    if (!productToUpdate) {
      form.resetFields();
    }
  }, [params]);

  useEffect(() => {
    if (!productToUpdate) return;
    const subCats = subCategory.subCategories.filter(
      (s) => s.parentCategory === (productToUpdate.category as CategoryType)._id
    );

    setSubCategories(subCats);
    setSelectedCategory((productToUpdate.category as CategoryType)._id);
  }, [productToUpdate]);

  useEffect(() => {
    // Product to update
    if (productId && Object.keys(product.productsPerPage).length) {
      const selectedProduct = product.productsPerPage[productId];
      setProductToUpdate(selectedProduct);

      if (!selectedProduct) return;

      //  Fill up the form
      form.setFieldsValue({
        title: selectedProduct.title,
        description: selectedProduct.description,
        price: selectedProduct.price,
        category: (selectedProduct.category as CategoryType)._id,
        subCategories: (selectedProduct.subCategories as SubCategory[]).map(
          (s) => s._id
        ),
        images: selectedProduct.images.map((i) => ({
          uid: i.imageId,
          name: i.imageId,
          url: i.url,
        })),
        shipping: selectedProduct.shipping,
        quantity: selectedProduct.quantity,
        color: selectedProduct.color,
        brand: selectedProduct.brand,
      });
    }

    return () => {
      setProductToUpdate(null);
    };
  }, [Object.keys(product.productsPerPage).length]);

  const handleCategoryChange = (selectedValue: string) => {
    if (selectedValue === selectedCategory) return;
    const subCats = subCategory.subCategories.filter(
      (s) => s.parentCategory === selectedValue
    );
    form.resetFields(["subCategories"]);
    setSubCategories(subCats);
    setSelectedCategory(selectedValue);
  };

  const onFinish = async (values: ProductFormValues) => {
    const callback = () => form.resetFields();
    if (!productId) dispatch(createProduct(values, callback));
    else {
      dispatch(updateProduct(productToUpdate!, values));
    }
  };

  if (productId && !product) return null;

  if (category.loading || subCategory.loading) return <Spinner />;

  return (
    <div>
      <Title level={1}>{productToUpdate ? "Update" : "Create"} Product</Title>
      <div className="form-container">
        <Form
          {...formItemLayout()}
          layout="vertical"
          className="form"
          form={form}
          name="register-form"
          onFinish={onFinish}
          initialValues={{
            title: "",
            description: "",
            price: "",
            category: "",
            subCategories: [],
            shipping: "",
            quantity: "",
            images: [],
            color: "",
            brand: "",
          }}
          scrollToFirstError={true}
        >
          <InputField
            name="title"
            label="Title"
            rules={InputFieldRules.requiredField()}
            disabled={productId && productToUpdate ? true : false}
            autoFocus={true}
          />

          <InputField
            name="description"
            label="Description"
            rules={InputFieldRules.requiredField()}
          />

          <InputField
            name="price"
            label="Price"
            rules={InputFieldRules.priceField()}
            type="number"
            min={1}
          />

          <SelectField
            label="Category"
            hasFeedback={true}
            name="category"
            rules={InputFieldRules.requiredField()}
            placeholder="Select Category"
            onChange={handleCategoryChange}
          >
            {category.categories.map((c) => (
              <Option key={c._id} value={c._id}>
                {c.name}
              </Option>
            ))}
          </SelectField>

          <SelectField
            label="Sub Categories"
            hasFeedback={true}
            name="subCategories"
            rules={InputFieldRules.requiredField()}
            placeholder="Select Sub Category"
            mode="multiple"
          >
            {subCategories.map((c) => (
              <Option key={c._id} value={c._id}>
                {c.name}
              </Option>
            ))}
          </SelectField>

          <FileUpload
            name="images"
            label="Images"
            multiple={true}
            accept="image/*"
            rules={InputFieldRules.requiredField()}
          />

          <SelectField
            label="Shipping"
            hasFeedback={true}
            name="shipping"
            rules={InputFieldRules.requiredField()}
            placeholder="Shipping"
          >
            {shipping.map((c) => (
              <Option key={c} value={c}>
                {c}
              </Option>
            ))}
          </SelectField>

          <InputField
            name="quantity"
            label="Quantity"
            rules={InputFieldRules.requiredField()}
            type="number"
            min={0}
          />

          <SelectField
            label="Color"
            hasFeedback={true}
            name="color"
            rules={InputFieldRules.requiredField()}
            placeholder="Color"
          >
            {colors.map((c) => (
              <Option key={c} value={c}>
                {c}
              </Option>
            ))}
          </SelectField>

          <SelectField
            label="Brand"
            hasFeedback={true}
            name="brand"
            rules={InputFieldRules.requiredField()}
            placeholder="Brand"
          >
            {brands.map((c) => (
              <Option key={c} value={c}>
                {c}
              </Option>
            ))}
          </SelectField>

          <Form.Item wrapperCol={tailFormItemLayout()}>
            <CustomButton
              text={productId ? "Update Product" : "Create Product"}
              type="primary"
              htmlType="submit"
              disabled={
                category.loading || subCategory.loading || product.loading
              }
            />
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default ProductForm;
