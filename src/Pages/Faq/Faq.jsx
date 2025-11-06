import { useState } from "react";
import { Button, Modal, Input, Form } from "antd";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { FaEdit, FaTrash } from "react-icons/fa";
import GobackButton from "../../Components/Shared/GobackButton";
import Swal from "sweetalert2";
import {
  useCreateFaqMutation,
  useDeleteFaqMutation,
  useGetallfaqQuery,
  useUpdateFaqMutation,
} from "../../redux/features/faqApi/faqApi";

const Faq = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editFaqId, setEditFaqId] = useState(null);
  console.log(editFaqId);

  const { data: getAllFaqData, refetch } = useGetallfaqQuery();
  const [createFaq] = useCreateFaqMutation();
  const [deleteFaq] = useDeleteFaqMutation();
  const [updateFaq] = useUpdateFaqMutation();

  const faqData = getAllFaqData?.data?.result || [];
  const [form] = Form.useForm();
  const [editForm] = Form.useForm();

  const toggleAnswer = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const onAddFinish = async (values) => {
    const payload = {
      Ques: values.question,
      Answere: values.answer,
    };

    try {
      await createFaq(payload).unwrap();
      Swal.fire("Success!", "FAQ added successfully!", "success");
      form.resetFields();
      setShowAddModal(false);
      refetch();
    } catch (error) {
      Swal.fire(error?.data?.message || "Error!", "Failed to add FAQ", "error");
    }
  };

  const onEditFinish = async (values) => {
    const payload = {
      Ques: values.question,
      Answere: values.answer,
    };

    try {
      await updateFaq({ _id: editFaqId, data: payload }).unwrap();
      Swal.fire("Success!", "FAQ updated successfully!", "success");
      editForm.resetFields();
      setShowEditModal(false);
      refetch();
    } catch (error) {
      Swal.fire(
        error?.data?.message || "Error!",
        "Failed to update FAQ",
        "error"
      );
    }
  };

  const handleDeleteFaq = (_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteFaq(_id).unwrap();
          Swal.fire("Deleted!", "FAQ has been deleted.", "success");
          refetch();
        } catch (error) {
          Swal.fire(
            error?.data?.message || "Error!",
            "Failed to delete FAQ",
            "error"
          );
        }
      }
    });
  };

  return (
    <div className=" mx-auto p-6 min-h-screen">
      <div className="flex justify-between items-center mb-5">
        <div className="flex justify-center items-center gap-2">
          <GobackButton />
          <h1 className="text-2xl font-bold">FAQ</h1>
        </div>
        <button
          className=" bg-primary px-6 py-2 text-white rounded-md"
          onClick={() => setShowAddModal(true)}
        >
          Add FAQ
        </button>
      </div>

      <div className="space-y-4">
        {faqData.map((faq, index) => (
          <div key={faq._id} className="bg-white p-4 shadow rounded-lg">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-medium text-gray-800">{faq.Ques}</h3>
              <Button
                type="text"
                icon={
                  openIndex === index ? <MinusOutlined /> : <PlusOutlined />
                }
                onClick={() => toggleAnswer(index)}
              />
            </div>

            {openIndex === index && (
              <div className="mt-4">
                <p className="text-gray-700">{faq.Answere}</p>
              </div>
            )}

            <div className="flex justify-end space-x-4 mt-4">
              <FaEdit
                onClick={() => {
                  setEditFaqId(faq._id);
                  editForm.setFieldsValue({
                    question: faq.Ques,
                    answer: faq.Answere,
                  });
                  setShowEditModal(true);
                }}
              />
              <FaTrash onClick={() => handleDeleteFaq(faq._id)} />
            </div>
          </div>
        ))}
      </div>

      <Modal
        title="Add FAQ"
        open={showAddModal}
        onCancel={() => setShowAddModal(false)}
        footer={null}
      >
        <Form layout="vertical" form={form} onFinish={onAddFinish}>
          <Form.Item
            name="question"
            label="Question"
            rules={[{ required: true, message: "Please input a question!" }]}
          >
            <Input placeholder="Enter question" />
          </Form.Item>
          <Form.Item
            name="answer"
            label="Answer"
            rules={[{ required: true, message: "Please input an answer!" }]}
          >
            <Input.TextArea rows={4} placeholder="Enter answer" />
          </Form.Item>
          <Button type="primary" htmlType="submit" block>
            Add FAQ
          </Button>
        </Form>
      </Modal>

      <Modal
        title="Edit FAQ"
        open={showEditModal}
        onCancel={() => setShowEditModal(false)}
        footer={null}
      >
        <Form layout="vertical" form={editForm} onFinish={onEditFinish}>
          <Form.Item
            name="question"
            label="Question"
            rules={[{ required: true, message: "Please input a question!" }]}
          >
            <Input placeholder="Enter question" />
          </Form.Item>
          <Form.Item
            name="answer"
            label="Answer"
            rules={[{ required: true, message: "Please input an answer!" }]}
          >
            <Input.TextArea rows={4} placeholder="Enter answer" />
          </Form.Item>
          <Button type="primary" htmlType="submit" block>
            Save Changes
          </Button>
        </Form>
      </Modal>
    </div>
  );
};

export default Faq;
