import { useState } from "react";
import { TiLocationOutline } from "react-icons/ti";
import { Modal, Table } from "antd";

import img1 from "../../assets/image/1.png";
import img2 from "../../assets/image/2.png";
import img3 from "../../assets/image/3.png";
import img4 from "../../assets/image/4.png";
import { IoCar } from "react-icons/io5";
import { CgEditBlackPoint } from "react-icons/cg";

const BookingDetails = () => {
  const [isRejected, setIsRejected] = useState(false);
  const [isApproved, setIsApproved] = useState(false);

  const handleReject = () => {
    setIsRejected(true);
  };

  const handleApprove = () => {
    setIsApproved(true);
  };

  const handleConfirmReject = () => {
    setIsRejected(false);
    Modal.success({
      content: "Booking Rejected!",
    });
  };

  const handleConfirmApprove = () => {
    setIsApproved(false);
    Modal.success({
      content: "Booking Approved!",
    });
  };

  const bookingData = [
    { key: 1, name: "No of Adults", quantity: 5, price: "AED 2500" },
    {
      key: 2,
      name: "Single Seater Dune Buggy 30 mins",
      quantity: 2,
      price: "AED 900",
    },
    { key: 3, name: "20 Minutes Quad Bike", quantity: 2, price: "AED 1100" },
    {
      key: 4,
      name: "4 Seater Dune Buggy 30 mins",
      quantity: 1,
      price: "AED 700",
    },
  ];

  const columns = [
    { title: "No", dataIndex: "key", key: "key" },
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Quantity", dataIndex: "quantity", key: "quantity" },
    { title: "Price", dataIndex: "price", key: "price" },
  ];

  return (
    <div>
      <div>
        <h2 className="text-4xl text-primary">57 Heritage Desert Experience</h2>
        <div className="flex justify-start items-center gap-2">
          <TiLocationOutline className="h-5 w-5 text-primary my-4" />
          <p className="text-xl">United Arab Emirates</p>
        </div>
      </div>

      <div className="my-4 w-full flex gap-5">
        <div className="w-[50%] ">
          <img src={img1} alt="Desert Experience" className="w-full h-auto" />
        </div>
        <div className="w-[50%] ">
          <img src={img2} alt="Desert Safari" className="w-full mb-5" />
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-3 ">
            <img src={img3} alt="Desert Safari" className=" w-full" />
            <img src={img4} alt="Desert Safari " className=" w-full" />
          </div>
        </div>
      </div>

      <div className="bg-secondary py-2 px-5 my-4 ">
        <h1 className="text-xl font-semibold ">Book VIP Desert Safari Dubai</h1>
      </div>

      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-5 justify-start items-center my-4">
        <h1 className="text-2xl">
          Date: <span className="text-primary"> 07/04/2025 - 6:30 PM</span>{" "}
        </h1>
        <div className="flex justify-start items-center gap-2">
          <IoCar className="text-primary h-14 w-20" />
          <div>
            <h1 className="text-xl">Activity</h1>
            <p>Dune Bashing</p>
          </div>
        </div>
      </div>
      <Table columns={columns} dataSource={bookingData} pagination={false} />

      <div className="my-4">
        <div className="flex justify-start items-center gap-2">
          <CgEditBlackPoint className="text-primary h-5 w-5" />
          <p className="text-2xl font-bold">Personal Information</p>
        </div>
        <p className="text-xl my-1">
          <span className="font-semibold">Name: </span> Nahid Hossain
        </p>
        <p className="text-xl my-1">
          <span className="font-semibold">Email: </span> workwithnahid@gmail.com
        </p>
        <p className="text-xl my-1">
          <span className="font-semibold">Phone Number: </span> 01840560614
        </p>
        <p className="text-xl my-1">
          <span className="font-semibold">Country: </span> Bangladesh
        </p>
        <p className="text-xl my-1">
          <span className="font-semibold">Pickup location: </span> Badda, Dhaka
        </p>
        <p className="text-xl my-1">
          <span className="font-semibold"> Transaction ID: </span> 255424FD34
        </p>
      </div>

      <div className="my-8 flex justify-start items-center gap-5">
        <button
          onClick={handleApprove}
          className="bg-blue-500 text-white px-8 py-3 rounded-md text-md"
        >
          Approve
        </button>
        <button
          onClick={handleReject}
          className="bg-primary text-white px-8 py-3 rounded-md text-md"
        >
          Reject
        </button>
      </div>

      {isRejected && (
        <Modal
          title="Confirm Rejection"
          open={isRejected}
          onOk={handleConfirmReject}
          onCancel={() => setIsRejected(false)}
          okText="Reject"
          cancelText="Cancel"
        >
          <p>Are you sure you want to reject the booking?</p>
        </Modal>
      )}

      {isApproved && (
        <Modal
          title="Confirm Approval"
          open={isApproved}
          onOk={handleConfirmApprove}
          onCancel={() => setIsApproved(false)}
          okText="Approve"
          cancelText="Cancel"
        >
          <p>Are you sure you want to approve the booking?</p>
        </Modal>
      )}
    </div>
  );
};

export default BookingDetails;
