import React, { useState } from "react";
import { Dialog, DialogPanel } from "@tremor/react";
import { useMediaQuery } from "@mui/material";
import Image from "next/image";
import DialogDelete from "./dialog/DialogDelete";

const Entry = ({ entryKey, value, showFullNotes }) => (
  <div className="flex" key={entryKey}>
    <h1 className="text-lg font-bold">
      {entryKey.charAt(0).toUpperCase() + entryKey.slice(1)}:
    </h1>
    <h1 className={`pr-4 ml-3 desc ${showFullNotes ? "" : "truncate"}`}>
      {value}
    </h1>
  </div>
);

const Card = ({
  date,
  id,
  symptom,
  trigger,
  time,
  severity,
  notes,
  handleDelete,
  isDashboard,
}) => {
  const entries = React.useMemo(() => {
    return Object.entries({ date, symptom, trigger, time, severity, notes });
  }, [date, symptom, trigger, time, severity, notes]);

  const isMobile = useMediaQuery("(max-width:600px)");

  const buttonSize = isMobile ? "py-1 px-4 text-sm" : "px-8 py-2 text-lg";

  const [showFullNotes, setShowFullNotes] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const shouldShowToggle = notes && notes.length > 100;
  const toggleNotes = () => setShowFullNotes(!showFullNotes);

  return (
    <>
      <Dialog open={isOpen} onClose={(val) => setIsOpen(val)} static={true}>
        <DialogPanel>
          <DialogDelete
            setIsOpen={setIsOpen}
            handleDelete={handleDelete}
            buttonSize={buttonSize}
            entryToDelete={id}
            isDashboard={"true"}
          />
        </DialogPanel>
      </Dialog>
      <div
        className={`flex-auto max-w-[326px] min-h-[230px] ${
          showFullNotes ? "" : "max-h-[230px]"
        } mt-4 bg-white shadow-lg rounded-xl sm:w-1/2 md:w-1/3 lg:w-1/4 flex flex-row`}
      >
        <div className="px-6 py-4 ">
          {entries.map(([entryKey, value]) => (
            <Entry
              key={entryKey}
              entryKey={entryKey}
              value={value}
              showFullNotes={showFullNotes}
            />
          ))}
          {shouldShowToggle && (
            <button
              onClick={toggleNotes}
              className="mt-2 text-sm text-blue-500 hover:text-blue-700"
            >
              {showFullNotes ? "See Less" : "See More"}
            </button>
          )}
        </div>
        <div>
          {isDashboard && (
            <button onClick={() => setIsOpen(true)} className="mt-4">
              <Image src="/trash.png" alt="delete" width={30} height={30} />
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default Card;
