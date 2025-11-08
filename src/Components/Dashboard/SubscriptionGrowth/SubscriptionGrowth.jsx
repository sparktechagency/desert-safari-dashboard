import { DatePicker } from "antd";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  AreaChart,
  Area,
  ResponsiveContainer,
} from "recharts";
import dayjs from "dayjs";
import { useState, useEffect } from "react";
import { useGetbookingStatsQuery } from "../../../redux/features/bookingApi/bookingApi";

const SubscriptionGrowth = () => {
  const [selectedYear, setSelectedYear] = useState(dayjs().year());
  const { data: bookingData, refetch } = useGetbookingStatsQuery(selectedYear);

  const chartData = bookingData?.data?.monthlyData?.map((item) => ({
    name: item.month,
    earnings: item.total,
  })) || [];

  const onChange = (date, dateString) => {
    setSelectedYear(dateString);
  };

  useEffect(() => {
    refetch();
  }, [selectedYear, refetch]);

  return (
    <div className="mt-4 p-4">
      <div className="bg-gray-50 rounded-lg shadow px-4 py-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <h1 className="text-lg md:text-xl font-medium">
            Total Booking Overview
          </h1>
          <DatePicker
            onChange={onChange}
            defaultValue={dayjs(selectedYear, "YYYY")}
            format={"YYYY"}
            picker="year"
            className="w-full md:w-auto"
          />
        </div>

        <div className="mt-6" style={{ height: "300px" }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={chartData}
              margin={{ top: 10, right: 20, left: -10, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorEarnings" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#fda780" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#fda780" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="earnings"
                stroke="#fda780"
                fillOpacity={1}
                fill="url(#colorEarnings)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionGrowth;
