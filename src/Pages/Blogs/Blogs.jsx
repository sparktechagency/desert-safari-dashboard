import { Input, message, Modal, Upload, Form } from "antd";
import img1 from "../../assets/image/1.png";
import { SearchOutlined } from "@ant-design/icons";
import { FaEdit, FaImage, FaTrash } from "react-icons/fa";
import GobackButton from "../../Components/Shared/GobackButton";
import Swal from "sweetalert2";
import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const Blogs = () => {
  const blogsData = [
    {
      title: "The Ultimate Guide to Dubai Desert Safari What to Expect",
      description:
        "Experience the magic of the Arabian desert with our detailed guide. From thrilling dune bashing to serene camel rides, discover every adventure waiting for you.",
      imageUrl: img1,
    },
  ];

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [editorValue, setEditorValue] = useState("");
  const [editingBlog, setEditingBlog] = useState(null);

  const [previewCoverImage, setPreviewCoverImage] = useState(null);
  const [Cover, setCover] = useState(null);

  // For Edit Blog
  const [previewEditImage, setPreviewEditImage] = useState(null);
  const [EditCover, setEditCover] = useState(null);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setEditorValue("");
    setPreviewCoverImage(null);
    setCover(null);
  };

  const showEditModal = (blog) => {
    setEditingBlog(blog);
    setEditorValue(blog.description);
    setPreviewEditImage(blog.imageUrl);
    setIsEditModalVisible(true);
  };

  const handleEditCancel = () => {
    setIsEditModalVisible(false);
    setEditingBlog(null);
    setPreviewEditImage(null);
    setEditCover(null);
  };

  const handleDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Deleted!", "Your blog has been deleted.", "success");
      }
    });
  };

  const handleFinish = (values) => {
    console.log("Blog Data:", { ...values, description: editorValue });
    message.success("Blog added successfully!");
    handleCancel();
  };

  const handleEditFinish = (values) => {
    console.log("Edited Blog Data:", { ...values, description: editorValue });
    message.success("Blog updated successfully!");
    handleEditCancel();
  };

  const handleCoverBeforeUpload = (file) => {
    setCover(file);
    setPreviewCoverImage(URL.createObjectURL(file));
    return false;
  };

  const handleEditCoverBeforeUpload = (file) => {
    setEditCover(file);
    setPreviewEditImage(URL.createObjectURL(file));
    return false;
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center my-4 gap-3">
        <div className="flex justify-center items-center gap-2">
          <GobackButton />
          <h1 className="text-2xl font-bold">All Blogs</h1>
        </div>

        <div className="flex flex-wrap gap-2 items-center">
          <Input
            placeholder="Search blog title"
            size="large"
            prefix={<SearchOutlined style={{ cursor: "pointer" }} />}
            className="w-60"
          />
          <button
            onClick={showModal}
            className="h-10 px-4 bg-primary rounded-md text-white flex items-center justify-center"
          >
            Add New Blog
          </button>
        </div>
      </div>

      <div className="space-y-3">
        {blogsData.map((blog, index) => (
          <div
            key={index}
            className="flex items-center bg-secondary p-3 rounded-md shadow-sm"
          >
            <div className="w-[15%]">
              <img
                src={blog.imageUrl}
                alt={blog.title}
                className="w-32 h-20 object-cover rounded"
              />
            </div>
            <div className="w-[65%] px-3">
              <h2 className="text-lg font-semibold">{blog.title}</h2>
              <p className="text-sm text-gray-700 line-clamp-2">
                {blog.description}
              </p>
            </div>
            <div className="w-[20%] flex justify-end items-center gap-4 text-gray-600">
              <button
                className="hover:text-blue-500"
                onClick={() => showEditModal(blog)}
              >
                <FaEdit />
              </button>
              <button className="hover:text-red-500" onClick={handleDelete}>
                <FaTrash />
              </button>
            </div>
          </div>
        ))}
      </div>

      <Modal
        title="Add Blog"
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        width={700}
      >
        <Form layout="vertical" onFinish={handleFinish}>
          <div className="flex justify-between items-center gap-5">
            <div className="w-[50%]">
              <Form.Item
                label="Title"
                name="title"
                rules={[
                  { required: true, message: "Please input the blog title!" },
                ]}
              >
                <Input placeholder="Write your title" />
              </Form.Item>
            </div>
            <div className="w-[50%]">
              <Form.Item name="cover-image" label="Add Blog Image">
                <div className="border-2 border-[#fb5a10] h-20 p-5 flex justify-center items-center rounded-md">
                  <Upload
                    showUploadList={false}
                    maxCount={1}
                    beforeUpload={handleCoverBeforeUpload}
                  >
                    {!previewCoverImage ? (
                      <div className="flex flex-col items-center">
                        <FaImage className="text-neutral-400 h-10 w-10" />
                        <p className="text-neutral-500">Upload Blog Image</p>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center">
                        <img
                          src={previewCoverImage}
                          alt="Preview"
                          className="h-12 object-contain"
                        />
                        <p className="text-neutral-500">{Cover?.name}</p>
                      </div>
                    )}
                  </Upload>
                </div>
              </Form.Item>
            </div>
          </div>
          <Form.Item
            label="Blog Content"
            name="description"
            rules={[
              { required: true, message: "Please write your blog content!" },
            ]}
          >
            <ReactQuill
              style={{ height: 300 }}
              theme="snow"
              value={editorValue}
              onChange={setEditorValue}
              placeholder="Write your blog here..."
            />
          </Form.Item>
          <Form.Item type="submit">
            <button
              type="submit"
              className="w-full bg-primary text-white py-3 rounded-md"
            >
              Confirm
            </button>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Edit Blog"
        open={isEditModalVisible}
        onCancel={handleEditCancel}
        footer={null}
        width={700}
      >
        <Form
          layout="vertical"
          onFinish={handleEditFinish}
          initialValues={{
            title: editingBlog?.title,
          }}
        >
          <div className="flex justify-between items-center gap-5">
            <div className="w-[50%]">
              <Form.Item
                label="Title"
                name="title"
                rules={[
                  { required: true, message: "Please input the blog title!" },
                ]}
              >
                <Input placeholder="Write your title" />
              </Form.Item>
            </div>
            <div className="w-[50%]">
              <Form.Item name="cover-image" label="Change Blog Image">
                <div className="border-2 border-[#fb5a10] h-20 p-5 flex justify-center items-center rounded-md">
                  <Upload
                    showUploadList={false}
                    maxCount={1}
                    beforeUpload={handleEditCoverBeforeUpload}
                  >
                    {!previewEditImage ? (
                      <div className="flex flex-col items-center">
                        <FaImage className="text-neutral-400 h-10 w-10" />
                        <p className="text-neutral-500">Upload Blog Image</p>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center">
                        <img
                          src={previewEditImage}
                          alt="Preview"
                          className="h-12 object-contain"
                        />
                        <p className="text-neutral-500">{EditCover?.name}</p>
                      </div>
                    )}
                  </Upload>
                </div>
              </Form.Item>
            </div>
          </div>
          <Form.Item
            label="Blog Content"
            name="description"
            rules={[
              { required: true, message: "Please write your blog content!" },
            ]}
          >
            <ReactQuill
              style={{ height: 300 }}
              theme="snow"
              value={editorValue}
              onChange={setEditorValue}
              placeholder="Write your blog here..."
            />
          </Form.Item>
          <Form.Item type="submit">
            <button
              type="submit"
              className="w-full bg-primary text-white py-3 rounded-md"
            >
              Update Blog
            </button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Blogs;
