"use client";

import { DateRangePicker } from "@tremor/react";

const DateRangePick = ({ dateRange, setDateRange }) => {
  return (
    <DateRangePicker
      className="mx-auto"
      value={dateRange}
      onValueChange={setDateRange}
    />
  );
};

export default DateRangePick;

