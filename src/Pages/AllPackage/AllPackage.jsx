/* eslint-disable no-unused-vars */
import { useState } from "react";
import { Input, DatePicker, Modal, Pagination, ConfigProvider } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { FaEdit, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import GobackButton from "../../Components/Shared/GobackButton";
import { useNavigate } from "react-router-dom";
import {
  useDeletPackgeMutation,
  useGetAllPackageQuery,
} from "../../redux/features/packageApi/packageApi";

const AllPackage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);
  const { data: getAllpackageData } = useGetAllPackageQuery({
    page: currentPage,
    limit: pageSize,
  });
  console.log(getAllpackageData?.data?.meta?.total);
  const [deletPackge] = useDeletPackgeMutation();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const navigate = useNavigate();

  // Extract API data safely
  const allPackages = getAllpackageData?.data?.result || [];

  // Search functionality
  const filteredPackages = allPackages.filter((pkg) =>
    pkg.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearch = (e) => setSearchTerm(e.target.value);
  const handleDateChange = (date, dateString) => {
    console.log("Selected date: ", dateString);
  };

  const handleAddPackage = () => navigate("/add-package");
  const handleEditPackage = (pkgId) => navigate(`/edit-package/${pkgId}`);

  const handleDelete = (pkgId) => {
    console.log(pkgId);
    Swal.fire({
      title: "Are you sure?",
      text: "You won’t be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deletPackge(pkgId);
          Swal.fire("Deleted!", "Package has been deleted.", "success");
        } catch (error) {
          Swal.fire(error?.message);
        }
      }
    });
  };

  const showModal = (pkg) => {
    setSelectedPackage(pkg);
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setSelectedPackage(null);
    setIsModalVisible(false);
  };
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-3">
        <div className="flex justify-center items-center gap-2">
          <GobackButton />
          <h1 className="text-2xl font-bold">All Packages</h1>
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

          {/* <DatePicker
            style={{ width: 200, height: 40 }}
            onChange={handleDateChange}
          /> */}

          <button
            onClick={handleAddPackage}
            className="h-10 px-4 bg-primary rounded-md text-white flex items-center justify-center"
          >
            Add New Package
          </button>
        </div>
      </div>

      {/* Packages Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredPackages.map((pkg) => (
          <div
            key={pkg._id}
            className="bg-white rounded-md shadow-md p-5 relative"
          >
            <img
              src={pkg.coverImage}
              alt={pkg.title}
              className="w-full h-48 object-cover rounded-md"
            />

            {/* Actions */}
            <div className="absolute top-5 right-6 flex gap-3 text-gray-600">
              <button
                onClick={() => handleEditPackage(pkg._id)}
                className="hover:text-blue-500 text-blue-500"
              >
                <FaEdit />
              </button>
              <button
                onClick={() => handleDelete(pkg._id)}
                className="hover:text-red-500 text-red-500"
              >
                <FaTrash />
              </button>
            </div>

            {/* Info */}
            <h2 className="text-lg font-semibold text-primary mt-3">
              {pkg.title}
            </h2>
            <p className="text-gray-600">{pkg.location}</p>

            <div className="flex items-baseline gap-2 mt-2">
              <p className="text-orange-600 text-xl font-bold">
                {pkg.adultPrice?.amount} {pkg.adultPrice?.currency}
              </p>
              <p className="text-red-500 text-sm">({pkg.discount}% OFF)</p>
            </div>

            <button
              onClick={() => showModal(pkg)}
              className="mt-3 bg-blue-500 text-white py-1 px-4 rounded-md"
            >
              View Details
            </button>
          </div>
        ))}
      </div>

      {/* Details Modal */}
      <Modal
        title={selectedPackage?.title}
        open={isModalVisible}
        onCancel={handleModalClose}
        footer={null}
        width={700}
      >
        {selectedPackage && (
          <div>
            <img
              src={selectedPackage.coverImage}
              alt={selectedPackage.title}
              className="w-full h-64 object-cover rounded-md mb-4"
            />
            <p className="text-gray-600 mb-2">{selectedPackage.description}</p>
            <p>
              <strong>Location:</strong> {selectedPackage.location}
            </p>
            <p>
              <strong>Duration:</strong> {selectedPackage.duration}
            </p>
            <p>
              <strong>Max Adults:</strong> {selectedPackage.max_adult}
            </p>
            <p>
              <strong>Child minimun Age:</strong>{" "}
              {selectedPackage.child_min_age}
            </p>
            <p>
              <strong>Activity:</strong>{" "}
              {selectedPackage.activity?.map((a) => a).join(", ")}
            </p>
            <p>
              <strong>Single Sitter dune Buggy:</strong>{" "}
              {selectedPackage.single_sitter_dune_buggy?.amount}{" "}
              {selectedPackage.single_sitter_dune_buggy?.currency}
            </p>
            <p>
              <strong>Four sitter dune buggy:</strong>{" "}
              {selectedPackage.four_sitter_dune_buggy?.amount}{" "}
              {selectedPackage.four_sitter_dune_buggy?.currency}
            </p>
            <p>
              <strong>Adult Price:</strong> {selectedPackage.adultPrice?.amount}{" "}
              {selectedPackage.adultPrice?.currency}
            </p>
            <p>
              <strong>Child Price:</strong> {selectedPackage.childPrice?.amount}{" "}
              {selectedPackage.childPrice?.currency}
            </p>
            <p>
              <strong>Quad Bike:</strong> {selectedPackage.quad_bike?.amount}{" "}
              {selectedPackage.quad_bike?.currency}
            </p>
            <p>
              <strong>Camel Bike:</strong> {selectedPackage.camel_bike?.amount}{" "}
              {selectedPackage.camel_bike?.currency}
            </p>
            <p>
              <strong>Camel Bike:</strong> {selectedPackage.camel_bike?.amount}{" "}
              {selectedPackage.camel_bike?.currency}
            </p>
            <p>
              <strong>Tea / Coffee / Soft Drinks:</strong>{" "}
              {selectedPackage.tea_cofee_soft_drinks?.amount}{" "}
              {selectedPackage.tea_cofee_soft_drinks?.currency}
            </p>
            <p>
              <strong>Hena Tattoos:</strong>{" "}
              {selectedPackage.hena_tattos?.amount}{" "}
              {selectedPackage.hena_tattos?.currency}
            </p>
            <p>
              <strong>Fire Show:</strong> {selectedPackage.fire_show?.amount}{" "}
              {selectedPackage.fire_show?.currency}
            </p>
            <p>
              <strong>Arabic Costume:</strong>{" "}
              {selectedPackage.arabic_costume?.amount}{" "}
              {selectedPackage.arabic_costume?.currency}
            </p>
            <p>
              <strong>Shisha Smoking:</strong>{" "}
              {selectedPackage.shisha_smoking?.amount}{" "}
              {selectedPackage.shisha_smoking?.currency}
            </p>
            <p>
              <strong>Falcon Picture:</strong>{" "}
              {selectedPackage.falcon_picture?.amount}{" "}
              {selectedPackage.falcon_picture?.currency}
            </p>
            <p>
              <strong>Sand Boarding:</strong>{" "}
              {selectedPackage.sand_boarding?.amount}{" "}
              {selectedPackage.sand_boarding?.currency}
            </p>
            <p>
              <strong>Belly Dance:</strong>{" "}
              {selectedPackage.belly_dance?.amount}{" "}
              {selectedPackage.belly_dance?.currency}
            </p>

            <p>
              <strong>Original Price:</strong>{" "}
              {selectedPackage.original_price?.amount}{" "}
              {selectedPackage.original_price?.currency}
            </p>
            <p>
              <strong>Discounted Price:</strong>{" "}
              {selectedPackage.discount_price?.amount}{" "}
              {selectedPackage.discount_price?.currency}
            </p>
            <p>
              <strong>Discount:</strong> {selectedPackage.discount}%
            </p>
            <p>
              <strong>Note:</strong> {selectedPackage.note}
            </p>
            <p>
              <strong>Availability:</strong>{" "}
              {selectedPackage.availability?.start} to{" "}
              {selectedPackage.availability?.end}
            </p>

            <p>
              <strong>Pickup Time:</strong> {selectedPackage.pickup}
            </p>
            <p>
              <strong>Drop-off Time:</strong> {selectedPackage.drop_off}
            </p>
            <p>
              <strong>Refund Policy:</strong> {selectedPackage.refund_policy}
            </p>

            <div className="mt-3">
              <h4 className="font-semibold">Included:</h4>
              <ul className="list-disc ml-5 text-gray-700">
                {selectedPackage.included?.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="mt-3">
              <h4 className="font-semibold">Excluded:</h4>
              <ul className="list-disc ml-5 text-gray-700">
                {selectedPackage.excluded?.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="mt-3">
              <h4 className="font-semibold">Tour Plan:</h4>
              <ul className="list-disc ml-5 text-gray-700">
                {selectedPackage.tour_plan?.map((step, idx) => (
                  <li key={idx}>{step}</li>
                ))}
              </ul>
            </div>
            {selectedPackage.images?.length > 0 && (
              <div className="mt-3">
                <h4 className="font-semibold">Gallery:</h4>
                <div className="grid grid-cols-3 gap-2">
                  {selectedPackage.images.map((img, idx) => (
                    <img
                      key={idx}
                      src={img}
                      className="w-full h-28 object-cover rounded-md"
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </Modal>

      {/* pagination: */}
      <ConfigProvider theme={{}}>
        <div className=" mt-5 flex justify-end">
          <Pagination
            current={currentPage}
            onChange={handlePageChange}
            pageSize={pageSize}
            total={getAllpackageData?.data?.meta?.total}
          />
        </div>
      </ConfigProvider>
    </div>
  );
};

export default AllPackage;
