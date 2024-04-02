import { LineChart } from "@tremor/react";

const LineChartComponent = ({ entries }) => {
  const aggregateEntriesByTime = (entries) => {
    const timeSlots = {};
    for (let hour = 0; hour < 24; hour++) {
      const isPM = hour >= 12;
      const convertedHour = hour % 12 || 12;
      const suffix = isPM ? "PM" : "AM";
      const time = `${convertedHour.toString().padStart(2, "0")}:00 ${suffix}`;
      timeSlots[time] = 0;
    }

    entries.forEach((entry) => {
      const hour24 = parseInt(entry.time.split(":")[0], 10);
      const isPM = hour24 >= 12;
      const convertedHour = hour24 % 12 || 12;
      const suffix = isPM ? "PM" : "AM";
      const hour = `${convertedHour.toString().padStart(2, "0")}:00 ${suffix}`;
      if (timeSlots.hasOwnProperty(hour)) {
        timeSlots[hour] += 1;
      }
    });

    return Object.entries(timeSlots).map(([time, count]) => ({
      time,
      "# of entries": count,
    }));
  };

  const chartData = aggregateEntriesByTime(entries);

  return (
    <LineChart
      className="h-80"
      data={chartData}
      index="time"
      categories={["# of entries"]}
      colors={["#c1e6e2"]}
      yAxisWidth={60}
    />
  );
};

export default LineChartComponent;
