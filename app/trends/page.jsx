"use client";

import TrendsContainer from "@components/trends/TrendsContainer";
import TrendsOverall from "@components/trends/TrendsOverall";
import { Tabs, Tab, Box } from "@mui/material";

import { useState } from "react";

const Trends = () => {
  const [value, setValue] = useState("overall");
  const [trendType, setTrendType] = useState("overall");

  const handleChange = (_event, newValue) => {
    setValue(newValue);
    switch (newValue) {
      case "overall":
        setTrendType("overall");
        break;
      case "dayToDay":
        setTrendType("dayToDay");
        break;
      case "spanToSpan":
        setTrendType("spanToSpan");
        break;
      default:
        setTrendType("overall");
    }
  };

  return (
    <div className="flex flex-col w-full">
      <Box sx={{ width: "100%" }} className="ml-4 md:ml-0">
        <Tabs value={value} onChange={handleChange}>
          <Tab key="overall" value="overall" label="Overall" />
          <Tab key="dayToDay" value="dayToDay" label="Individual Dates" />
          <Tab key="spanToSpan" value="spanToSpan" label="Ranges" />
        </Tabs>
      </Box>

      {trendType === "overall" && <TrendsOverall />}
      {trendType === "dayToDay" && <TrendsContainer type={"day"} />}
      {trendType === "spanToSpan" && <TrendsContainer type={"range"} />}
    </div>
  );
};

export default Trends;
