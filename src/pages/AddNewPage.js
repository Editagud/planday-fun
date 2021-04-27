import React from "react";
import ReactDOM from "react-dom";
import Data from "../data.json";
import { Breadcrumb } from "antd";
import { Form, Input, Button, Upload } from "antd";
import { UploadOutlined, InboxOutlined } from "@ant-design/icons";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

export function AddNewPage({ onSuccess }) {
  const [loading, setLoading] = React.useState(false);
  const [image, setImage] = React.useState("");

  const [form] = Form.useForm();
  const onFinish = (values) => {
    onSuccess({
      title: values.title,
      description: values.description,
      imagePath: image,
    });
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const uploadImage = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "geekyimages");
    setLoading(true);
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dg6g8toij/image/upload",
      {
        method: "POST",
        body: data,
      }
    );
    const file = await res.json();
    setImage(file.secure_url);
    setLoading(false);
  };
  return (
    <div>
      <Breadcrumb style={{ margin: "16px 0" }}>
        <Breadcrumb.Item>Eddie's app</Breadcrumb.Item>
        <Breadcrumb.Item>Add new</Breadcrumb.Item>
      </Breadcrumb>

      <div className="FormWrapper">
        <Form
          layout="vertical"
          form={form}
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="Title"
            name="title"
            rules={[{ required: true, message: "Please input title!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Description"
            name="description"
            rules={[
              { required: true, message: "Please input your description!" },
            ]}
          >
            <Input />
          </Form.Item>

          <input
            type="file"
            name="file"
            placeholder="Upload image"
            onChange={uploadImage}
          ></input>
          {loading ? (
            <h3>Loading...</h3>
          ) : (
            <img src={image} style={{ width: "300px", margin: "2em 0" }}></img>
          )}

          <Form.Item {...tailLayout}>
            <Button
              type="primary"
              htmlType="submit"
              disabled={image != "" ? false : true}
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
