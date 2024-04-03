import BarChartComponent from "../BarChartComponent";
import TrendsBarListComponent from "../TrendsBarList";
import { useState, useEffect, useCallback } from "react";

const TrendsOverall = () => {
  const [selectedRange, setSelectedRange] = useState("");

  const [dateRange, setDateRange] = useState({
    from: null,
    to: new Date(),
  });
  const [filteredEntries, setFilteredEntries] = useState([]);

  const fetchEntries = useCallback(async () => {
    if (!dateRange.from) {
      return;
    }

    const formatStartDate = dateRange.from.toLocaleDateString("en-US");
    const formatEndDate = dateRange.to
      ? dateRange.to.toLocaleDateString("en-US")
      : formatStartDate;

    const response = await fetch("/api/stored/entry");
    const entries = await response.json();
    const filteredResults = entries.filter((entry) => {
      const entryDate = new Date(entry.date);
      const startDate = new Date(formatStartDate);
      const endDate = new Date(formatEndDate);
      return entryDate >= startDate && entryDate <= endDate;
    });
    setFilteredEntries(filteredResults);
  }, [dateRange]);

  useEffect(() => {
    fetchEntries();
  }, [dateRange, fetchEntries]);

  const setRange = (months, rangeLabel) => {
    const toDate = new Date();
    const fromDate = new Date();
    fromDate.setMonth(toDate.getMonth() - months);
    setDateRange({ from: fromDate, to: toDate });
    setSelectedRange(rangeLabel);
  };

  const setWeekRange = () => {
    setRange(0.25, "week");
  };

  const setMonthRange = () => {
    setRange(1, "month");
  };

  const setThreeMonthsRange = () => {
    setRange(3, "threeMonths");
  };

  const setSixMonthsRange = () => {
    setRange(6, "sixMonths");
  };

  const buttonClass = (range) =>
    `p-2 mx-3 border border-dark-blue-2 text-dark-blue-2 font-satoshi rounded-full hover:bg-dark-blue-2 hover:text-platinum transition-all ${
      selectedRange === range ? "bg-dark-blue-2 text-platinum" : ""
    }`;

  return (
    <div className="w-full">
      <div className="flex items-center justify-center">
        {[
          { range: "week", label: "1 Week", action: setWeekRange },
          { range: "month", label: "1 Month", action: setMonthRange },
          {
            range: "threeMonths",
            label: "3 Months",
            action: setThreeMonthsRange,
          },
          { range: "sixMonths", label: "6 Months", action: setSixMonthsRange },
        ].map(({ range, label, action }) => (
          <button key={range} onClick={action} className={buttonClass(range)}>
            {label}
          </button>
        ))}
      </div>
      <div className="p-2 mt-8 bg-white rounded-xl mx-4 md:mx-0">
        <h3 className="p-4 text-3xl font-extrabold text-center font-satoshi text-dark-blue-2">
          Symptom Occurences
        </h3>
        <BarChartComponent entries={filteredEntries} type="symptom" />
      </div>
      <div className="p-2 my-4 bg-white rounded-xl mx-4 md:mx-0">
        <h3 className="p-4 text-3xl font-extrabold text-center font-satoshi text-dark-blue-2">
          Trigger Occurences
        </h3>
        <BarChartComponent entries={filteredEntries} type="trigger" />
      </div>
      <div className="p-2 mb-4 bg-white rounded-xl mx-4 md:mx-0">
        <h3 className="p-4 text-3xl font-extrabold text-center font-satoshi text-dark-blue-2">
          Number of Entries Per Day
        </h3>
        <TrendsBarListComponent entries={filteredEntries} />
      </div>
    </div>
  );
};

export default TrendsOverall;
