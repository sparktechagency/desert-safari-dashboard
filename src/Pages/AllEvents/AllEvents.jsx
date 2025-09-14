import { SiTicktick } from "react-icons/si";
import img1 from "../../assets/image/1.png";
import { FaImage, FaTrashAlt } from "react-icons/fa";
import { useState } from "react";
import { ConfigProvider, Form, Input, Modal, TimePicker, Upload } from "antd";

const AllEvents = () => {
  const data = [
    {
      title: "School Trip",
      time: "09:00PM to 11:30PM",
      price: "Adult 360 - Child 160",
      details: [
        "Camping, Exciting Visits.",
        "Competitions and Prizes",
        "Rides Included",
      ],
    },
    {
      title: "Corporate Events",
      time: "09:00PM to 11:30PM",
      price: "Adult 360 - Child 160",
      details: ["Exciting Visits", "Competitions and Prizes", "Rides Included"],
    },
    {
      title: "Wedding Ceremony",
      time: "09:00PM to 11:30PM",
      price: "Adult 360 - Child 160",
      details: ["Exciting Visits", "Competitions and Prizes", "Rides Included"],
    },
    {
      title: "Product Launch Ceremony",
      time: "09:00PM to 11:30PM",
      price: "Adult 360 - Child 160",
      details: ["Exciting Visits", "Competitions and Prizes", "Rides Included"],
    },
    {
      title: "Conference & Gatherings",
      time: "09:00PM to 11:30PM",
      price: "Adult 360 - Child 160",
      details: ["Exciting Visits", "Competitions and Prizes", "Rides Included"],
    },
  ];
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const onFinish = () => {};

  return (
    <div className="min-h-screen ">
      <div className="flex justify-between items-center my-6 px-6">
        <h1 className="text-2xl font-bold">
          Exclusive arrangement for Corporate
        </h1>
        <button
          onClick={handleAddModal}
          className="px-4 py-2 rounded-md bg-primary text-white shadow-md hover:bg-orange-600 transition"
        >
          Add Events
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-6 justify-end items-end">
        {data.map((event, index) => (
          <div key={index} className="relative rounded-lg  ">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `linear-gradient(to left, rgba(216,101,48,0.8), rgba(0,0,0,0.2)), url(${img1})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />

            <div className="absolute top-3 left-3 z-20">
              <button className="text-2xl text-white rounded-full p-1 shadow hover:scale-110 transition">
                <FaTrashAlt />
              </button>
            </div>
            <div className="border-2 border-red-500 p-2 w-full">
              <div className="relative z-10 p-5 text-white border-2 flex flex-col justify-end items-end  ">
                <h2 className="font-bold text-2xl mb-3">{event.title}</h2>

                <div className="bg-orange-200 text-black inline-block px-3 py-1 rounded-md mb-3 font-medium">
                  {event.time}
                </div>

                <div className="bg-white text-black px-4 py-2 rounded-md mb-3 font-semibold">
                  {event.price}
                </div>

                <ul className="text-sm space-y-2">
                  {event.details.map((detail, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <SiTicktick className="text-white" /> {detail}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
      <ConfigProvider
        theme={{
          components: {
            Button: {
              defaultHoverBorderColor: "rgb(47,84,235)",
              defaultHoverColor: "rgb(47,84,235)",
              defaultBorderColor: "rgb(47,84,235)",
            },
          },
        }}
      >
        <Modal
          title="Add Events"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={false}
        >
          <Form
            name="contact"
            initialValues={{ remember: false }}
            onFinish={onFinish}
            layout="vertical"
          >
            <Form.Item name="image">
              <div className="border-2 border-[#fb5a10] h-32 p-5 flex justify-center items-center rounded-md">
                <Upload showUploadList={false} className="cursor-pointer">
                  <FaImage className="text-neutral-500 h-10 w-10" />
                </Upload>
              </div>
            </Form.Item>

            <Form.Item
              name="title"
              label={<p className="text-md font-medium">Event Name</p>}
            >
              <Input
                required
                placeholder="Enter event name"
                className="text-md border-[#fb5a10] focus:border-[#fb5a10] focus:ring-[#fb5a10]"
              />
            </Form.Item>

            <div className="flex gap-2">
              <Form.Item
                name="startTime"
                label={<p className="text-md font-medium">Start Time</p>}
                className="flex-1"
              >
                <TimePicker className="w-full border-[#fb5a10] focus:border-[#fb5a10] focus:ring-[#fb5a10]" />
              </Form.Item>
              <Form.Item
                name="endTime"
                label={<p className="text-md font-medium">End Time</p>}
                className="flex-1"
              >
                <TimePicker className="w-full border-[#fb5a10] focus:border-[#fb5a10] focus:ring-[#fb5a10]" />
              </Form.Item>
            </div>

            <Form.Item
              name="description"
              label={<p className="text-md font-medium">Description</p>}
            >
              <Input.TextArea
                required
                placeholder="Enter description"
                rows={4}
                className="border-[#fb5a10] focus:border-[#fb5a10] focus:ring-[#fb5a10]"
              />
            </Form.Item>

            <Form.Item>
              <button
                type="submit"
                className="px-10 py-3 w-full bg-primary text-white font-semibold text-lg md:text-xl rounded shadow-lg  transition"
              >
                Publish
              </button>
            </Form.Item>
          </Form>
        </Modal>
      </ConfigProvider>
    </div>
  );
};

export default AllEvents;
