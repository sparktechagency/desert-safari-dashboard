/* eslint-disable no-unused-vars */
import { ConfigProvider, Input, Space, Table } from "antd";
import { useState } from "react";

import { useNavigate } from "react-router-dom";
import { MdArrowOutward } from "react-icons/md";
import { useGetAllBookingQuery } from "../../redux/features/bookingApi/bookingApi";
const RecentBooking = () => {
  const [date, setDate] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [bookingId, setBookingId] = useState(null);
  const navigate = useNavigate();
  const { data: allBookingData, isLoading } = useGetAllBookingQuery({
    page: currentPage,
    limit: pageSize,
    date,
  });

  const bookingData =
    allBookingData?.data?.result?.slice(0, 2)?.map((item) => ({
      key: item._id,
      _id: item._id,
      name: item.customer_name,
      email: item.customer_email,
      contact: item.customer_phone,
      date: item.date,
      address: item.pickup_location,
      total_price: item.pricing?.grand_total,
      tour_title: item.title,
      images: item.images,
    })) || [];

  const handleBookingDetails = (bookingId) => {
    console.log("Booking ID:", bookingId);
    navigate(`/booking-details/${bookingId}`, { state: { bookingId } });
  };

  const columns = [
    {
      title: "Sl No",
      key: "slno",
      render: (_, __, index) => index + 1,
    },
    {
      title: "Name",
      key: "name",
      render: (_, record) => (
        <div className="flex items-center gap-2">
          <span>{record.name}</span>
        </div>
      ),
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Phone Number",
      key: "contact",
      render: (_, record) => <p>{record.contact || "N/A"}</p>,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Location",
      key: "address",
      render: (_, record) => <p>{record.address || "N/A"}</p>,
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
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
          <Space size="middle">
            <MdArrowOutward
              onClick={() => handleBookingDetails(record._id)}
              className="text-primary h-5 w-5"
            />
          </Space>
        </ConfigProvider>
      ),
    },
  ];

  return (
    <div className="">
      <div className="flex flex-col md:flex-row justify-between md:items-center mb-10">
        <h3 className="text-xl md:text-3xl font-semibold  px-2 md:px-0">
          Recent Booking
        </h3>
      </div>
      <div className="bg-white overflow-x-auto">
        <ConfigProvider
          theme={{
            components: {
              Table: {
                headerBg: "#fb5a10",
                headerColor: "rgb(255,255,255)",
              },
            },
          }}
        >
          <Table
            columns={columns}
            dataSource={bookingData || []}
            pagination={false}
            rowKey="id"
          />
        </ConfigProvider>
      </div>
    </div>
  );
};

export default RecentBooking;
