"use client";
import { useState, useEffect } from "react";
import { handleDelete } from "@utils/utils";
import Pagination from "@mui/material/Pagination";
import TableComponent from "@components/TableComponent";
import { Dialog, DialogPanel } from "@tremor/react";

const Archive = () => {
  const [entries, setEntries] = useState([]);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const res = await fetch("/api/stored/entry");
        const data = await res.json();
        setEntries(data);
      } catch (error) {
        console.error("Failed to fetch entries:", error);
      }
    };
    fetchEntries();
  }, []);

  const convertToCSV = (entries) => {
    const convertDate = (date) => {
      const [month, day, year] = date.split("-");
      return `${year}-${month}-${day}`;
    };

    const sortedEntries = entries.sort((a, b) => {
      const dateA = new Date(`${convertDate(a.date)}T${a.time}`);
      const dateB = new Date(`${convertDate(b.date)}T${b.time}`);
      return dateB - dateA;
    });

    const headers = "Date,Time,Symptom,Trigger,Severity,Notes\n";
    const rows = sortedEntries
      .map(
        (entry) =>
          `${entry.date},${entry.time},${entry.symptom},${entry.trigger},${
            entry.severity
          },"${entry.notes.replace(/"/g, '""')}"`
      )
      .join("\n");
    return headers + rows;
  };

  const downloadCSV = () => {
    const csvString = convertToCSV(entries);
    const blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "archive_entries.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <>
      <Dialog open={isOpen} onClose={(val) => setIsOpen(val)} static={true}>
        <DialogPanel>
          <div className="w-full text-center">
            <span className="text-2xl font-bold font-satoshi text-dark-blue-2">
              Download all entries?
            </span>
            <div className="flex mt-10 justify-evenly">
              <button
                onClick={() => {
                  downloadCSV();
                  setIsOpen(false);
                }}
                className="px-4 py-2 font-semibold border border-none text-md md:text-lg rounded-xl bg-tiffany-500 text-dark-blue-2 font-satoshi"
              >
                Download
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 font-semibold text-white border border-none text-md md:text-lg rounded-xl bg-tangerine-600 font-satoshi"
              >
                Cancel
              </button>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
      <div className="w-11/12 md:w-full">
        <div className="flex justify-end">
          <button
            onClick={() => setIsOpen(true)}
            className="flex items-center px-4 py-2 mb-4 text-sm font-bold border-2 rounded md:text-lg text-dark-blue-2 border-dark-blue-2 bg-tiffany-500 hover:bg-tiffany-600"
          >
            <img
              src="/assets/icons/download.png"
              alt="Download"
              className="h-4 w-4 md:h-6 md:w-6 text-dark-blue-2 -ml-2 mr-2"
            />
            Download CSV
          </button>
        </div>
        <TableComponent
          entries={[...entries]
            .reverse()
            .slice((page - 1) * rowsPerPage, page * rowsPerPage)}
          handleDelete={(id) => handleDelete(id, entries, setEntries)}
        />
        <Pagination
          count={Math.ceil(entries.length / rowsPerPage)}
          page={page}
          onChange={handleChangePage}
          className="pt-4 pb-10"
        />
      </div>
    </>
  );
};

export default Archive;
