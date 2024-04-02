"use client";

import Card from "./Card";

const CardContainer = ({ entries, handleDelete, isDashboard }) => {

  return (
    <div className="flex flex-wrap justify-center md:justify-start gap-x-10 gap-y-4 md:gap-y-10 pb-4">
      {entries.map((item) => (
        <Card
          key={item._id}
          id={item._id}
          date={item.date}
          symptom={item.symptom}
          trigger={item.trigger}
          time={item.time}
          severity={item.severity}
          notes={item.notes}
          handleDelete={handleDelete}
          isDashboard={isDashboard}
        />
      ))}
    </div>
  );
};

export default CardContainer;

