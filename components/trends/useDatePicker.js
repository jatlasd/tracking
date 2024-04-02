import { useState, useCallback, useEffect } from "react";

export const useDatePicker = (
  initialDate,
  onEntriesFetched,
  type,
  onDisplayDateChange
) => {
  const [date, setDate] = useState(initialDate);
  const [dateRange, setDateRange] = useState({ from: null, to: initialDate });
  const [displayDate, setDisplayDate] = useState("");
  const [filteredEntries, setFilteredEntries] = useState([]);

  const fetchEntries = useCallback(
    async (type) => {
      const response = await fetch("/api/stored/entry");
      const entries = await response.json();

      let filteredResults = [];

      if (type === "day") {
        const selectedDate = new Date(date).getTime();
        filteredResults = entries.filter((entry) => {
          const entryDate = new Date(entry.date).getTime();
          return entryDate === selectedDate;
        });
      } else if (type === "range" && dateRange.from && dateRange.to) {
        const fromDate = new Date(dateRange.from).getTime();
        const toDate = new Date(dateRange.to).getTime();
        filteredResults = entries.filter((entry) => {
          const entryDate = new Date(entry.date).getTime();
          return entryDate >= fromDate && entryDate <= toDate;
        });
      }

      setFilteredEntries(filteredResults);

      if (onEntriesFetched) {
        onEntriesFetched(filteredResults);
      }
    },
    [date, dateRange]
  );

  const handleChange = (newValue) => {
    if (type === "day") {
      if (newValue) {
        const newDate = new Date(newValue);
        setDate(newDate);
        const newDisplayDate = newDate.toLocaleDateString("en-US", {
          year: "numeric",
          month: "numeric",
          day: "numeric",
        });
        setDisplayDate(newDisplayDate);
        onDisplayDateChange(newDisplayDate);
      }
    } else if (type === "range") {
      if (newValue.from && newValue.to) {
        const fromDate = new Date(newValue.from);
        const toDate = new Date(newValue.to);
        setDateRange({ from: fromDate, to: toDate });
        const displayDateRange = `${fromDate.toLocaleDateString("en-US", {
          year: "numeric",
          month: "numeric",
          day: "numeric",
        })} - ${toDate.toLocaleDateString("en-US", {
          year: "numeric",
          month: "numeric",
          day: "numeric",
        })}`;
        setDisplayDate(displayDateRange);
        onDisplayDateChange(displayDateRange);
      }
    }
  };

  useEffect(() => {
    fetchEntries(type);
  }, [date, dateRange, fetchEntries, type]);

  return {
    date,
    dateRange,
    setDateRange,
    displayDate,
    filteredEntries,
    handleChange,
  };
};
