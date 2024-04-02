import React, { useEffect, useState } from 'react'
import { LineChart } from '@tremor/react'

const TrendsLineChart = ({filtered1, filtered2, displayDate1, displayDate2}) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const aggregateEntriesByTime = (entries) => {
      const timeSlots = {};
      for (let hour = 0; hour < 24; hour++) {
        const isPM = hour >= 12;
        const convertedHour = hour % 12 || 12;
        const suffix = isPM ? 'PM' : 'AM';
        const time = `${convertedHour.toString().padStart(2, '0')}:00 ${suffix}`;
        timeSlots[time] = { [displayDate1]: 0, [displayDate2]: 0 };
      }

      entries.forEach(entry => {
        const hour24 = parseInt(entry.time.split(':')[0], 10);
        const isPM = hour24 >= 12;
        const convertedHour = hour24 % 12 || 12;
        const suffix = isPM ? 'PM' : 'AM';
        const hour = `${convertedHour.toString().padStart(2, '0')}:00 ${suffix}`;
        if (timeSlots.hasOwnProperty(hour)) {
          if (filtered1.includes(entry)) timeSlots[hour][displayDate1] += 1;
          if (filtered2.includes(entry)) timeSlots[hour][displayDate2] += 1;
        }
      });

      return Object.entries(timeSlots).map(([time, counts]) => ({
        time,
        ...counts,
      }));
    };

    const combinedEntries = [...filtered1, ...filtered2];
    const formattedData = aggregateEntriesByTime(combinedEntries);
    setChartData(formattedData);
  }, [filtered1, filtered2, displayDate1, displayDate2]);

  return (
    <LineChart
      data={chartData}
      index="time"
      categories={[displayDate1, displayDate2]}
      colors={["#c1e6e2", "#FFc966"]}
      yAxisWidth={60}
    />
  );
}

export default TrendsLineChart