import { useState } from "react";
import { TiLocationOutline } from "react-icons/ti";
import { Button, Modal, Table } from "antd";

import img1 from "../../assets/image/1.png";
import img2 from "../../assets/image/2.png";
import img3 from "../../assets/image/3.png";
import img4 from "../../assets/image/4.png";

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
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <div>
        <h2 className="text-4xl text-primary">57 Heritage Desert Experience</h2>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <TiLocationOutline style={{ color: "#FF8C00", fontSize: "20px" }} />
          <p>United Arab Emirates</p>
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

      <h3>Booking Details</h3>
      <Table columns={columns} dataSource={bookingData} pagination={false} />

      <div style={{ marginTop: "20px" }}>
        <Button
          type="primary"
          onClick={handleApprove}
          style={{
            backgroundColor: "#28a745",
            borderColor: "#28a745",
            marginRight: "10px",
          }}
        >
          Approve
        </Button>
        <Button
          type="primary"
          onClick={handleReject}
          style={{ backgroundColor: "#dc3545", borderColor: "#dc3545" }}
        >
          Reject
        </Button>
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
