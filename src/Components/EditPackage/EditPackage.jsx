import { Form, Input, Select, Upload } from "antd";
import GobackButton from "../Shared/GobackButton";
import { FaImage, FaPlus, FaTimes } from "react-icons/fa";
import { useEffect, useState } from "react";
import {
  useGetSInglePackageQuery,
  useUpdatePackageMutation,
} from "../../redux/features/packageApi/packageApi";
import { useNavigate, useParams } from "react-router-dom";

const EditPackage = () => {
  const [form] = Form.useForm();
  const [UpdatePackage] = useUpdatePackageMutation();
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: singleData } = useGetSInglePackageQuery(id);
  console.log("single package", singleData?.data);
  const onFinish = () => {};
  // const [previewCoverImage, setPreviewCoverImage] = useState(null);
  // const [Cover, setCover] = useState(null);

  // const handleCoverBeforeUpload = (file) => {
  //   setCover(file);
  //   setPreviewCoverImage(URL.createObjectURL(file));
  //   return false;
  // };

  const [fileList, setFileList] = useState([]);

  const handleBeforeUpload = (file) => {
    setFileList((prevList) => [...prevList, file]);
    return false;
  };

  const removeImage = (fileToRemove) => {
    setFileList((prevList) =>
      prevList.filter((file) => file.uid !== fileToRemove.uid)
    );
  };
  const { Option } = Select;

  useEffect(() => {
    if (singleData?.data) {
      const d = singleData.data;

      form.setFieldsValue({
        title: d.title,
        location: d.location,
        duration: d.duration,
        max_adult: d.max_adult,
        child_min_age: d.child_min_age,
        pickup: d.pickup,
        availability: d.availability?.join(", "), // or keep array if using MultiSelect
        activity: d.activity?.join(", "),
        adultPrice: d.adultPrice.amount,
        childPrice: d.childPrice.amount,
        single_sitter_dune_buggy: d.single_sitter_dune_buggy.amount,
        four_sitter_dune_buggy: d.four_sitter_dune_buggy.amount,
        quad_bike: d.quad_bike.amount,
        camel_bike: d.camel_bike.amount,
        discount: d.discount,
        drop_off: d.drop_off,
        note: d.note,
        refund_policy: d.refund_policy,
        included: d.included?.join(", "),
        excluded: d.excluded?.join(", "),
        tour_plan: d.tour_plan?.join("\n"),
        description: d.description,
      });

      // Prefill existing images for preview
      setFileList(
        d.images.map((url, index) => ({
          uid: index.toString(),
          name: `image-${index}`,
          status: "done",
          url,
        }))
      );
    }
  }, [singleData, form]);
  return (
    <div className="min-h-screen">
      <div className="flex justify-start items-center gap-2">
        <GobackButton />
        <h1 className="text-2xl font-bold">Edit New Package</h1>
      </div>
      <div className="flex justify-center items-center">
        <Form
          form={form}
          name="Edit-new-package"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          layout="vertical"
          className="w-[70%]  "
        >
          <div className="w-full flex justify-between items-center gap-5">
            <div className="w-[100%]">
              <Form.Item
                name="package-images"
                label={<p className="text-md">Edit Packages Images</p>}
                required
              >
                <div className="border-2 border-[#fb5a10] h-32 p-5 flex justify-center items-center rounded-md">
                  <div className="flex gap-3 flex-wrap">
                    {/* {fileList.map((file) => (
                      <div
                        key={file.uid}
                        className="relative w-24 h-24 border border-neutral-300 rounded overflow-hidden"
                      >
                        <img
                          src={URL.createObjectURL(file)}
                          alt="preview"
                          className="w-full h-full object-cover"
                          height={100}
                          width={100}
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(file)}
                          className="absolute top-1 right-1 bg-white rounded-full p-1 text-xs"
                        >
                          <FaTimes className="text-red-600" />
                        </button>
                      </div>
                    ))} */}
                    {fileList.map((file) => (
                      <div
                        key={file.uid}
                        className="relative w-24 h-24 border border-neutral-300 rounded overflow-hidden"
                      >
                        <img
                          src={file.url || URL.createObjectURL(file)} // ✅ show server or local image
                          alt="preview"
                          className="w-full h-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(file)}
                          className="absolute top-1 right-1 bg-white rounded-full p-1 text-xs"
                        >
                          <FaTimes className="text-red-600" />
                        </button>
                      </div>
                    ))}

                    <Upload
                      multiple
                      showUploadList={false}
                      beforeUpload={handleBeforeUpload}
                    >
                      <div className="w-24 h-24 border border-dashed flex items-center justify-center rounded cursor-pointer hover:bg-gray-100">
                        <FaPlus className="text-xl text-gray-500" />
                      </div>
                    </Upload>
                  </div>
                </div>
              </Form.Item>
            </div>

            {/* <div className="w-[50%]">
              <Form.Item
                name="cover-image"
                label={<p className=" text-md">Edit Cover Image</p>}
              >
                <div className="border-2 border-[#fb5a10] h-32 p-5 flex justify-center items-center rounded-md">
                  <Upload
                    showUploadList={false}
                    maxCount={1}
                    beforeUpload={handleCoverBeforeUpload}
                  >
                    {!previewCoverImage ? (
                      <div className="flex flex-col items-center">
                        <FaImage className="text-neutral-400 h-10 w-10" />
                        <p className="text-neutral-500">Upload Cover Image</p>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center">
                        <img
                          src={previewCoverImage}
                          alt="Preview"
                          className="h-24 object-contain"
                        />
                        <p className="text-neutral-500">{Cover?.name}</p>
                      </div>
                    )}
                  </Upload>
                </div>
              </Form.Item>
            </div> */}
          </div>

          <Form.Item
            name="title"
            label={<p className=" text-md">Package Name</p>}
            style={{}}
          >
            <Input
              required
              style={{ padding: "6px" }}
              className=" text-md"
              placeholder="Type name"
            />
          </Form.Item>
          <Form.Item
            name="location"
            label={<p className=" text-md">Location Name</p>}
            style={{}}
          >
            <Input
              required
              style={{ padding: "6px" }}
              className=" text-md"
              placeholder="Type Location name"
            />
          </Form.Item>
      

          <div className="flex justify-between items-center gap-2">
            <Form.Item
              name="duration"
              label={<p className=" text-md">Duration</p>}
              style={{}}
            >
              <Input
                required
                style={{ padding: "6px" }}
                className=" text-md"
                placeholder="Type duration"
              />
            </Form.Item>
            <Form.Item
              name="max_adult"
              label={<p className=" text-md">Max Adults</p>}
            >
              <Input
                required
                style={{ padding: "6px" }}
                className=" text-md"
                placeholder="Max Adults"
              />
            </Form.Item>
            <Form.Item
              name="child_min_age"
              label={<p className=" text-md">Child Min Age</p>}
            >
              <Input
                required
                style={{ padding: "6px" }}
                className=" text-md"
                placeholder="Child Min Age"
              />
            </Form.Item>
            <Form.Item name="pickup" label={<p className=" text-md">Pickup</p>}>
              <Input
                required
                style={{ padding: "6px" }}
                className=" text-md"
                placeholder="Pickup"
              />
            </Form.Item>
            <Form.Item
              name="availability"
              label={<p className=" text-md">Availability</p>}
            >
              <Input
                required
                style={{ padding: "6px" }}
                className=" text-md"
                placeholder="Availability"
              />
            </Form.Item>
            <Form.Item
              name="activity"
              label={<p className="text-md">Activity</p>}
            >
              <Select placeholder="Select an activity">
                <Option value="dune-bashing">Dune Bashing</Option>
                <Option value="camel-ride">Camel Ride</Option>
                <Option value="quad-biking">Quad Biking</Option>
                <Option value="dune-buggy-ride">Dune Buggy Ride</Option>
                <Option value="tea-coffee-soft-drinks">
                  Tea, Coffee, & Soft Drinks
                </Option>
                <Option value="henna-tattoos">Henna Tattoos</Option>
                <Option value="fire-show">Fire Show in the Desert</Option>
                <Option value="arabic-costumes">Arabic Costumes</Option>
                <Option value="shisha-smoking">Shisha Smoking</Option>
                <Option value="falcon-pictures">Falcon To Take Pictures</Option>
                <Option value="sand-boarding">Sand-Boarding</Option>
                <Option value="belly-dance">Belly Dance Show</Option>
              </Select>
            </Form.Item>
          </div>

          <div className="w-[70%]">
            <div className="flex justify-between items-center gap-4 mb-4">
              <h1 className="w-[250px]">Adult Price</h1>
              <Form.Item name="adultPrice" className="text-md w-[150px]">
                <Input
                  required
                  style={{ padding: "6px" }}
                  className="text-md"
                  placeholder="00 AED"
                />
              </Form.Item>
              <Form.Item name="currency" className="w-[100px]">
                <Select placeholder="AED">
                  <Option value="AED">AED</Option>
                </Select>
              </Form.Item>
            </div>

            <div className="flex justify-between items-center gap-4 mb-4">
              <h1 className="w-[250px]">Child Price</h1>
              <Form.Item name="childPrice" className="text-md w-[150px]">
                <Input
                  required
                  style={{ padding: "6px" }}
                  className="text-md"
                  placeholder="00 AED"
                />
              </Form.Item>
              <Form.Item name="currency" className="w-[100px]">
                <Select placeholder="AED">
                  <Option value="AED">AED</Option>
                </Select>
              </Form.Item>
            </div>

            <div className="flex justify-between items-center gap-4 mb-4">
              <h1 className="w-[250px]">Single Seater Dune Buggy 30 mins</h1>
              <Form.Item name="single_sitter_dune_buggy" className="text-md w-[150px]">
                <Input
                  required
                  style={{ padding: "6px" }}
                  className="text-md"
                  placeholder="00 AED"
                />
              </Form.Item>
              <Form.Item name="currency" className="w-[100px]">
                <Select placeholder="AED">
                  <Option value="AED">AED</Option>
                </Select>
              </Form.Item>
            </div>

            <div className="flex justify-between items-center gap-4 mb-4">
              <h1 className="w-[250px]">20 Minutes Quad Bike</h1>
              <Form.Item name="quad_bike" className="text-md w-[150px]">
                <Input
                  required
                  style={{ padding: "6px" }}
                  className="text-md"
                  placeholder="00 AED"
                />
              </Form.Item>
              <Form.Item name="currency" className="w-[100px]">
                <Select placeholder="AED">
                  <Option value="AED">AED</Option>
                </Select>
              </Form.Item>
            </div>

            <div className="flex justify-between items-center gap-4 mb-4">
              <h1 className="w-[250px]">30 Minutes Camel Bike</h1>
              <Form.Item name="camel_bike" className="text-md w-[150px]">
                <Input
                  required
                  style={{ padding: "6px" }}
                  className="text-md"
                  placeholder="00 AED"
                />
              </Form.Item>
              <Form.Item name="currency" className="w-[100px]">
                <Select placeholder="AED">
                  <Option value="AED">AED</Option>
                </Select>
              </Form.Item>
            </div>

            <div className="flex justify-between items-center gap-4 mb-4">
              <h1 className="w-[250px]">20 Minutes Quad Bike</h1>
              <Form.Item name="quad-bike-2" className="text-md w-[150px]">
                <Input
                  required
                  style={{ padding: "6px" }}
                  className="text-md"
                  placeholder="00 AED"
                />
              </Form.Item>
              <Form.Item name="currency" className="w-[100px]">
                <Select placeholder="AED">
                  <Option value="AED">AED</Option>
                </Select>
              </Form.Item>
            </div>

            <div className="flex justify-between items-center gap-4 mb-4">
              <h1 className="w-[250px]">4 Seater Dune Buggy 30 Mins</h1>
              <Form.Item
                name="four_sitter_dune_buggy"
                className="text-md w-[150px]"
              >
                <Input
                  required
                  style={{ padding: "6px" }}
                  className="text-md"
                  placeholder="00 AED"
                />
              </Form.Item>
              <Form.Item name="currency" className="w-[100px]">
                <Select placeholder="AED">
                  <Option value="AED">AED</Option>
                </Select>
              </Form.Item>
            </div>

            <div className="flex justify-between items-center gap-4 mb-4">
              <h1 className="w-[250px]">Overall Discount</h1>
              <Form.Item name="discount" className="text-md w-[150px]">
                <Input
                  required
                  style={{ padding: "6px" }}
                  className="text-md"
                  placeholder="00 %"
                />
              </Form.Item>
              <Form.Item name="currency" className="w-[100px]">
                <Select placeholder="AED">
                  <Option value="AED">AED</Option>
                </Select>
              </Form.Item>
            </div>
          </div>

          <Form.Item
            name="expectedPickup"
            label="Expected Pickup"
            className="text-md"
          >
            <Input
              required
              style={{ padding: "6px" }}
              className="text-md"
              placeholder="00:00"
            />
          </Form.Item>

          <Form.Item
            name="drop_off"
            label="Expected Drop off"
            className="text-md"
          >
            <Input
              required
              style={{ padding: "6px" }}
              className="text-md"
              placeholder="00:00"
            />
          </Form.Item>

          <Form.Item
            name="note"
            label="Important Note"
            className="text-md"
          >
            <Input.TextArea
              required
              style={{ padding: "6px" }}
              className="text-md"
              placeholder="Type here"
            />
          </Form.Item>

          <Form.Item
            name="refund_policy"
            label="Cancellation & Refund Policy"
            className="text-md"
          >
            <Input.TextArea
              required
              style={{ padding: "6px" }}
              className="text-md"
              placeholder="Type here"
            />
          </Form.Item>

          <Form.Item
            name="included"
            label="Included "
            className="text-md"
          >
            <Input.TextArea
              required
              style={{ padding: "6px" }}
              className="text-md"
              placeholder="Type here"
            />
          </Form.Item>
          <Form.Item
            name="excluded"
            label="Excluded"
            className="text-md"
          >
            <Input.TextArea
              required
              style={{ padding: "6px" }}
              className="text-md"
              placeholder="Type here"
            />
          </Form.Item>

          <Form.Item name="tour_plan" label="Tour Plan" className="text-md">
            <Input.TextArea
              required
              style={{ padding: "6px" }}
              className="text-md"
              placeholder="Type here"
            />
          </Form.Item>

          <Form.Item name="description" label="Description" className="text-md">
            <Input.TextArea
              required
              style={{ padding: "6px" }}
              className="text-md"
              placeholder="Type here"
            />
          </Form.Item>
          <Form.Item className="text-center">
            <button
              className="text-center w-full  p-2 font-bold text-2xl bg-primary  text-white px-10 py-2 rounded-md shadow-lg"
              type="submit"
            >
              Upload
            </button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default EditPackage;
