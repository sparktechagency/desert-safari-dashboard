/* eslint-disable no-unused-vars */
import {
  ConfigProvider,
  DatePicker,
  Input,
  Pagination,
  Space,
  Table,
} from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { MdArrowOutward } from "react-icons/md";
import GobackButton from "../../Components/Shared/GobackButton";
import { useGetAllBookingQuery } from "../../redux/features/bookingApi/bookingApi";
import { useState } from "react";

const AllBooking = () => {
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
    allBookingData?.data?.result?.map((item) => ({
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
    navigate(`/booking-details/${bookingId}`, { state: { bookingId } }); // fixed syntax
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

  const handleSearch = () => {};
  const handleDateChange = (date, dateString) => {
    setDate(dateString);
  };

  return (
    <div className="min-h-screen">
      <div className="flex justify-between items-center my-4">
        <div className="flex justify-center items-center gap-2">
          <GobackButton />
          <h1 className="text-2xl font-bold">All Booking</h1>
        </div>
        <div className="flex gap-2 items-center">
          <Input
            placeholder="Search package name"
            value=""
            onChange={handleSearch}
            size="large"
            prefix={<SearchOutlined style={{ cursor: "pointer" }} />}
            className="w-60"
          />

          <DatePicker
            style={{ width: 200, height: 40 }}
            onChange={handleDateChange}
          />
        </div>
      </div>

      <Table
        loading={isLoading}
        columns={columns}
        dataSource={bookingData}
        pagination={false}
      />

      <Pagination
        total={allBookingData?.data?.total || 0}
        current={currentPage}
        pageSize={pageSize}
        onChange={(page, pageSize) => {
          setCurrentPage(page);
          setPageSize(pageSize);
        }}
        className="my-4 flex justify-end"
      ></Pagination>
    </div>
  );
};

export default AllBooking;
