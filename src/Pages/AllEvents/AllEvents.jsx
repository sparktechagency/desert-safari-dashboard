/* eslint-disable react/prop-types */
import { FaImage, FaPen, FaTrashAlt } from "react-icons/fa";
import { useState } from "react";
import {
  ConfigProvider,
  Form,
  Input,
  Modal,
  TimePicker,
  Upload,
  InputNumber,
  Tag,
  message,
} from "antd";
import { useForm } from "antd/es/form/Form";
import Swal from "sweetalert2";
import GobackButton from "../../Components/Shared/GobackButton";
import {

  useCreateEventsMutation,
  useDeletEventMutation,
  useGetAllEventsQuery,
  useUpdateEventMutation,
} from "../../redux/features/eventsApi/eventsApi";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

const TIME_FORMAT = "h:mm A"; 

function parseTimeToDayjs(value) {
  if (!value) return null;
  const tryFormat = dayjs(value, TIME_FORMAT, true);
  if (tryFormat.isValid()) return tryFormat;
  const fallback = dayjs(value);
  return fallback.isValid() ? fallback : null;
}

function FeaturesInput({
  value = [],
  onChange,
  maxItems = 10,
  maxLength = 80,
  placeholder = "Type a feature and press Enter",
}) {
  const [draft, setDraft] = useState("");

  const normalized = (s) => s.trim();
  const exists = (arr, s) =>
    arr.some((x) => x.toLowerCase() === s.toLowerCase());

  const commit = () => {
    const text = normalized(draft);
    if (!text) return;

    if (value.length >= maxItems) {
      message.warning(`You can add at most ${maxItems} features.`);
      return;
    }
    if (text.length > maxLength) {
      message.warning(`Feature is too long (>${maxLength} chars).`);
      return;
    }
    if (exists(value, text)) {
      setDraft("");
      return;
    }
    const next = [...value, text];
    onChange?.(next);
    setDraft("");
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      commit(); 
    }
  };

  const removeAt = (idx) => {
    const next = value.filter((_, i) => i !== idx);
    onChange?.(next);
  };

  return (
    <div className="w-full">
      <div className="flex flex-wrap gap-2 mb-2">
        {Array.isArray(value) &&
          value.map((item, idx) => (
            <Tag key={`${item}-${idx}`} closable onClose={() => removeAt(idx)}>
              {item}
            </Tag>
          ))}
      </div>
      <Input
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onKeyDown={onKeyDown}
        onBlur={commit}
        placeholder={placeholder}
        allowClear
      />
      <div className="text-xs text-neutral-500 mt-1">
        Press <span className="font-semibold">Enter</span> to add. Commas are
        allowed in a feature.
      </div>
    </div>
  );
}

const AllEvents = () => {
  const { data: allEventsData } = useGetAllEventsQuery();
  const [deletEvent] = useDeletEventMutation();
  const [UpdateEvent] = useUpdateEventMutation();
  const [createEvents] = useCreateEventsMutation();

  const data = allEventsData?.data?.result ?? [];

  const [addForm] = useForm();
  const [editForm] = useForm();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [banner, setBanner] = useState(null);
  const [editingEvent, setEditingEvent] = useState(null);

  const handleBeforeUpload = (file) => {
    setBanner(file);
    setPreviewImage(URL.createObjectURL(file));
    return false; 
  };

  const handleAddModal = () => {
    setIsModalOpen(true);
    setPreviewImage(null);
    setBanner(null);
    addForm.resetFields();
    addForm.setFieldsValue({ features: [] }); 
  };

  const handleEditModal = (event) => {
    setEditingEvent(event);

    editForm.setFieldsValue({
      title: event.title,
      description: event.description,
      startTime: parseTimeToDayjs(event.start_time),
      endTime: parseTimeToDayjs(event.end_time),
      features: Array.isArray(event.features) ? event.features : [],
      max_child:
        typeof event.max_child === "number"
          ? event.max_child
          : Number(event.max_child) || undefined,
      max_adult:
        typeof event.max_adult === "number"
          ? event.max_adult
          : Number(event.max_adult) || undefined,
    });

    setPreviewImage(event.image || null);
    setBanner(null);
    setIsEditModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    addForm.resetFields();
    setPreviewImage(null);
    setBanner(null);
  };

  const handleEditCancel = () => {
    setIsEditModalOpen(false);
    editForm.resetFields();
    setPreviewImage(null);
    setBanner(null);
    setEditingEvent(null);
  };

  const onFinish = async (values) => {
    try {
      const startTime = values.startTime ? dayjs(values.startTime) : null;
      const endTime = values.endTime ? dayjs(values.endTime) : null;

      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("description", values.description);
      if (values.max_adult !== undefined)
        formData.append("max_adult", String(values.max_adult));
      if (values.max_child !== undefined)
        formData.append("max_child", String(values.max_child));

      (values.features || []).forEach((f) => {
        formData.append("features", f);
      });

      if (startTime)
        formData.append("start_time", startTime.format(TIME_FORMAT));
      if (endTime) formData.append("end_time", endTime.format(TIME_FORMAT));
      if (banner) formData.append("image", banner);

      const response = await createEvents(formData).unwrap();
      Swal.fire(response?.message || "Event created");

      setIsModalOpen(false);
      addForm.resetFields();
      setPreviewImage(null);
      setBanner(null);
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Something went wrong!", "error");
    }
  };

  const onEditFinish = async (values) => {
    try {
      const startTime = values.startTime ? dayjs(values.startTime) : null;
      const endTime = values.endTime ? dayjs(values.endTime) : null;

      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("description", values.description);
      if (values.max_adult !== undefined)
        formData.append("max_adult", String(values.max_adult));
      if (values.max_child !== undefined)
        formData.append("max_child", String(values.max_child));
      (values.features || []).forEach((f) => {
        formData.append("features", f);
      });

      if (startTime)
        formData.append("start_time", startTime.format(TIME_FORMAT));
      if (endTime) formData.append("end_time", endTime.format(TIME_FORMAT));
      if (banner) formData.append("image", banner);

      const response = await UpdateEvent({
        _id: editingEvent?._id,
        data: formData,
      }).unwrap();

      Swal.fire(response?.message || "Event updated");
      setIsEditModalOpen(false);
      editForm.resetFields();
      setPreviewImage(null);
      setBanner(null);
      setEditingEvent(null);
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Something went wrong!", "error");
    }
  };

  const handleDelete = (_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deletEvent(_id).unwrap();
          Swal.fire({
            title: "Deleted!",
            text: "Your event has been deleted.",
            icon: "success",
          });
        } catch (error) {
          Swal.fire(error?.message || "Delete failed");
        }
      }
    });
  };

  return (
    <div className="min-h-screen">
      <div className="flex justify-between items-center my-6 px-6">
        <div className="flex justify-center items-center gap-2">
          <GobackButton />
          <h1 className="text-2xl font-bold">
            Exclusive arrangement for Corporate
          </h1>
        </div>

        <button
          onClick={handleAddModal}
          className="px-4 py-2 rounded-md bg-primary text-white shadow-md hover:bg-orange-600 transition"
        >
          Add Events
        </button>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-6">
        {data.map((event) => (
          <div
            key={event._id}
            className="relative rounded-lg overflow-hidden group"
          >
            <img
              src={event.image}
              alt={event.title}
              className="absolute inset-0 w-full h-full object-cover"
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-l from-[rgba(216,101,48,0.8)] to-[rgba(0,0,0,0.2)]" />

            {/* Actions */}
            <div className="absolute top-3 left-3 z-20 flex items-center gap-2">
              <button
                onClick={() => handleDelete(event._id)}
                className="text-2xl text-white rounded-full p-1 shadow hover:scale-110 transition"
                title="Delete"
              >
                <FaTrashAlt />
              </button>
              <button
                onClick={() => handleEditModal(event)}
                className="text-2xl text-white rounded-full p-1 shadow hover:scale-110 transition"
                title="Edit"
              >
                <FaPen />
              </button>
            </div>

            <div className="relative z-10 p-5 text-white flex flex-col justify-end min-h-[260px]">
              <h2 className="font-bold text-2xl mb-2">{event.title}</h2>

              <div className="bg-orange-200 text-black inline-block px-3 py-1 rounded-md mb-3 font-medium">
                {event.start_time} — {event.end_time}
              </div>

              <div className="bg-white/95 text-black px-4 py-2 rounded-md mb-3 font-semibold">
                {event.description}
              </div>

              {Array.isArray(event.features) && event.features.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {event.features.map((f, idx) => (
                    <Tag key={`${event._id}-feature-${idx}`}>{f}</Tag>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <ConfigProvider
        theme={{
          components: {
            Button: {
              defaultHoverBorderColor: "rgb(47,84,235)",
              defaultHoverColor: "rgb(47,84,235)",
              defaultBorderColor: "rgb(47,84,235)",
            },
          },
        }}
      >
        {/* Add Modal */}
        <Modal
          title="Add Events"
          open={isModalOpen}
          onCancel={handleCancel}
          footer={null}
        >
          <Form form={addForm} onFinish={onFinish} layout="vertical">
            <Form.Item name="image">
              <div className="border-2 border-[#fb5a10] h-32 p-5 flex justify-center items-center rounded-md">
                <Upload
                  showUploadList={false}
                  maxCount={1}
                  beforeUpload={handleBeforeUpload}
                >
                  {!previewImage ? (
                    <div className="flex flex-col items-center">
                      <FaImage className="text-neutral-400 h-10 w-10" />
                      <p className="text-neutral-500">Upload Image</p>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center">
                      <img
                        src={previewImage}
                        alt="Preview"
                        className="h-24 object-contain"
                      />
                      <p className="text-neutral-500">{banner?.name}</p>
                    </div>
                  )}
                </Upload>
              </div>
            </Form.Item>

            <Form.Item
              name="title"
              label="Event Name"
              rules={[{ required: true, message: "Please enter event name" }]}
            >
              <Input placeholder="Enter event name" />
            </Form.Item>

            <Form.Item
              name="features"
              label="Features"
              rules={[
                {
                  validator: (_, value) =>
                    Array.isArray(value) && value.length > 0
                      ? Promise.resolve()
                      : Promise.reject(
                          new Error("Please add at least one feature")
                        ),
                },
              ]}
            >
              <FeaturesInput />
            </Form.Item>

            <div className="flex gap-2">
              <Form.Item name="startTime" label="Start Time" className="flex-1">
                <TimePicker
                  className="w-full"
                  use12Hours
                  format={TIME_FORMAT}
                />
              </Form.Item>
              <Form.Item name="endTime" label="End Time" className="flex-1">
                <TimePicker
                  className="w-full"
                  use12Hours
                  format={TIME_FORMAT}
                />
              </Form.Item>
            </div>

            <div className="flex gap-2">
              <Form.Item
                name="max_child"
                label="Max Child"
                rules={[{ required: true, message: "Please enter Max Child" }]}
              >
                <InputNumber
                  className="w-full"
                  min={0}
                  placeholder="e.g., 12"
                />
              </Form.Item>
              <Form.Item
                name="max_adult"
                label="Max Adult"
                rules={[{ required: true, message: "Please enter Max Adult" }]}
              >
                <InputNumber className="w-full" min={0} placeholder="e.g., 6" />
              </Form.Item>
            </div>

            <Form.Item
              name="description"
              label="Description"
              rules={[{ required: true, message: "Please enter description" }]}
            >
              <Input.TextArea placeholder="Enter description" rows={4} />
            </Form.Item>

            <Form.Item>
              <button
                type="submit"
                className="px-10 py-3 w-full bg-primary text-white font-semibold text-lg md:text-xl rounded shadow-lg transition"
              >
                Publish
              </button>
            </Form.Item>
          </Form>
        </Modal>

        {/* Edit Modal */}
        <Modal
          title="Edit Events"
          open={isEditModalOpen}
          onCancel={handleEditCancel}
          footer={null}
        >
          <Form form={editForm} onFinish={onEditFinish} layout="vertical">
            <Form.Item name="image">
              <div className="border-2 border-[#fb5a10] h-32 p-5 flex justify-center items-center rounded-md">
                <Upload
                  showUploadList={false}
                  maxCount={1}
                  beforeUpload={handleBeforeUpload}
                >
                  {!previewImage ? (
                    <div className="flex flex-col items-center">
                      <FaImage className="text-neutral-400 h-10 w-10" />
                      <p className="text-neutral-500">Upload Image</p>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center">
                      <img
                        src={previewImage}
                        alt="Preview"
                        className="h-24 object-contain"
                      />
                      <p className="text-neutral-500">{banner?.name}</p>
                    </div>
                  )}
                </Upload>
              </div>
            </Form.Item>

            <Form.Item
              name="title"
              label="Event Name"
              rules={[{ required: true, message: "Please enter event name" }]}
            >
              <Input placeholder="Enter event name" />
            </Form.Item>

            <Form.Item
              name="features"
              label="Features"
              rules={[
                {
                  validator: (_, value) =>
                    Array.isArray(value) && value.length > 0
                      ? Promise.resolve()
                      : Promise.reject(
                          new Error("Please add at least one feature")
                        ),
                },
              ]}
            >
              <FeaturesInput />
            </Form.Item>

            <div className="flex gap-2">
              <Form.Item name="startTime" label="Start Time" className="flex-1">
                <TimePicker
                  className="w-full"
                  use12Hours
                  format={TIME_FORMAT}
                />
              </Form.Item>
              <Form.Item name="endTime" label="End Time" className="flex-1">
                <TimePicker
                  className="w-full"
                  use12Hours
                  format={TIME_FORMAT}
                />
              </Form.Item>
            </div>

            <div className="flex gap-2">
              <Form.Item
                name="max_child"
                label="Max Child"
                rules={[{ required: true, message: "Please enter Max Child" }]}
              >
                <InputNumber
                  className="w-full"
                  min={0}
                  placeholder="e.g., 12"
                />
              </Form.Item>
              <Form.Item
                name="max_adult"
                label="Max Adult"
                rules={[{ required: true, message: "Please enter Max Adult" }]}
              >
                <InputNumber className="w-full" min={0} placeholder="e.g., 6" />
              </Form.Item>
            </div>

            <Form.Item
              name="description"
              label="Description"
              rules={[{ required: true, message: "Please enter description" }]}
            >
              <Input.TextArea placeholder="Enter description" rows={4} />
            </Form.Item>

            <Form.Item>
              <button
                type="submit"
                className="px-10 py-3 w-full bg-primary text-white font-semibold text-lg md:text-xl rounded shadow-lg transition"
              >
                Publish
              </button>
            </Form.Item>
          </Form>
        </Modal>
      </ConfigProvider>
    </div>
  );
};

export default AllEvents;
