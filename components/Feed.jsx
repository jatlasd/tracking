"use client";

import CardContainer from "./CardContainer";

const Feed = ({entries}) => {
  const date = new Date();
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const dayOfWeek = days[date.getDay()];
  const monthName = months[date.getMonth()];
  const dateString = `${monthName} ${date.getDate()}, ${date.getFullYear()}`;

  return (
    <div className="mt-16 flex flex-col text-left w-full">
      <div className="flex flex-col ml-5">
        <h1 className="head_text">{dayOfWeek}</h1>
        <h1 className="desc">{dateString}</h1>
      </div>
      <CardContainer entries={entries}/>
    </div>
  );
};

export default Feed;
