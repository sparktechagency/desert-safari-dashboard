/* eslint-disable no-unused-vars */
import { DatePicker } from "antd";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Legend,
  Bar,
  ResponsiveContainer,
} from "recharts";
import dayjs from "dayjs";
import { useState } from "react";

const UserGrowth = () => {
  const [selectedYear, setselectedYear] = useState(dayjs().year());
  const [selectedMonth, setselectedMonth] = useState(dayjs().month() + 1);

  // Mock data
  const mockData = [
    { name: "Jan", Earning: 100 },
    { name: "Feb", Earning: 45 },
    { name: "Mar", Earning: 35 },
    { name: "Apr", Earning: 100 },
    { name: "May", Earning: 20 },
    { name: "Jun", Earning: 80 },
    { name: "Jul", Earning: 70 },
    { name: "Aug", Earning: 40 },
    { name: "Sep", Earning: 60 },
    { name: "Oct", Earning: 50 },
    { name: "Nov", Earning: 30 },
    { name: "Dec", Earning: 10 },
  ];

  const maxValue = Math.max(...mockData.map((item) => item.Earning));
  const normalizeData = mockData.map((item) => ({
    ...item,
    Earning: (item.Earning / maxValue) * 100,
  }));

  const onChange = (date, dateString) => {
    console.log(date, dateString);
    setselectedYear(dateString.split("-")[0]);
    setselectedMonth(dateString.split("-")[1]);
  };

  return (
    <div className="mt-4 p-4">
      <div className="bg-gray-50 rounded-lg shadow px-4 py-6">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <h1 className="text-lg md:text-xl font-medium">
            Total Earning Overview
          </h1>
          <DatePicker
            onChange={onChange}
            defaultValue={dayjs(dayjs(), "YYYY-MM")}
            format={"YYYY-MM"}
            picker="month"
            className="w-full md:w-auto"
          />
        </div>

        <div className="mt-6" style={{ height: "300px" }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={mockData}
              margin={{
                top: 10,
                right: 20,
                left: -10,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis tickFormatter={(value) => `${value}%`} />
              <Tooltip formatter={(value) => `${value.toFixed(2)}%`} />
              <Legend />
              <Bar dataKey="Earning" fill="#fda780" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default UserGrowth;
