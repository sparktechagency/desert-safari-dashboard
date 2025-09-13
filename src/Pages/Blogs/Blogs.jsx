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
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center my-4 gap-3">
        <h1 className="text-2xl font-bold">All Blogs</h1>

        <div className="flex flex-wrap gap-2 items-center">
          <Input
            placeholder="Search package name"
            value=""
            onChange={handleSearch}
            size="large"
            prefix={<SearchOutlined style={{ cursor: "pointer" }} />}
            className="w-60"
          />

          <button className="h-10 px-4 bg-primary rounded-md text-white flex items-center justify-center">
            Add New Package
          </button>
        </div>
      </div>
      <div>
        {blogsData.map((blog, index) => (
          <div
            key={index}
            className="flex justify-center items-center bg-secondary p-2 w-full"
          >
            <div className="w-[20%]">
              <img src={img1} alt={blog.title} className="w-40 h-20" />
            </div>
            <div className="blog-content w-[60%]">
              <h2>{blog.title}</h2>
              <p>{blog.description}</p>
            </div>
            <div className="blog-actions w-[20%]">
              <FaTrash />
              <FaEdit />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blogs;
