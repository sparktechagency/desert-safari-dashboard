import { Input } from "antd";
import img1 from "../../assets/image/1.png";
import { SearchOutlined } from "@ant-design/icons";
import { FaEdit, FaTrash } from "react-icons/fa";

const blogsData = [
  {
    title: "The Ultimate Guide to Dubai Desert Safari What to Expect",
    description:
      "Experience the magic of the Arabian desert with our detailed guide. From thrilling dune bashing to serene camel rides, discover every adventure waiting for you. Learn about the best time to visit, what to pack, and how to make the most of your safari trip.",
    imageUrl: "your-image-url-here",
  },
];

const handleSearch = () => {};

const Blogs = () => {
  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center my-4 gap-3">
        <h1 className="text-2xl font-bold">All Blogs</h1>

        <div className="flex flex-wrap gap-2 items-center">
          <Input
            placeholder="Search blog title"
            value=""
            onChange={handleSearch}
            size="large"
            prefix={<SearchOutlined style={{ cursor: "pointer" }} />}
            className="w-60"
          />

          <button className="h-10 px-4 bg-primary rounded-md text-white flex items-center justify-center">
            Add New Blog
          </button>
        </div>
      </div>

      {/* Blog List */}
      <div className="space-y-3">
        {blogsData.map((blog, index) => (
          <div
            key={index}
            className="flex items-center bg-secondary p-3 rounded-md shadow-sm"
          >
            {/* Blog Image */}
            <div className="w-[15%]">
              <img
                src={img1}
                alt={blog.title}
                className="w-32 h-20 object-cover rounded"
              />
            </div>

            {/* Blog Content */}
            <div className="w-[65%] px-3">
              <h2 className="text-lg font-semibold">{blog.title}</h2>
              <p className="text-sm text-gray-700 line-clamp-2">
                {blog.description}
              </p>
            </div>

            {/* Blog Actions (Right Aligned) */}
            <div className="w-[20%] flex justify-end items-center gap-4 text-gray-600">
              <button className="hover:text-blue-500">
                <FaEdit />
              </button>
              <button className="hover:text-red-500">
                <FaTrash />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blogs;
