import React from "react";

const UpcomingClasses = () => {
  const classes = [
    { id: 1, title: "Math 101", schedule: "Mon, 10:00 AM" },
    { id: 2, title: "Science 201", schedule: "Wed, 2:00 PM" },
    { id: 3, title: "History 301", schedule: "Fri, 1:00 PM" },
    { id: 4, title: "Art & Design", schedule: "Tue, 11:00 AM" },
    { id: 5, title: "Chemistry 101", schedule: "Thu, 3:00 PM" },
    { id: 6, title: "Physics 202", schedule: "Sat, 9:00 AM" },
    { id: 7, title: "Biology 203", schedule: "Mon, 1:00 PM" },
    { id: 8, title: "English Literature", schedule: "Wed, 4:00 PM" },
    { id: 9, title: "Programming Basics", schedule: "Fri, 8:00 AM" },
    { id: 10, title: "World Geography", schedule: "Thu, 10:00 AM" },
  ];

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold flex justify-center">Class List</h1>
      {/* Horizontal Scroll or Grid */}
      <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-3 items-center justify-center ">
        {classes.map((res,index) => (
          <div key={index} className="w-full max-w-lg px-10 py-8 mx-auto bg-white rounded-lg shadow-xl">
            <div className="max-w-md mx-auto space-y-6">
              <h2 className="text-2xl font-bold">{res.title}</h2>
              <div className="text-base leading-3">
                <p className="font-normal text-gray-700">
                  Looking For Free premium components?
                </p>
                <div className="my-4">
                  <p>{res.schedule}</p>
                </div>
              </div>
              <div className="flex gap-2">
                {" "}
                <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-stone-800 text-white shadow hover:bg-primary/90 h-9 px-4 py-2">
                  View Details
                </button>
                <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-[#3B82F6] text-white shadow hover:bg-blue-950 h-9 px-4 py-2">
                  Start Class
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingClasses;
