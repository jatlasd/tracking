"use client";
import React from "react";

const Entry = ({ entryKey, value }) => (
  <div className="flex" key={entryKey}>
    <h1 className="text-lg font-bold">
      {entryKey.charAt(0).toUpperCase() + entryKey.slice(1)}:
    </h1>
    <h1 className="ml-3 desc">{value}</h1>
  </div>
);

const Card = ({ date, symptom, trigger, time, severity, notes }) => {
  const entries = React.useMemo(() => {
    return Object.entries({ date, symptom, trigger, time, severity, notes });
  }, [date, symptom, trigger, time, severity, notes]);

  return (
    <div className="mt-4 rounded card-width">
      <div className="px-6 py-4">
        {entries.map(([entryKey, value]) => (
          <Entry key={entryKey} entryKey={entryKey} value={value} />
        ))}
      </div>
    </div>
  );
};

export default Card;
