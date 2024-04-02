import React from "react";

const DialogShowFullEntry = ({
  setIsOpen,
  buttonSize,
  selectedEntry,
  setIsDeleteDialog,
}) => {
  const keysOrder = ["date", "time", "symptom", "trigger", "severity", "notes"];

  return (
    <>
      <div>
        {keysOrder.map((key) => {
          const value = selectedEntry[key];
          if (
            value === undefined ||
            key === "_id" ||
            key === "isQuickAdd" ||
            key === "__v"
          ) {
            return null;
          }
          const capitalizedKey = key.charAt(0).toUpperCase() + key.slice(1);
          return (
            <div key={key} className="my-2">
              <span className="font-bold mr-4">{capitalizedKey}: </span>
              {value}
            </div>
          );
        })}
      </div>
      <div className="flex justify-evenly mt-8">
        <button
          className={`${buttonSize} text-lg font-semibold border rounded-xl bg-tiffany-500 text-dark-blue-2 font-satoshi border-none`}
          onClick={() => {
            setIsOpen(false);
          }}
        >
          Ok
        </button>
        <button
          className={`${buttonSize} text-lg font-semibold text-white border rounded-xl bg-tangerine-600 font-satoshi border-none`}
          onClick={() => setIsDeleteDialog(true)}
        >
          Delete
        </button>
      </div>
    </>
  );
};

export default DialogShowFullEntry;
