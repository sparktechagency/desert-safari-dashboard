/* eslint-disable no-unused-vars */
import { useState } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  message,
  Space,
} from "antd";
import {
  useCreateTransferMutation,
  useGetallTransferQuery,
} from "../../redux/features/transferApi/transferApi";

const TransferOption = () => {
  const { data: transferData, isLoading } = useGetallTransferQuery({});
  const [createTransfer, { isLoading: creating }] = useCreateTransferMutation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  const showModal = () => setIsModalOpen(true);
  const handleCancel = () => setIsModalOpen(false);

  const handleAddTransfer = async (values) => {
    try {
      await createTransfer(values).unwrap();
      message.success("Transfer option added successfully!");
      form.resetFields();
      setIsModalOpen(false);
    } catch (err) {
      message.error("Failed to add transfer option");
    }
  };

  // Table columns
  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
      key: "_id",
      render: (text) => <span>{text}</span>,
    },
    {
      title: "Transfer Option",
      dataIndex: "transfer_option",
      key: "transfer_option",
      render: (text) => <b>{text}</b>,
    },
  ];

  return (
    <div className="p-6">
      <Space style={{ marginBottom: 16 }}>
        <button  onClick={showModal}  className="h-10 px-4 bg-primary rounded-md text-white flex items-center justify-center">
          Add Transfer Option
        </button>
      </Space>

      <Table
        columns={columns}
        dataSource={transferData?.data || []}
        rowKey="_id"
        loading={isLoading}
        bordered
        pagination={{ pageSize: 5 }}
      />

      <Modal
        title="Add Transfer Option"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleAddTransfer}
        >
          <Form.Item
            label="Transfer Option"
            name="transfer_option"
            rules={[
              { required: true, message: "Please input transfer option!" },
            ]}
          >
            <Input placeholder="Enter transfer option" />
          </Form.Item>

          <Form.Item>
            <Space>
              <button
               className="h-10 px-4 bg-primary rounded-md text-white flex items-center justify-center"
                loading={creating}
              >
                Add
              </button>
              <button onClick={handleCancel}  className="h-10 px-4 bg-neutral-500 rounded-md text-white flex items-center justify-center">Cancel</button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default TransferOption;
