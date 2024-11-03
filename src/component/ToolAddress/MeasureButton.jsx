import React from "react";

function MeasureButton({ name, active, icon, onClick }) {
  return (
    <div
      onClick={onClick}
      className={` ${
        active ? "bg-sky-300" : "hover:border-sky-400 hover:bg-sky-100"
      } text-sm flex gap-2 justify-center items-center p-2 rounded-md border-2  w-full cursor-pointer`}
    >
      {icon} {name}
    </div>
  );
}

export default MeasureButton;
