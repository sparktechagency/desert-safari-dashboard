import { useState } from "react";
import { DatePicker, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";

import img1 from "../../assets/image/1.png";
import imgp from "../../assets/image/p.png";
import { FaEdit, FaTrash } from "react-icons/fa";
import GobackButton from "../../Components/Shared/GobackButton";
import { useNavigate } from "react-router-dom";

const AllPackage = () => {
  const samplePackages = [
    {
      id: 1,
      title: "57 Heritage Desert Experience",
      price: "AED 645.00",
      owner: "Dune Bashing",
      vat: "/ Person + VAT",
      originalPrice: "AED 774.00",
      discount: "20%",
      imageUrl: "https://via.placeholder.com/200",
    },
    {
      id: 2,
      title: "57 Premium Desert Safari with Dune Bashing",
      price: "AED 385.00",
      owner: "Dune Bashing",
      vat: "/ Person + VAT",
      originalPrice: "AED 774.00",
      discount: "20%",
      imageUrl: "https://via.placeholder.com/200",
    },
    {
      id: 3,
      title: "57 Dune Bashing + Heritage Desert Experience",
      price: "AED 745.00",
      owner: "Dune Bashing",
      vat: "/ Person + VAT",
      originalPrice: "AED 774.00",
      discount: "0%",
      imageUrl: "https://via.placeholder.com/200",
    },
  ];
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPackages, setFilteredPackages] = useState(samplePackages);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    const filtered = samplePackages.filter((pkg) =>
      pkg.title.toLowerCase().includes(term)
    );
    setFilteredPackages(filtered);
  };

  const handleDateChange = (date, dateString) => {
    console.log("Selected date: ", dateString);
  };

  const nevigate = useNavigate();
  const handleAddPackage = () => {
    nevigate("/add-package");
  };

  return (
    <div className="min-h-screen">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center my-4 gap-3">
        <div className="flex justify-center items-center gap-2">
          <GobackButton />
          <h1 className="text-2xl font-bold">All Package</h1>
        </div>

        <div className="flex flex-wrap gap-2 items-center">
          <Input
            placeholder="Search package name"
            value={searchTerm}
            onChange={handleSearch}
            size="large"
            prefix={<SearchOutlined style={{ cursor: "pointer" }} />}
            className="w-60"
          />

          <DatePicker
            style={{ width: 200, height: 40 }}
            onChange={handleDateChange}
          />

          <button onClick={handleAddPackage} className="h-10 px-4 bg-primary rounded-md text-white flex items-center justify-center">
            Add New Package
          </button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {filteredPackages.map((pkg) => (
          <div key={pkg.id}>
            <div className="bg-white rounded-md shadow-md p-5 relative">
              <img src={img1} alt="" className="w-full rounded-md" />

              <div className="absolute top-8 right-10 flex gap-3 text-gray-600">
                <button className="hover:text-blue-500">
                  <FaEdit />
                </button>
                <button className="hover:text-red-500">
                  <FaTrash />
                </button>
              </div>

              <h2 className="text-xl font-semibold text-primary py-2 mt-3">
                {pkg.title}
              </h2>

              <div className="flex justify-start items-center gap-3">
                <img src={imgp} alt="" className="h-5 w-10" />
                <p className="text-lg text-orange-600">{pkg.owner}</p>
              </div>

              <div className="flex flex-col items-start mt-2">
                <p className="text-red-600 text-xs font-semibold">
                  {pkg.discount}{" "}
                  <span className="text-[10px] align-top">OFF</span>
                </p>

                <div className="flex items-baseline gap-3">
                  <p className="text-red-600 line-through text-sm">
                    {pkg.originalPrice}
                  </p>
                  <p className="text-orange-600 text-2xl font-bold">
                    {pkg.price}
                    <span className="text-black text-sm font-normal ml-1">
                      {pkg.vat}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllPackage;
