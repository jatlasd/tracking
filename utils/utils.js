export const filterEntriesByDateRange = (entries, from, to) => {
    const startDate = new Date(from).getTime();
    const endDate = to ? new Date(to).getTime() : startDate;
    const filteredResults = entries.filter((entry) => {
      const entryDate = new Date(entry.date).getTime();
      return entryDate >= startDate && entryDate <= endDate;
    });
}

export const formatDateWithoutWeekday = (date) => {
    return new Date(firstEntryDate).toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' });
}

export const formatDateWithWeekday = (date) => {
    return new Date(firstEntryDate).toLocaleDateString("en-US", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
}

export const handleDelete = async (id, entries, setEntries) => {
    try {
      await fetch(`/api/stored/entry/${id.toString()}`, {
        method: "DELETE",
      });
  
      const filteredEntries = entries.filter((entry) => entry._id !== id);
      setEntries(filteredEntries);
    } catch (error) {
      console.error("Error deleting entry:", error);
    }
  };
  
