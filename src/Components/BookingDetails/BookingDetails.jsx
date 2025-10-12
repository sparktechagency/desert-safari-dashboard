import { useState } from "react";
import { TiLocationOutline } from "react-icons/ti";
import { Modal, Table } from "antd";
import { IoCar } from "react-icons/io5";
import { CgEditBlackPoint } from "react-icons/cg";
import GobackButton from "../Shared/GobackButton";
import { useGetSingleBookingQuery } from "../../redux/features/bookingApi/bookingApi";
import { useLocation } from "react-router-dom";

const BookingDetails = () => {
  const location = useLocation();
  const bookingId = location.state?.bookingId;

  const { data: singleBookingData } = useGetSingleBookingQuery(bookingId);

  const [isRejected, setIsRejected] = useState(false);
  const [isApproved, setIsApproved] = useState(false);


  const handleConfirmReject = () => {
    setIsRejected(false);
    Modal.success({ content: "Booking Rejected!" });
  };

  const handleConfirmApprove = () => {
    setIsApproved(false);
    Modal.success({ content: "Booking Approved!" });
  };

  if (!singleBookingData?.data) {
    return <p>Loading booking details...</p>;
  }

  const booking = singleBookingData.data;

  // Guests Table
  const guestsData = [
    { key: 1, type: "Adults", quantity: booking.adults },
    { key: 2, type: "Children", quantity: booking.children },
  ];

  const guestsColumns = [
    { title: "Type", dataIndex: "type", key: "type" },
    { title: "Quantity", dataIndex: "quantity", key: "quantity" },
  ];

  // Tour Options Table
  const tourOptionsData = booking.tour_options.map((option, index) => ({
    key: index + 1,
    name: option.name
      .replace(/_/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase()),
    quantity: option.quantity,
    price: `${option.currency} ${option.amount * option.quantity}`,
  }));

  const tourColumns = [
    { title: "No", dataIndex: "key", key: "key" },
    { title: "Tour Name", dataIndex: "name", key: "name" },
    { title: "Quantity", dataIndex: "quantity", key: "quantity" },
    { title: "Price", dataIndex: "price", key: "price" },
  ];

  // Pricing Table
  const pricingData = [
    {
      key: 1,
      name: "Tour Price",
      amount: `${booking.currency} ${booking.pricing.tour_price}`,
    },
    {
      key: 2,
      name: "Additional Price",
      amount: `${booking.currency} ${booking.pricing.additional_price}`,
    },
    {
      key: 3,
      name: "Grand Total",
      amount: `${booking.currency} ${booking.pricing.grand_total}`,
    },
  ];

  const pricingColumns = [
    { title: "Description", dataIndex: "name", key: "name" },
    { title: "Amount", dataIndex: "amount", key: "amount" },
  ];

  return (
    <div>
      <div>
        <div className="flex justify-start items-center gap-2">
          <GobackButton />
          <h1 className="text-2xl font-bold">{booking.title}</h1>
        </div>

        <div className="flex justify-start items-center gap-2">
          <TiLocationOutline className="h-5 w-5 text-primary my-4" />
          <p className="text-xl">{booking.location}</p>
        </div>
      </div>

      <div className="my-4 w-full flex gap-5">
        <div className="w-[50%]">
          <img
            src={booking.images[0]}
            alt="Desert Experience"
            className="w-full h-auto"
          />
        </div>
        <div className="w-[50%]">
          <img
            src={booking.images[1]}
            alt="Desert Safari"
            className="w-full mb-5"
          />
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-3">
            {booking.images.slice(2, 4).map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`Desert Safari ${idx + 3}`}
                className="w-full"
              />
            ))}
          </div>
        </div>
      </div>

      <div className="bg-secondary py-2 px-5 my-4">
        <h1 className="text-xl font-semibold">Book VIP Desert Safari Dubai</h1>
      </div>

      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-5 justify-start items-center my-4">
        <h1 className="text-2xl">
          Date: <span className="text-primary">{booking.date}</span>
        </h1>
        <div className="flex justify-start items-center gap-2">
          <IoCar className="text-primary h-14 w-20" />
          <div>
            <h1 className="text-xl">Activity</h1>
            <p className="text-sm text-gray-500">
              {booking.tour_options
                .map((o) => o.name.replace(/_/g, " "))
                .join(", ")}
            </p>
          </div>
        </div>
      </div>

      <h2 className="text-xl font-semibold my-3">Guests</h2>
      <Table
        columns={guestsColumns}
        dataSource={guestsData}
        pagination={false}
      />

      <h2 className="text-xl font-semibold my-3">Tour Options</h2>
      <Table
        columns={tourColumns}
        dataSource={tourOptionsData}
        pagination={false}
      />

      <h2 className="text-xl font-semibold my-3">Pricing</h2>
      <Table
        columns={pricingColumns}
        dataSource={pricingData}
        pagination={false}
      />

      <div className="my-4">
        <div className="flex justify-start items-center gap-2">
          <CgEditBlackPoint className="text-primary h-5 w-5" />
          <p className="text-2xl font-bold">Personal Information</p>
        </div>
        <p className="text-xl my-1">
          <span className="font-semibold">Name: </span> {booking.customer_name}
        </p>
        <p className="text-xl my-1">
          <span className="font-semibold">Email: </span>{" "}
          {booking.customer_email}
        </p>
        <p className="text-xl my-1">
          <span className="font-semibold">Phone Number: </span>{" "}
          {booking.customer_phone}
        </p>
        <p className="text-xl my-1">
          <span className="font-semibold">Country: </span>{" "}
          {booking.customer_country}
        </p>
        <p className="text-xl my-1">
          <span className="font-semibold">Pickup location: </span>{" "}
          {booking.pickup_location}
        </p>
        <p className="text-xl my-1">
          <span className="font-semibold">Payment Status: </span>{" "}
          {booking.payment_status}
        </p>
        <p className="text-xl my-1">
          <span className="font-semibold">Transaction ID: </span>{" "}
          {booking.stripe_sessionId}
        </p>
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
