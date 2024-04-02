"use client";

import CardContainer from "./CardContainer";

const Feed = ({ entries, handleDelete, isDashboard }) => {
  const date = new Date();
  const dayOfWeek = date.toLocaleString("en-US", { weekday: "long" });
  const dateString = date.toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="mt-16 flex flex-col text-left w-full">
      <div className="flex flex-col ml-5">
        <h1 className="mt-5 text-5xl font-extrabold leading-[1.15] sm:text-6xl text-dark-blue-1">
          {dayOfWeek}
        </h1>
        <h1 className="max-w-2xl w-2/5 pb-2 text-lg text-gray-600 sm:text-xl mt-2 border-b border-b-dark-blue-2">
          {dateString}
        </h1>
      </div>
      {entries.length === 0 ? (
        <div className="w-full flex justify-center items-center h-24 mt-10">
          <h1 className=" text-5xl font-extrabold leading-[1.15] sm:text-6xl text-dark-blue-1">
            No entries today
          </h1>
        </div>
      ) : (
        <CardContainer
          entries={entries}
          handleDelete={handleDelete}
          isDashboard={isDashboard}
        />
      )}
    </div>
  );
};

export default Feed;
