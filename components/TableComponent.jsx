"use client";

import React, { useState } from "react";
import { useMediaQuery } from "@mui/material";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import { Dialog, DialogPanel } from "@tremor/react";
import DialogDelete from "./dialog/DialogDelete";
import DialogShowFullEntry from "./dialog/DialogShowFullEntry";

const TableComponent = ({ entries, handleDelete }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [isDeleteDialog, setIsDeleteDialog] = useState(false);

  const isMobile = useMediaQuery("(max-width:600px)");

  const fontSize = isMobile ? "text-md" : "text-lg";
  const buttonSize = isMobile ? "px-4 py-2 text-md" : "px-4 py-2 text-lg";
  const headerStyles =
    "font-satoshi font-bold md:font-extrabold text-dark-blue-2";

  const createData = (_id, time, symptom, trigger, severity, notes) => {
    return { _id, time, symptom, trigger, severity, notes };
  };

  const entriesByDate = entries.reduce((groups, entry) => {
    const date = entry.date;
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(entry);
    groups[date].sort((a, b) => new Date(`1970/01/01 ${a.time}`) - new Date(`1970/01/01 ${b.time}`));
    return groups;
  }, {});

  const sortedDates = Object.keys(entriesByDate).sort(
    (a, b) => new Date(b) - new Date(a)
  );

  const borderStyle = { border: 0, "& > *": { borderBottom: "unset" } };

  const columns = [
    {
      id: "time",
      label: "Time",
      minWidth: "4%",
      mdWidth: "10%",
      sx: borderStyle,
    },
    {
      id: "symptom",
      label: "Symptom",
      minWidth: "4%",
      mdWidth: "8%",
      sx: borderStyle,
    },
    {
      id: "trigger",
      label: "Trigger",
      minWidth: "4%",
      mdWidth: "8%",
      sx: borderStyle,
    },
    {
      id: "severity",
      label: "Severity",
      minWidth: "2%",
      mdWidth: "3%",
      sx: borderStyle,
    },
    {
      id: "notes",
      label: "Notes",
      minWidth: "150px",
      mdWidth: "auto",
      sx: borderStyle,
    },
  ];

  return (
    <>
      <Dialog open={isOpen} onClose={(val) => setIsOpen(val)} static={true}>
        <DialogPanel>
          {isDeleteDialog ? (
            <DialogDelete
              setIsOpen={setIsOpen}
              handleDelete={handleDelete}
              buttonSize={buttonSize}
              entryToDelete={selectedEntry._id}
              setIsDeleteDialog={setIsDeleteDialog}
            />
          ) : (
            <DialogShowFullEntry
              setIsOpen={setIsOpen}
              buttonSize={buttonSize}
              selectedEntry={selectedEntry}
              setIsDeleteDialog={setIsDeleteDialog}
            />
          )}
        </DialogPanel>
      </Dialog>

      <div className="flex w-full overflow-x-auto">
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={borderStyle}>
                <TableCell
                  sx={{ ...borderStyle, width: { sm: "4%", md: "8%" } }}
                ></TableCell>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    sx={{
                      ...column.sx,
                      width: { sm: column.minWidth, md: column.mdWidth },
                    }}
                    className={`${fontSize} ${
                      isMobile && (column.id === "time" || column.id === "severity") ? "hidden" : ""
                    } ${headerStyles}`}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedDates.map((date) => (
                <React.Fragment key={date}>
                  <TableRow className="bg-tiffany-500" sx={borderStyle}>
                    <TableCell
                      colSpan={6}
                      align="left"
                      className="text-xl font-bold text-dark-blue-2 font-satoshi"
                      sx={borderStyle}
                    >
                      {date}
                    </TableCell>
                  </TableRow>
                  {entriesByDate[date].map((entry, index) => {
                    const row = createData(
                      entry._id,
                      entry.time,
                      entry.symptom,
                      entry.trigger,
                      entry.severity,
                      entry.notes
                    );
                    return (
                      <TableRow
                        key={`${row._id}-${index}`}
                        className={`${index % 2 === 0 ? "" : "bg-tiffany-300"}`}
                        sx={{ border: 0, "& > *": { borderBottom: "unset" } }}
                      >
                        <TableCell
                          sx={{ ...borderStyle, width: { sm: "4%", md: "8%" } }}
                        >
                          <button
                            onClick={() => {
                              if (!isMobile) {
                                setIsDeleteDialog(true);
                              }
                              setIsOpen(true);
                              setSelectedEntry(entry);
                            }}
                            className="mt-4 md:ml-5"
                            style={{ minWidth: "30px", minHeight: "30px" }}
                          >
                            <img
                              src={isMobile ? "/eye.png" : "/trash.png"}
                              alt={isMobile ? "View" : "Delete"}
                              className="w-8 h-8 "
                            />
                          </button>
                        </TableCell>
                        <TableCell
                          className={`${fontSize} ${isMobile ? "hidden" : ""}`}
                          sx={{
                            ...borderStyle,
                            width: { sm: "4%", md: "10%" },
                          }}
                          component="th"
                          scope="row"
                        >
                          {row.time}
                        </TableCell>
                        <TableCell
                          className={fontSize}
                          sx={{ ...borderStyle, width: { sm: "4%", md: "8%" } }}
                          align="left"
                        >
                          {row.symptom}
                        </TableCell>
                        <TableCell
                          className={fontSize}
                          sx={{ ...borderStyle, width: { sm: "4%", md: "8%" } }}
                          align="left"
                        >
                          {row.trigger}
                        </TableCell>
                        <TableCell
                          className={`${fontSize} ${isMobile ? "hidden" : ""}`}
                          sx={{ ...borderStyle, width: { sm: "2%", md: "3%" } }}
                          align="center"
                        >
                          {row.severity}
                        </TableCell>
                        <TableCell
                          className={fontSize}
                          sx={{
                            ...borderStyle,
                            minWidth: "150px",
                            width: "auto",
                          }}
                          align="left"
                        >
                          {row.notes}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
};

export default TableComponent;
