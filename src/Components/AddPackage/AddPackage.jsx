import { DatePicker, Form, Input, message, Select, Upload } from "antd";
import GobackButton from "../Shared/GobackButton";
import { FaImage, FaPlus, FaTimes } from "react-icons/fa";
import { useState } from "react";
import { useCreatePackageMutation } from "../../redux/features/packageApi/packageApi";

const AddPackage = () => {
  const [createPackage] = useCreatePackageMutation();
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  console.log("fileList", fileList);
  const { Option } = Select;

  const handleBeforeUpload = (file) => {
    setFileList((prevList) => [...prevList, file]);

    return false;
  };

  const removeImage = (fileToRemove) => {
    setFileList((prevList) =>
      prevList.filter((file) => file.uid !== fileToRemove.uid)
    );
  };

  const [previewCoverImage, setPreviewCoverImage] = useState(null);
  const [Cover, setCover] = useState(null);
  // console.log(Cover);

  const handleCoverBeforeUpload = (file) => {
    setCover(file);
    setPreviewCoverImage(URL.createObjectURL(file));
    return false;
  };

  const onFinish = async (values) => {
    const availabilityObj = values.availability
      ? {
          start: values.availability.start?.format("YYYY-MM-DD"),
          end: values.availability.end?.format("YYYY-MM-DD"),
        }
      : undefined;
    const allowedActivities = [
      "Dune Bashing",
      "Camel Ride",
      "Quad Biking",
      "Dune Buggy Ride",
      "Single Sitter Dune Buggy Ride",
      "4 Sitter Dune Buggy Ride",
      "Tea, Coffee, & Soft Drinks",
      "Henna Tattoos",
      "Fire Show in the Desert",
      "Arabic Costumes",
      "Shisha Smoking",
      "Falcon To Take Pictures",
      "Sand-Boarding",
      "Belly Dance Show",
    ];

    const formattedActivity = values.activity
      ? Array.isArray(values.activity)
        ? values.activity.filter((item) => allowedActivities.includes(item))
        : allowedActivities.includes(values.activity)
        ? [values.activity]
        : []
      : [];
    const imageUrls = fileList.map((file) => file.uploadedUrl);
    console.log(imageUrls);
    try {
      const formData = new FormData();
      const data = {
        title: values.title,
        location: values.location,
        duration: values.duration,
        max_adult: Number(values.max_adult) || 0,
        child_min_age: Number(values.child_min_age) || 0,
        pickup: values.pickup,
        drop_off: values.drop_off,

        availability: availabilityObj,

        activity: formattedActivity,
        adultPrice: { amount: Number(values.adultPrice) || 0, currency: "AED" },
        childPrice: { amount: Number(values.childPrice) || 0, currency: "AED" },
        single_sitter_dune_buggy: {
          amount: Number(values.single_sitter_dune_buggy) || 0,
          currency: "AED",
        },
        four_sitter_dune_buggy: {
          amount: Number(values.four_sitter_dune_buggy) || 0,
          currency: "AED",
        },
        quad_bike: { amount: Number(values.quad_bike) || 0, currency: "AED" },
        camel_bike: { amount: Number(values.camel_bike) || 0, currency: "AED" },
        discount: Number(values.discount) || 0,
        note: values.note,
        refund_policy: values.refund_policy,
        included: values.included ? values.included.split("\n") : [],
        excluded: values.excluded ? values.excluded.split("\n") : [],
        tour_plan: values.tour_plan ? values.tour_plan.split("\n") : [],
        description: values.description,
      };
      console.log(data);
      formData.append("data", JSON.stringify(data));

      // ✅ Single Cover Image
      if (Cover) {
        formData.append("coverImage", Cover);
      }
      (fileList || [])
        .map((f) => f.originFileObj ?? f)
        .forEach((file) => {
          formData.append("image", file, file.name || "image");
        });

      console.log(...formData);

      const res = await createPackage(formData).unwrap();

      if (res?.success) {
        message.success("Package created successfully!");
        form.resetFields();
        setFileList([]);
      } else {
        message.error(res?.message || "Failed to create package");
      }
    } catch (error) {
      console.error("Error creating package:", error);
      message.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen">
      <div className="flex justify-start items-center gap-2">
        <GobackButton />
        <h1 className="text-2xl font-bold">Add New Package</h1>
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
            <div className="w-[50%]">
              <Form.Item
                name="images"
                label={<p className="text-md">Add Packages Images</p>}
              >
                <div className="border-2 border-[#fb5a10] h-auto p-3 flex justify-center items-center rounded-md">
                  <div className="flex gap-3 flex-wrap">
                    {fileList.map((file) => (
                      <div
                        key={file.uid}
                        className="relative w-24 h-24 border border-neutral-300 rounded overflow-hidden"
                      >
                        <img
                          src={file.url || URL.createObjectURL(file)}
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

            <div className="w-[50%]">
              <Form.Item
                name="coverImage"
                label={<p className=" text-md">Add Cover Image</p>}
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
            </div>
          </div>

          <Form.Item
            name="title"
            label={<p className=" text-md">Package Name</p>}
            style={{}}
          >
            <Input
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
                style={{ padding: "6px" }}
                className=" text-md"
                placeholder="Child Min Age"
              />
            </Form.Item>
            <Form.Item name="pickup" label={<p className=" text-md">Pickup</p>}>
              <Input
                style={{ padding: "6px" }}
                className=" text-md"
                placeholder="Pickup"
              />
            </Form.Item>

            <Form.Item label={<p className="text-md">Availability</p>}>
              <div className="flex gap-2">
                <Form.Item
                  name={["availability", "start"]}
                  rules={[
                    { required: true, message: "Start date is required" },
                  ]}
                  className="mb-0"
                >
                  <DatePicker
                    style={{ padding: "6px" }}
                    className="text-md"
                    placeholder="Start Date"
                  />
                </Form.Item>

                <Form.Item
                  name={["availability", "end"]}
                  dependencies={[["availability", "start"]]}
                  rules={[
                    { required: true, message: "End date is required" },
                    // ({ getFieldValue }) => ({
                    //   validator(_, value) {
                    //     const start = getFieldValue(["availability", "start"]);
                    //     if (
                    //       !start ||
                    //       !value ||
                    //       value.isSameOrAfter(start, "day")
                    //     ) {
                    //       return Promise.resolve();
                    //     }
                    //     return Promise.reject(
                    //       new Error("End date must be after start date")
                    //     );
                    //   },
                    // }),
                  ]}
                  className="mb-0"
                >
                  <DatePicker
                    style={{ padding: "6px" }}
                    className="text-md"
                    placeholder="End Date"
                  />
                </Form.Item>
              </div>
            </Form.Item>

            <Form.Item
              name="activity"
              label={<p className="text-md">Activity</p>}
            >
              <Select
                mode="multiple"
                placeholder="Select Activities"
                style={{ width: 200 }}
              >
                <Option value="Dune Bashing">Dune Bashing</Option>
                <Option value="Camel Ride">Camel Ride</Option>
                <Option value="Quad Biking">Quad Biking</Option>
                <Option value="Dune Buggy Ride">Dune Buggy Ride</Option>
                <Option value="Single Sitter Dune Buggy Ride">
                  Single Sitter Dune Buggy Ride
                </Option>
                <Option value="4 Sitter Dune Buggy Ride">
                  4 Sitter Dune Buggy Ride
                </Option>
                <Option value="Tea, Coffee, & Soft Drinks">
                  Tea, Coffee, & Soft Drinks
                </Option>
                <Option value="Henna Tattoos">Henna Tattoos</Option>
                <Option value="Fire Show in the Desert">
                  Fire Show in the Desert
                </Option>
                <Option value="Arabic Costumes">Arabic Costumes</Option>
                <Option value="Shisha Smoking">Shisha Smoking</Option>
                <Option value="Falcon To Take Pictures">
                  Falcon To Take Pictures
                </Option>
                <Option value="Sand-Boarding">Sand-Boarding</Option>
                <Option value="Belly Dance Show">Belly Dance Show</Option>
              </Select>
            </Form.Item>
          </div>

          <div className="w-[70%]">
            <div className="flex justify-between items-center gap-4 mb-4">
              <h1 className="w-[250px]">Adult Price</h1>
              <Form.Item name="adultPrice" className="text-md w-[150px]">
                <Input
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
              <Form.Item
                name="single_sitter_dune_buggy"
                className="text-md w-[150px]"
              >
                <Input
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
              style={{ padding: "6px" }}
              className="text-md"
              placeholder="00:00"
            />
          </Form.Item>

          <Form.Item name="note" label="Important Note" className="text-md">
            <Input.TextArea
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
              style={{ padding: "6px" }}
              className="text-md"
              placeholder="Type here"
            />
          </Form.Item>

          <Form.Item name="included" label="Included " className="text-md">
            <Input.TextArea
              style={{ padding: "6px" }}
              className="text-md"
              placeholder="Type here"
            />
          </Form.Item>
          <Form.Item name="excluded" label="Excluded" className="text-md">
            <Input.TextArea
              style={{ padding: "6px" }}
              className="text-md"
              placeholder="Type here"
            />
          </Form.Item>

          <Form.Item name="tour_plan" label="Tour Plan" className="text-md">
            <Input.TextArea
              style={{ padding: "6px" }}
              className="text-md"
              placeholder="Type here"
            />
          </Form.Item>

          <Form.Item name="description" label="Description" className="text-md">
            <Input.TextArea
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

export default AddPackage;
