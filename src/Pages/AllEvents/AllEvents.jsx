
const AllEvents = () => {
  const data = [
    {
      title: "School Trip",
      time: "09:00PM - 11:30PM",
      price: "Adult 360 * Child 160",
      details: ["Exciting Visits", "Competitions and Prizes", "Rides Included"],
    },
    {
      title: "Corporate Events",
      time: "09:00PM - 11:30PM",
      price: "Adult 360 * Child 160",
      details: ["Exciting Visits", "Competitions and Prizes", "Rides Included"],
    },
    {
      title: "Wedding Ceremony",
      time: "09:00PM - 11:30PM",
      price: "Adult 360 * Child 160",
      details: ["Exciting Visits", "Competitions and Prizes", "Rides Included"],
    },
    {
      title: "Product Launch Ceremony",
      time: "09:00PM - 11:30PM",
      price: "Adult 360 * Child 160",
      details: ["Exciting Visits", "Competitions and Prizes", "Rides Included"],
    },
    {
      title: "Conference & Gatherings",
      time: "09:00PM - 11:30PM",
      price: "Adult 360 * Child 160",
      details: ["Exciting Visits", "Competitions and Prizes", "Rides Included"],
    },
  ];

  return (
    <div className="min-h-screen">
      <div className="flex justify-between items-center my-4">
        <h1 className="text-2xl font-bold">Exclusive arrangement for Corporate</h1>
        <button className="px-4 py-2 rounded-md bg-primary text-white">Add Events</button>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {data.map((event, index) => (
          <div key={index} className="relative border rounded-lg p-4 bg-orange-100">
            <div className="absolute top-4 right-4">
              {/* Optional: Add delete icon or functionality */}
              <button className="text-xl text-red-600">🗑️</button>
            </div>
            <div className="flex flex-col justify-between h-full">
              <h2 className="font-semibold text-xl mb-2">{event.title}</h2>
              <p className="text-sm text-gray-700 mb-3">{event.time}</p>
              <p className="font-bold text-lg mb-3">{event.price}</p>
              <ul className="text-sm text-gray-600">
                {event.details.map((detail, i) => (
                  <li key={i} className="mb-1">✔️ {detail}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllEvents;
