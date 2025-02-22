import { Form, Input } from "antd";

const EditUserProfile = ({ values, form }: any) => {
  return (
    <Form
      form={form}
      layout="horizontal"
      autoComplete="off"
      labelCol={{ span: 8 }}
      initialValues={{ ...values }}
    >
      <Form.Item
        label="Name:"
        name="name"
        rules={[{ required: true, message: "Please enter your name!" }]}
      >
        <Input placeholder="Enter your name" />
      </Form.Item>
      <Form.Item
        label="Email:"
        name="email"
        rules={[
          { required: true, message: "Please enter your email!" },
          { type: "email", message: "Please enter a valid email address" },
        ]}
      >
        <Input placeholder="Enter your email" />
      </Form.Item>
      <Form.Item
        label="Phone:"
        name={"phone"}
        rules={[
          { required: true, message: "Please enter your phone number" },
          {
            pattern:
              /^\+?([0-9]{1,3})?\s?([-\/\.]?\s?)?([0-9]{3,5})\s?([-\/\.]?\s?)?([0-9]{4,9})(\s?x?\s?([0-9]{1,5}))?$/,
            message: "Please enter a valid  phone number",
          },
        ]}
      >
        <Input placeholder="Enter phone number" type="phone" />
      </Form.Item>
      <Form.Item
        label="Website:"
        name={"website"}
        rules={[{ required: true, message: "Please enter your website link" }]}
      >
        <Input placeholder="Enter your website link" />
      </Form.Item>
    </Form>
  );
};

export default EditUserProfile;
