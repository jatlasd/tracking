"use client";

import { DatePicker, DateRangePicker } from "@tremor/react";
import { useDatePicker } from "./useDatePicker";

const TrendsDatePick = ({
  type,
  onFilteredEntries1Update,
  onFilteredEntries2Update,
  onDisplayDate1Update,
  onDisplayDate2Update
}) => {
  const {
    date: date1,
    dateRange: dateRange1,
    handleChange: handleChange1,
  } = useDatePicker(undefined, onFilteredEntries1Update, type, onDisplayDate1Update);
  const {
    date: date2,
    dateRange: dateRange2,
    handleChange: handleChange2,
  } = useDatePicker(undefined, onFilteredEntries2Update, type, onDisplayDate2Update);

  return (
    <div className="flex flex-col items-center justify-center w-full mt-6 mb-4 md:flex-row">
      {type === "day" ? (
        <DatePicker
          value={date1}
          onValueChange={(newValue) => handleChange1(newValue, type)}
          className="w-1/2 mx-0 md:w-1/4 md:mx-6"
        />
      ) : (
        <DateRangePicker
          value={dateRange1}
          onValueChange={(newValue) => handleChange1(newValue, type)}
          className="w-full mx-0 mb-4 md:w-2/3 md:mx-6 md:mb-0"
        />
      )}
      {type === "day" ? (
        <DatePicker
          value={date2}
          onValueChange={(newValue) => handleChange2(newValue, type)}
          className="w-1/2 mx-0 mt-6 md:w-1/4 md:mx-6 md:mt-0"
        />
      ) : (
        <DateRangePicker
          value={dateRange2}
          onValueChange={(newValue) => handleChange2(newValue, type)}
          className="w-full mx-0 md:w-2/3 md:mx-6"
        />
      )}
    </div>
  );
};

export default TrendsDatePick;
