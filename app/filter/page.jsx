"use client";

import DateRangePick from "@components/DateRangePick";
import { useState, useEffect, useCallback } from "react";
import FilterContainer from "@components/FilterContainer";
import Image from "next/image";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { getUniqueDatesWithEntries } from "./utils";

const Filter = () => {
  const [value, setValue] = useState(0);
  const [dateRange, setDateRange] = useState({ from: null, to: new Date() });
  const [filteredEntries, setFilteredEntries] = useState([]);
  const [isRange, setIsRange] = useState(false);
  const [displayFilteredEntries, setDisplayFilteredEntries] = useState([]);
  const [displayDate, setDisplayDate] = useState("");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const fetchEntries = useCallback(async () => {
    if (!dateRange.from) return;

    const response = await fetch("/api/stored/entry");
    const entries = await response.json();
    const startDate = new Date(dateRange.from).getTime();
    const endDate = dateRange.to ? new Date(dateRange.to).getTime() : startDate;
    const filteredResults = entries.filter((entry) => {
      const entryDate = new Date(entry.date).getTime();
      return entryDate >= startDate && entryDate <= endDate;
    });
    setFilteredEntries(filteredResults);
  }, [dateRange.from, dateRange.to]);

  useEffect(() => {
    fetchEntries();
    if (dateRange.from && dateRange.to) {
      setIsRange(
        new Date(dateRange.from).getTime() !== new Date(dateRange.to).getTime()
      );
    }

    if (dateRange.from) {
      const uniqueDates = getUniqueDatesWithEntries(filteredEntries);
      let newFilteredEntries = filteredEntries;

      if (isRange && uniqueDates.length > value) {
        const selectedDate = uniqueDates[value];
        newFilteredEntries = filteredEntries.filter(
          (entry) =>
            new Date(entry.date).getTime() === new Date(selectedDate).getTime()
        );
      }

      setDisplayFilteredEntries(newFilteredEntries);

      if (newFilteredEntries.length > 0) {
        const dateString = new Date(
          newFilteredEntries[0].date
        ).toLocaleDateString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        });

        setDisplayDate(dateString);
      }
    }
  }, [dateRange, fetchEntries, filteredEntries, value, isRange]);

  return (
    <div className="flex flex-col w-full">
      <DateRangePick dateRange={dateRange} setDateRange={setDateRange} />
      <div className="flex justify-center w-full">
        <Image
          src="/assets/svg/waving.svg"
          alt="floating"
          width={100}
          height={100}
          className="my-10"
        />
      </div>
      {dateRange.from ? (
        isRange ? (
          <Box sx={{ width: "100%" }} className="mt-7">
            <Tabs value={value} onChange={handleChange} aria-label="date tabs">
              {getUniqueDatesWithEntries(filteredEntries).map((date, index) => (
                <Tab
                  key={index}
                  value={index}
                  label={date.toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "numeric",
                    day: "numeric",
                  })}
                />
              ))}
            </Tabs>
            <FilterContainer
              filteredEntries={displayFilteredEntries}
              displayDate={displayDate}
            />
          </Box>
        ) : (
          <FilterContainer
            filteredEntries={filteredEntries}
            displayDate={displayDate}
          />
        )
      ) : (
        <div className="mt-4 text-center">
          <span className="head_text text-tangerine-600">
            Please select a date range to filter
          </span>
        </div>
      )}
    </div>
  );
};

export default Filter;
