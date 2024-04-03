import React from "react";

const DialogDelete = ({
  setIsOpen,
  handleDelete,
  buttonSize,
  entryToDelete,
  setIsDeleteDialog,
  isDashboard,
}) => {
  return (
    <div>
      <h3>Are you sure you want to delete this entry?</h3>
      <div className="flex w-full mx-4 mt-10 justify-evenly">
        <button
          className={`${buttonSize} text-lg font-semibold border rounded-xl bg-tiffany-500 text-dark-blue-2 font-satoshi border-none`}
          onClick={() => {
            setIsOpen(false);
            handleDelete(entryToDelete);
            {
              isDashboard
                ? setTimeout(() => setIsOpen(false), 500)
                : setTimeout(() => setIsDeleteDialog(false), 500);
            }
          }}
        >
          Ok
        </button>
        <button
          className={`${buttonSize} text-lg font-semibold text-white border rounded-xl bg-tangerine-600 font-satoshi border-none`}
          onClick={() => {
            setIsOpen(false);
            setTimeout(() => setIsDeleteDialog(false), 500);
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default DialogDelete;
