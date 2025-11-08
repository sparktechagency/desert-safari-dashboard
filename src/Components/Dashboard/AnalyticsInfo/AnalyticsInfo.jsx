/* eslint-disable no-unused-vars */
import { Col } from "antd";
import { FaUsers } from "react-icons/fa";
import { useGetAllBookingQuery } from "../../../redux/features/bookingApi/bookingApi";
import { useState } from "react";
// import earning from "../../../assets/image/income.png";

const AnalyticsInfo = () => {
  const [date, setDate] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const { data: allBookingData, isLoading } = useGetAllBookingQuery({
    page: currentPage,
    limit: pageSize,
    date,
  });
  return (
    <div className="mb-10">
      <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
        {/* earning */}
        <Col>
          <div className="flex flex-col justify-start  border-r-2 py-4 px-6 bg-secondary rounded-md gap-5  h-auto md:h-28">
            <div className="flex  gap-3 items-cenetr">
              <p className="p-3 rounded-full bg-white flex justify-center items-center">
                <FaUsers className=" h-10 w-12 text-primary" />
              </p>
              <div>
                <p className="text-base md:text-2xl ">Total Booking</p>
                <p className="text-primary text-4xl font-bold ">
                  {allBookingData?.data?.meta?.total}
                </p>
              </div>
            </div>
          </div>
        </Col>

        {/* <Col>
          <div className="flex flex-col justify-start  border-r-2 py-4 px-6 bg-secondary rounded-md gap-5  h-auto md:h-28">
            <div className="flex  gap-3 items-cenetr">
              <p className="p-3 rounded-full bg-white flex justify-center items-center">
              <img src={earning} alt="" className="h-10 w-12"/>
              </p>
              <div>
                <p className="text-base md:text-2xl ">Total Earning</p>
                <p className="text-primary text-4xl font-bold ">AED 15,000</p>
              </div>
            </div>
          </div>
        </Col> */}
      </div>
    </div>
  );
};

export default AnalyticsInfo;
