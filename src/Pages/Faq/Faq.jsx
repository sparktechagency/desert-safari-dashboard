import { useState } from "react";
import { Button, Modal, Input, Form } from "antd";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { FaEdit, FaTrash } from "react-icons/fa";
import GobackButton from "../../Components/Shared/GobackButton";
import Swal from "sweetalert2";
import { useGetallfaqQuery } from "../../redux/features/faqApi/faqApi";

const Faq = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [newFaq, setNewFaq] = useState({ question: "", answer: "" });
  const toggleAnswer = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const { data: getAllFaqData } = useGetallfaqQuery();
  console.log(getAllFaqData?.data?.result);
  const faqData = getAllFaqData?.data?.result || [];
  const [form] = Form.useForm();
  const [editForm] = Form.useForm();

  const handleAddFaq = () => {
    faqData.push(newFaq);
    setShowAddModal(false);
  };

  const handleEditFaq = () => {
    faqData[editIndex] = newFaq;
    setShowEditModal(false);
  };

  const handleDeleteFaq = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Deleted!", "Your blog has been deleted.", "success");
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
          icon={<PlusOutlined />}
          onClick={() => setShowAddModal(true)}
        >
          Add FAQ
        </button>
      </div>

      <div className="space-y-4">
        {faqData.map((faq, index) => (
          <div key={index} className="bg-white p-4 shadow rounded-lg">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-medium text-gray-800">
                {faq.Ques}
              </h3>
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
                  setNewFaq(faq);
                  setEditIndex(index);
                  setShowEditModal(true);
                }}
              />
              <FaTrash onClick={handleDeleteFaq} />
            </div>
          </div>
        ))}
      </div>

      <Modal
        title="Add FAQ"
        open={showAddModal}
        onCancel={() => setShowAddModal(false)}
        footer={[
          <Button key="cancel" onClick={() => setShowAddModal(false)}>
            Cancel
          </Button>,
          <Button key="confirm" type="primary" onClick={handleAddFaq}>
            Confirm
          </Button>,
        ]}
      >
        <Form layout="vertical" form={form}>
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
        </Form>
      </Modal>

      <Modal
        title="Edit FAQ"
        open={showEditModal}
        onCancel={() => setShowEditModal(false)}
        footer={[
          <Button key="cancel" onClick={() => setShowEditModal(false)}>
            Cancel
          </Button>,
          <Button key="confirm" type="primary" onClick={handleEditFaq}>
            Save
          </Button>,
        ]}
      >
        <Form layout="vertical" form={editForm}>
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
        </Form>
      </Modal>
    </div>
  );
};

export default Faq;
