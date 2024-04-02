import { BarList, Card } from "@tremor/react";

const TrendsBarListComponent = ({ entries }) => {
  const processData = (entries) => {
    const dateData = {};
    entries.forEach((entry) => {
      const { date } = entry;
      if (!dateData[date]) {
        dateData[date] = 1;
      } else {
        dateData[date] += 1;
      }
    });
    return dateData;
  };

  const dateData = processData(entries);

  const sortedData = Object.entries(dateData)
    .sort((a, b) => b[1] - a[1])
    .map(([date, count]) => ({
      name: date,
      value: count,
    }));

  return (
    <div className="flex flex-col gap-4 md:flex-row md:flex-wrap">
      <Card className="max-w-lg mx-auto my-4">
        <h3 className="font-medium text-tremor-title text-tremor-content-strong dark:text-dark-tremor-content-strong">
          Entries
        </h3>
        <p className="flex items-center justify-between mt-4 text-tremor-default text-tremor-content dark:text-dark-tremor-content">
          <span>Date</span>
          <span># of Entries</span>
        </p>
        <BarList data={sortedData} className="mt-2" />
      </Card>
    </div>
  );
};

export default TrendsBarListComponent;
