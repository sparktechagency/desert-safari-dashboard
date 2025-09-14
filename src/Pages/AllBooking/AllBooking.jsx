/* eslint-disable no-unused-vars */
import { ConfigProvider, DatePicker, Input, Space, Table } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { FaArrowTrendUp } from "react-icons/fa6";
import GobackButton from "../../Components/Shared/GobackButton";
import { MdArrowOutward } from "react-icons/md";
const AllBooking = () => {
  const bookingData = [
    {
      id: "#1239",
      name: "Mr. Mahmud",
      email: "mr101@mail.ru",
      total_booking: 20,
      contact: "(+33) 7 00 55 59 27",
      location: "Corona, Michigan",
      address: "76/4 R no. 60/1 Rue des Saints-Paris, 75005 Paris",
      date: "07/04/2025 - 6:30 PM",
      gender: "Male",
      is_active: "true",
      booking: [
        {
          name: "No of Adults",
          quantity: 5,
          price: 2500,
        },
        {
          name: "Single Seater Dune Buggy 30 mins",
          quantity: 2,
          price: 900,
        },
        {
          name: "20 Minutes Quad Bike",
          quantity: 1,
          price: 1100,
        },
        {
          name: "4 Seater Dune Buggy 30 mins",
          quantity: 1,
          price: 700,
        },
      ],
      total_price: 5200,
      profileImage: "/path/to/profile-image.jpg",
    },
    {
      id: "#1238",
      name: "Lily",
      email: "xterris@gmail.com",
      total_booking: 20,
      contact: "(+33) 7 00 55 59 27",
      location: "Great Falls, Maryland",
      address: "123 Rue des Lilas, Paris, 75008",
      date: "07/04/2025 - 6:30 PM",
      gender: "Female",
      is_active: "true",
      booking: [
        {
          name: "No of Adults",
          quantity: 4,
          price: 2500,
        },
        {
          name: "Single Seater Dune Buggy 30 mins",
          quantity: 3,
          price: 900,
        },
        {
          name: "20 Minutes Quad Bike",
          quantity: 2,
          price: 1100,
        },
        {
          name: "4 Seater Dune Buggy 30 mins",
          quantity: 1,
          price: 700,
        },
      ],
      total_price: 6500,
      profileImage: "/path/to/profile-image.jpg",
    },
  ];
  const columns = [
    {
      title: "Sl No",
      dataIndex: "slno",
      key: "slno",
      render: (text, record, index) => index + 1,
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
      render: (_, record) => {
        const contact = record.contact || "N/A";
        return <p>{contact}</p>;
      },
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Location",
      key: "address",
      render: (_, record) => {
        const address = record?.address || "N/A";
        return <p>{address}</p>;
      },
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
            <Link to="/booking-details">
              <MdArrowOutward className="text-primary h-5 w-5" />
            </Link>
          </Space>
        </ConfigProvider>
      ),
    },
  ];
  const handleSearch = () => {};
  const handleDateChange = (date, dateString) => {
    console.log("Selected date: ", dateString);
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

      <Table columns={columns} dataSource={bookingData} pagination={false} />
    </div>
  );
};

export default AllBooking;
