import { useState, useCallback, useEffect } from "react";

export const useDatePicker = (
  initialDate,
  onEntriesFetched,
  type,
  onDisplayDateChange
) => {
  const [date, setDate] = useState(type === "day" ? undefined : initialDate);
  const [dateRange, setDateRange] = useState(type === "range" ? { from: undefined, to: undefined } : { from: null, to: initialDate });
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
      const newDate = newValue ? new Date(newValue) : null;
      setDate(newDate);
      const newDisplayDate = newDate ? newDate.toLocaleDateString("en-US", {
        year: "numeric",
        month: "numeric",
        day: "numeric",
      }) : "";
      setDisplayDate(newDisplayDate);
      onDisplayDateChange(newDisplayDate);
    } else if (type === "range") {
      if (newValue && newValue.hasOwnProperty('from') && newValue.hasOwnProperty('to')) {
        const fromDate = newValue.from ? new Date(newValue.from) : undefined;
        const toDate = newValue.to ? new Date(newValue.to) : undefined;
        setDateRange({ from: fromDate, to: toDate });

        const displayDateRange = fromDate && toDate ? `${fromDate.toLocaleDateString("en-US", {
          year: "numeric",
          month: "numeric",
          day: "numeric",
        })} - ${toDate.toLocaleDateString("en-US", {
          year: "numeric",
          month: "numeric",
          day: "numeric",
        })}` : "";
        setDisplayDate(displayDateRange);
        onDisplayDateChange(displayDateRange);
      } else {
        setDateRange({ from: undefined, to: undefined });
        setDisplayDate("");
        onDisplayDateChange("");
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
