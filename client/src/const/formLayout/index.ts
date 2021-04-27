const tailFormItemLayout = () => ({
  xs: { span: 24, offset: 0 },
  sm: { span: 16, offset: 4 },
  md: { span: 12, offset: 6 },
  lg: { span: 8, offset: 8 },
});

const formItemLayout = () => ({
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8, offset: 4 },
    md: { span: 12, offset: 6 },
    lg: { span: 8, offset: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16, offset: 4 },
    md: { span: 12, offset: 6 },
    lg: { span: 8, offset: 8 },
  },
});

export { tailFormItemLayout, formItemLayout };
