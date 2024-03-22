export const getUniqueDatesWithEntries = (entries) => {
    const uniqueDates = [];
    const uniqueDateStrings = new Set(entries.map(entry => new Date(entry.date).toLocaleDateString("en-US")));
  
    uniqueDateStrings.forEach(dateStr => {
      uniqueDates.push(new Date(dateStr));
    });
  
    return uniqueDates.sort((a, b) => a - b); // Ensure dates are in ascending order
  };