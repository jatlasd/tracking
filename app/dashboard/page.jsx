"use client";

import Feed from "@components/Feed";
import { handleDelete } from "@utils/utils";

import { useState, useEffect } from "react";

const Dashboard = () => {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const res = await fetch("/api/stored/entry");
        let data = await res.json();

        data = data.filter(
          (item) =>
            item.date ===
            new Date().toLocaleDateString("en-US", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
            })
        );

        const timeToMinutes = (timeString) => {
          const [hour, minute] = timeString.split(":").map(Number);
          return hour * 60 + minute;
        };
        data.sort((a, b) => timeToMinutes(a.time) - timeToMinutes(b.time));

        setEntries(data);
      } catch (error) {
        console.error("Failed to fetch entries:", error);
      }
    };
    fetchEntries();
  }, []);

  return (
    <section className="flex-col w-full flex-center">
      <h1 className="text-center mt-5 text-5xl font-extrabold leading-[1.15] sm:text-6xl text-tangerine-600">
        Dashboard
      </h1>
      <Feed
        entries={entries}
        handleDelete={(id) => handleDelete(id, entries, setEntries)}
        isDashboard={true}
      />
    </section>
  );
};

export default Dashboard;
