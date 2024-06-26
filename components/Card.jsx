import React, { useState } from "react";
import { Dialog, DialogPanel } from "@tremor/react";
import { useMediaQuery } from "@mui/material";
import Image from "next/image";
import DialogDelete from "./dialog/DialogDelete";
import DialogEdit from "./dialog/DialogEdit";

const Entry = ({
  entryKey,
  value,
  showFullNotes,
  isDashboard,
  setIsOpen,
  setIsEdit,
}) => (
  <div className="flex" key={entryKey}>
    <h1 className="text-lg font-bold">
      {entryKey.charAt(0).toUpperCase() + entryKey.slice(1)}:
    </h1>

    <h1
      className={`pr-4 ml-3 max-w-2xl text-lg text-gray-600 sm:text-xl ${
        showFullNotes ? "" : "truncate"
      } ${entryKey === "date" ? "w-3/5" : ""}`}
    >
      {value}
    </h1>
    {entryKey === "date" && isDashboard && (
      <>
        <button onClick={() => setIsOpen(true)} className="ml-6">
          <Image src="/trash.png" alt="delete" width={30} height={30} />
        </button>
        <button
          className="mx-4"
          onClick={() => {
            setIsEdit(true);
            setIsOpen(true);
          }}
        >
          <Image src="pencil.svg" alt="edit" width={25} height={25}/>
        </button>
      </>
    )}
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

  const [isEdit, setIsEdit] = useState(false);
  const [showFullNotes, setShowFullNotes] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const shouldShowToggle = notes && notes.length > 25;
  const toggleNotes = () => setShowFullNotes(!showFullNotes);

  return (
    <>
      <Dialog open={isOpen} onClose={(val) => {setIsOpen(val); setTimeout(() => setIsEdit(false), 300)}} static={true}>
        <DialogPanel>
          {isEdit ? (
            <DialogEdit 
            setIsOpen={setIsOpen}
            handleDelete={handleDelete}
            buttonSize={buttonSize}
            editPost={id}
            isDashboard={"true"}
            setIsEdit={setIsEdit}
            />
          ) : (
            <DialogDelete
              setIsOpen={setIsOpen}
              handleDelete={handleDelete}
              buttonSize={buttonSize}
              entryToDelete={id}
              isDashboard={"true"}
            />
          )}
        </DialogPanel>
      </Dialog>
      <div
        className={`flex-auto max-w-[326px] min-h-[230px] ${
          showFullNotes ? "" : "max-h-[230px]"
        } mt-4 bg-white shadow-lg rounded-xl sm:w-1/2 md:w-1/3 lg:w-1/4 flex flex-row`}
      >
        <div className="pl-6 py-4 max-w-[326px]">
          {entries.map(([entryKey, value]) => (
            <Entry
              key={entryKey}
              entryKey={entryKey}
              value={value}
              showFullNotes={showFullNotes}
              isDashboard={isDashboard}
              setIsOpen={setIsOpen}
              setIsEdit={setIsEdit}
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
      </div>
    </>
  );
};

export default Card;
