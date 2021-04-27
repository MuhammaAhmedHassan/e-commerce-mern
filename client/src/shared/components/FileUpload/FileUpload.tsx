import { Upload, Form } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import { formItemLayout } from "../../../const/formLayout";
import { Rule } from "rc-field-form/lib/interface";

const { Dragger } = Upload;

interface Props {
  label: string;
  name: string;
  rules?: Rule[];
  multiple?: boolean;
  accept?: string;
}

function FileUpload(props: Props) {
  const { label, name, multiple, accept, rules } = props;

  const draggerProps = {
    beforeUpload: () => false,
    // onChange(info: { file: { name?: any; status?: any }; fileList: any }) {
    //   const { status } = info.file;
    //   if (status !== "uploading") {
    //     console.log(info.file, info.fileList);
    //   }
    //   if (status === "done") {
    //     message.success(`${info.file.name} file uploaded successfully.`);
    //   } else if (status === "error") {
    //     message.error(`${info.file.name} file upload failed.`);
    //   }
    // },
  };

  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  return (
    <Form.Item
      label={label}
      name={name}
      rules={rules}
      valuePropName="fileList"
      getValueFromEvent={normFile}
    >
      <Dragger
        {...formItemLayout()}
        {...draggerProps}
        listType="picture"
        multiple={multiple}
        accept={accept}
      >
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">
          Click or drag file to this area to upload
        </p>
        <p className="ant-upload-hint">
          Support for a single or bulk upload. Strictly prohibit from uploading
          company data or other band files
        </p>
      </Dragger>
    </Form.Item>
  );
}

export default FileUpload;
