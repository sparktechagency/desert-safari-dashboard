import { useState } from "react";
import { Button } from "antd"; // Import Ant Design's Button component
import {

  MinusOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { FaEdit, FaTrash } from "react-icons/fa";

const faqData = [
  {
    question: "What are the best tours offered by Oasis Palm Tourism in Dubai?",
    answer:
      "Here is a detailed description of the best tours that Oasis Palm Tourism offers, including desert safaris, city tours, and more.",
  },
  {
    question: "Is hotel pickup and drop-off included in your Dubai tours?",
    answer:
      "Yes, most of our Dubai tours include hotel pickup and drop-off for your convenience.",
  },
  {
    question: "Can I book group or private tours?",
    answer:
      "We offer both group and private tours depending on your preference and group size.",
  },
  {
    question: "How do I book a tour with Oasis Palm Dubai?",
    answer:
      "Booking a tour is easy. You can book online through our website or by calling our customer service.",
  },
  {
    question: "What countries can I call and text?",
    answer:
      "We offer coverage for calls and text messages in over 50 countries worldwide.",
  },
  {
    question: "Are your desert safaris family-friendly?",
    answer:
      "Yes, our desert safaris are suitable for families, with activities and experiences for all age groups.",
  },
  {
    question: "Can I customize my Dubai tour experience?",
    answer:
      "Yes, we offer customized tour packages based on your preferences and needs.",
  },
];

const Faq = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAnswer = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className=" mx-auto p-6">
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-3xl font-semibold mb-6">FAQ</h1>
        <button
          className=" bg-primary px-6 py-2 text-white rounded-md"
          icon={<PlusOutlined />}
        >
          Add FAQ
        </button>
      </div>

      <div className="space-y-4">
        {faqData.map((faq, index) => (
          <div key={index} className="bg-white p-4 shadow rounded-lg">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-medium text-gray-800">
                {faq.question}
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
                <p className="text-gray-700">{faq.answer}</p>
              </div>
            )}

            <div className="flex justify-end space-x-4 mt-4">
              <FaEdit></FaEdit>
              <FaTrash />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Faq;
