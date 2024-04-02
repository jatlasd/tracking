"use client"
import { useState, useEffect } from "react";
import { handleDelete } from "@utils/utils";
import Pagination from '@mui/material/Pagination';
import TableComponent from "@components/TableComponent";

const Archive = () => {
  const [entries, setEntries] = useState([]);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

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

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <div className="w-11/12 md:w-full">
      <TableComponent
        entries={[...entries].reverse().slice((page - 1) * rowsPerPage, page * rowsPerPage)}
        handleDelete={(id) => handleDelete(id, entries, setEntries)}
      />
      <Pagination
        count={Math.ceil(entries.length / rowsPerPage)}
        page={page}
        onChange={handleChangePage}
        className="pt-4 pb-10"
      />
    </div>
  );
};

export default Archive;