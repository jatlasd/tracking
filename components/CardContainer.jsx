"use client";

import React, { useState, useEffect } from 'react';
import Card from "./Card";

const CardContainer = ({ entries }) => {
  const [visibleEntries, setVisibleEntries] = useState(entries.slice(0, 10)); 

  const loadMoreEntries = () => {
    setVisibleEntries(entries.slice(0, visibleEntries.length + 10)); 
  };

  useEffect(() => {
    setVisibleEntries(entries.slice(0, 10)); 
  }, [entries]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-x-10">
      {visibleEntries.map((item) => (
        <Card
          key={item._id}
          date={item.date}
          symptom={item.symptom}
          trigger={item.trigger}
          time={item.time}
          severity={item.severity}
          notes={item.notes}
        />
      ))}
      {visibleEntries.length < entries.length && (
        <button onClick={loadMoreEntries} className="load-more">Load More</button> 
      )}
    </div>
  );
};

export default CardContainer;

