import { SiTicktick } from "react-icons/si";
import img1 from "../../assets/image/1.png"; 
import { FaTrashAlt } from "react-icons/fa";

const AllEvents = () => {
  const data = [
    {
      title: "School Trip",
      time: "09:00PM to 11:30PM",
      price: "Adult 360 - Child 160",
      details: [
        "Camping, Exciting Visits.",
        "Competitions and Prizes",
        "Rides Included",
      ],
    },
    {
      title: "Corporate Events",
      time: "09:00PM to 11:30PM",
      price: "Adult 360 - Child 160",
      details: ["Exciting Visits", "Competitions and Prizes", "Rides Included"],
    },
    {
      title: "Wedding Ceremony",
      time: "09:00PM to 11:30PM",
      price: "Adult 360 - Child 160",
      details: ["Exciting Visits", "Competitions and Prizes", "Rides Included"],
    },
    {
      title: "Product Launch Ceremony",
      time: "09:00PM to 11:30PM",
      price: "Adult 360 - Child 160",
      details: ["Exciting Visits", "Competitions and Prizes", "Rides Included"],
    },
    {
      title: "Conference & Gatherings",
      time: "09:00PM to 11:30PM",
      price: "Adult 360 - Child 160",
      details: ["Exciting Visits", "Competitions and Prizes", "Rides Included"],
    },
  ];

  return (
    <div className="min-h-screen ">
      <div className="flex justify-between items-center my-6 px-6">
        <h1 className="text-2xl font-bold">
          Exclusive arrangement for Corporate
        </h1>
        <button className="px-4 py-2 rounded-md bg-primary text-white shadow-md hover:bg-orange-600 transition">
          Add Events
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-6 justify-end items-end">
        {data.map((event, index) => (
          <div
            key={index}
            className="relative rounded-lg  " 
          >
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `linear-gradient(to left, rgba(216,101,48,0.8), rgba(0,0,0,0.2)), url(${img1})`, 
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />

            <div className="absolute top-3 left-3 z-20">
              <button className="text-2xl text-white rounded-full p-1 shadow hover:scale-110 transition">
                <FaTrashAlt />
              </button>
            </div>
            <div className="border-2 border-red-500 p-2 w-full">
              <div className="relative z-10 p-5 text-white border-2 flex flex-col justify-end items-end  ">
                <h2 className="font-bold text-2xl mb-3">{event.title}</h2>

                <div className="bg-orange-200 text-black inline-block px-3 py-1 rounded-md mb-3 font-medium">
                  {event.time}
                </div>

                <div className="bg-white text-black px-4 py-2 rounded-md mb-3 font-semibold">
                  {event.price}
                </div>

                <ul className="text-sm space-y-2">
                  {event.details.map((detail, i) => (
                    <li key={i} className="flex items-center gap-2">
                   <SiTicktick className="text-white" /> {detail}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllEvents;
