"use client";

import React, { useState } from "react";
import { DatePicker, Space } from "antd";

const { RangePicker } = DatePicker;

const Testing = () => {
  // Handler function for the onChange event
  const handleRangeChange = (dates, dateStrings) => {
    // Simplified reformatting of the date to mm/dd/yyyy format without moment
    const formattedDates = dateStrings.map(dateString => {
      const [year, month, day] = dateString.split('-');
      return `${month}/${day}/${year}`;
    });
    console.log('Selected Dates:', formattedDates);
  };

  return (
    <div className="flex items-center justify-center w-full bg-slate-200">
      <Space direction="vertical" size={12}>
        <RangePicker onChange={handleRangeChange} />
      </Space>
    </div>
  );
};

export default Testing;
