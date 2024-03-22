import { LineChart } from "@tremor/react";


  const LineChartComponent = ({ entries }) => {
    const aggregateEntriesByTime = (entries) => {
      const timeSlots = {};
      for (let hour = 0; hour < 24; hour++) {
        // Convert 24-hour format to 12-hour format with AM/PM
        const isPM = hour >= 12;
        const convertedHour = hour % 12 || 12; // Converts 0 to 12 for 12 AM
        const suffix = isPM ? 'PM' : 'AM';
        const time = `${convertedHour.toString().padStart(2, '0')}:00 ${suffix}`;
        timeSlots[time] = 0;
      }
  
      entries.forEach(entry => {
        // Assuming entry.time is in 'HH:MM:SS' format, extract the hour and convert
        const hour24 = parseInt(entry.time.split(':')[0], 10); // 24-hour
        const isPM = hour24 >= 12;
        const convertedHour = hour24 % 12 || 12; // Converts 0 to 12 for 12 AM
        const suffix = isPM ? 'PM' : 'AM';
        const hour = `${convertedHour.toString().padStart(2, '0')}:00 ${suffix}`;
        if (timeSlots.hasOwnProperty(hour)) {
          timeSlots[hour] += 1;
        }
      });
  
      return Object.entries(timeSlots).map(([time, count]) => ({
        time,
        "# of entries": count,
      }));
    };
  
    // Use the aggregated data for the chart
    const chartData = aggregateEntriesByTime(entries);
  
    // Updated to format numbers without the dollar sign
    // const dataFormatter = (number) => Intl.NumberFormat('us').format(number).toString();
  
    return (
      <LineChart
        className="h-80"
        data={chartData}
        index="time"
        categories={['# of entries']}
        colors={['indigo']}
        // valueFormatter={dataFormatter} 
        yAxisWidth={60}
      />
    );
}

export default LineChartComponent;