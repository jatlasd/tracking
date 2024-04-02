"use client";

import React, { useState, useCallback, useEffect } from "react";
import Divider from "@mui/material/Divider";

import TrendsDatePick from "./TrendsDatePick";
import TrendsBarChart from "./TrendsBarChart";
import TrendsLineChart from "./TrendsLineChart";

const TrendsSelectedDayOrRange = ({ type }) => {
  const [filteredEntries1, setFilteredEntries1] = useState([]);
  const [filteredEntries2, setFilteredEntries2] = useState([]);

  const [displayDate1, setDisplayDate1] = useState("");
  const [displayDate2, setDisplayDate2] = useState("");

  const handleDisplayDate1Update = useCallback((date) => {
    setDisplayDate1(date);
  }, []);

  const handleDisplayDate2Update = useCallback((date) => {
    setDisplayDate2(date);
  }, []);

  const handleFilteredEntries1Update = useCallback((newEntries) => {
    setFilteredEntries1((prevEntries) => {
      if (JSON.stringify(prevEntries) !== JSON.stringify(newEntries)) {
        return newEntries;
      }
      return prevEntries;
    });
  }, []);

  const handleFilteredEntries2Update = useCallback((newEntries) => {
    setFilteredEntries2((prevEntries) => {
      if (JSON.stringify(prevEntries) !== JSON.stringify(newEntries)) {
        return newEntries;
      }
      return prevEntries;
    });
  }, []);

  return (
    <div className="w-full">
      <div className="flex items-center justify-center w-full mt-6 mb-0 md:mb-4">
        <TrendsDatePick
          type={type}
          onFilteredEntries1Update={handleFilteredEntries1Update}
          onFilteredEntries2Update={handleFilteredEntries2Update}
          onDisplayDate1Update={handleDisplayDate1Update}
          onDisplayDate2Update={handleDisplayDate2Update}
        />
      </div>
      <Divider className="py-10 text-dark-blue-2" sx={{}}>
        Entry Counts
      </Divider>
      <div className="flex flex-col px-4 py-2 bg-white rounded-xl ">
        <span className="text-2xl md:text-3xl font-bold font-satoshi text-center w-full pb-0 md:pb-6 text-dark-blue-2">
          Total # of Entries per Day
        </span>
        <div className="flex flex-col md:flex-row justify-evenly items-center pb-4">
          <div className="flex pt-4 md:pt-0">
            {filteredEntries1.length > 0 && (
              <>
                <h1 className="font-bold text-tiffany-600 text-xl">
                  {displayDate1}:{" "}
                </h1>
                <span className="pl-10 text-2xl">
                  {filteredEntries1.length}
                </span>
              </>
            )}
          </div>
          <div className="flex pt-6 md:pt-0">
            {filteredEntries2.length > 0 && (
              <>
                <h1 className="font-bold text-tangerine-600 text-xl">
                  {displayDate2}:{" "}
                </h1>
                <span className="pl-10 text-2xl">
                  {filteredEntries2.length}
                </span>
              </>
            )}
          </div>
        </div>
      </div>
      <Divider className="py-10 text-dark-blue-2" sx={{}}>
        Symptom Occurances
      </Divider>
      <div className="flex px-4 py-2 bg-white rounded-xl">
        <TrendsBarChart
          filtered1={filteredEntries1}
          filtered2={filteredEntries2}
          displayDate1={displayDate1}
          displayDate2={displayDate2}
          target="symptom"
        />
      </div>
      <Divider className="py-10 text-dark-blue-2" sx={{}}>
        Trigger Occurances
      </Divider>
      <div className="flex px-4 py-2 bg-white rounded-xl">
        <TrendsBarChart
          filtered1={filteredEntries1}
          filtered2={filteredEntries2}
          displayDate1={displayDate1}
          displayDate2={displayDate2}
          target="trigger"
        />
      </div>
      <Divider className="py-10 text-dark-blue-2" sx={{}}>
        Time of Entries
      </Divider>
      <div className="bg-white rounded-xl mb-10">
        <TrendsLineChart
          filtered1={filteredEntries1}
          filtered2={filteredEntries2}
          displayDate1={displayDate1}
          displayDate2={displayDate2}
        />
      </div>
    </div>
  );
};

export default React.memo(TrendsSelectedDayOrRange);
