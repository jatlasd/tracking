"use client";

import BarChartComponent from "@components/BarChartComponent";
import TrendsBarListComponent from "@components/TrendsBarList";

import { useState, useEffect, useCallback } from "react";

const Trends = () => {
  const [dateRange, setDateRange] = useState({
    from: null,
    to: new Date(),
  });
  const [filteredEntries, setFilteredEntries] = useState([]);
  const [selectedRange, setSelectedRange] = useState(""); 

  const fetchEntries = useCallback(async () => {
    if (!dateRange.from) {
      return;
    }

    const formatStartDate = dateRange.from.toLocaleDateString("en-US");
    const formatEndDate = dateRange.to
      ? dateRange.to.toLocaleDateString("en-US")
      : formatStartDate;

    const response = await fetch("/api/stored/entry");
    const entries = await response.json();
    const filteredResults = entries.filter((entry) => {
      const entryDate = new Date(entry.date); 
      const startDate = new Date(formatStartDate);
      const endDate = new Date(formatEndDate);
      return entryDate >= startDate && entryDate <= endDate;
    });
    setFilteredEntries(filteredResults);
  }, [dateRange]);

  useEffect(() => {
    fetchEntries();
  }, [dateRange, fetchEntries]);

  const setWeekRange = () => {
    const toDate = new Date();
    const fromDate = new Date();
    fromDate.setDate(toDate.getDate() - 7); 
    setDateRange({ from: fromDate, to: toDate });
    setSelectedRange("week"); 
  };

  const setMonthRange = () => {
    const toDate = new Date();
    const fromDate = new Date();
    fromDate.setMonth(toDate.getMonth() - 1); 
    setDateRange({ from: fromDate, to: toDate });
    setSelectedRange("month"); 
  };

  const setThreeMonthsRange = () => {
    const toDate = new Date();
    const fromDate = new Date();
    fromDate.setMonth(toDate.getMonth() - 3); 
    setDateRange({ from: fromDate, to: toDate });
    setSelectedRange("threeMonths"); 
  };

  const setSixMonthsRange = () => {
    const toDate = new Date();
    const fromDate = new Date();
    fromDate.setMonth(toDate.getMonth() - 6); 
    setDateRange({ from: fromDate, to: toDate });
    setSelectedRange("sixMonths"); 
  };

  const buttonClass = (range) =>
    `p-2 mx-3 border-2 rounded-full ${selectedRange === range ? "bg-blue-500" : ""}`;

  return (
    <div className="flex flex-col w-full ">
      <div className="flex items-center justify-center">
        <button
          onClick={setWeekRange}
          className={buttonClass("week")}
        >
          1 Week
        </button>
        <button
          onClick={setMonthRange}
          className={buttonClass("month")}
        >
          1 Month
        </button>
        <button
          onClick={setThreeMonthsRange}
          className={buttonClass("threeMonths")}
        >
          3 Months
        </button>
        <button
          onClick={setSixMonthsRange}
          className={buttonClass("sixMonths")}
        >
          6 Months
        </button>
      </div>
      {dateRange.from && filteredEntries.length > 0 && (
        <>
          <div className="p-2 my-4 border-2 border-gray-300">
            <BarChartComponent entries={filteredEntries} type="symptom" />
          </div>
          <div className="p-2 border-2 border-gray-300">
            <BarChartComponent entries={filteredEntries} type="trigger" />
          </div>
          <div className="p-2 border-2 border-gray-300">
            <TrendsBarListComponent entries={filteredEntries} />
          </div>
        </>
      )}
    </div>
  );
};

export default Trends;
