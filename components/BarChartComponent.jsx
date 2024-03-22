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
    return Object.entries(counts).map(([name, count]) => ({
      name,
      [`${type} Occurrences`]: count,
    }));
  };

  const counts = countOccurrences(entries, type);
  const chartData = toChartData(counts, type);

  return (
    <BarChart
      data={chartData}
      index="name"
      categories={[`${type} Occurrences`]}
      colors={["blue"]}
      yAxisWidth={48}
    />
  );
};

export default BarChartComponent;
