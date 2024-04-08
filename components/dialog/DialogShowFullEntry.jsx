import React from "react";
import { useRouter } from "next/navigation";

const DialogShowFullEntry = ({
  setIsOpen,
  buttonSize,
  selectedEntry,
  setIsDeleteDialog,
  setIsEdit,
}) => {
  const keysOrder = ["date", "time", "symptom", "trigger", "severity", "notes"];
  const router = useRouter();

  return (
    <>
      <div className="relative">
        <button
          className="absolute -top-8 -right-2 m-2 font-extrabold text-2xl text-tangerine-600 font-satoshi"
          onClick={() => {
            setIsOpen(false);
          }}
        >
          X
        </button>
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
          className={`${buttonSize} text-lg font-semibold rounded-xl font-satoshi bg-tiffany-500 text-dark-blue-2`}
          onClick={() => {
            router.push(`/edit/${selectedEntry._id}`);
            setTimeout(() => setIsEdit(false), 300);
          }}
        >
          Edit
        </button>
        <button
          className={`${buttonSize} text-lg font-semibold text-white rounded-xl bg-tangerine-600 font-satoshi`}
          onClick={() => setIsDeleteDialog(true)}
        >
          Delete
        </button>
      </div>
    </>
  );
};

export default DialogShowFullEntry;
