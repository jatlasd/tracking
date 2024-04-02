"use client";

import { BarChart } from "@tremor/react";

const BarChartComponent = ({ entries, type }) => {
  const countOccurrences = (entries, type) => {
    const counts = {};
    entries.forEach((entry) => {
      const key = entry[type];
      if (key in counts) {
        counts[key] += 1;
      } else {
        counts[key] = 1;
      }
    });
    return counts;
  };
  const toChartData = (counts, type) => {
    const displayType = type.charAt(0).toUpperCase() + type.slice(1);
    return Object.entries(counts).map(([name, count]) => ({
      name,
      [`${displayType} Occurrences`]: count,
    }));
  };

  const counts = countOccurrences(entries, type);
  const chartData = toChartData(counts, type);

  const displayType = type.charAt(0).toUpperCase() + type.slice(1);

  return (
    <BarChart
      data={chartData}
      index="name"
      categories={[`${displayType} Occurrences`]}
      colors={["#c1e6e2"]}
      yAxisWidth={48}
    />
  );
};

export default BarChartComponent;
