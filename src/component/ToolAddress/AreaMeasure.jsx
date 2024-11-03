import React from "react";

function AreaMeasure({ type, onClick, unit, value, resetHandle }) {
  return (
    <div className="flex flex-col gap-3">
      <div className="text-sm">
        <b>Klik</b> pada area peta untuk mulai mengukur {type}.<br />
        <b>Klik Dua </b>Kali untuk selesai mengukur {type}.<br />
        <b>Klik Reset</b> untuk mengulang proses dari awal.
      </div>
      <div className="flex flex-col  border-2 border-gray-200 p-2">
        <div className=" font-medium">{type}</div>
        <div>
          {value} {unit}
        </div>
      </div>
      <div className="flex gap-2 text-sm font-medium cursor-pointer">
        <div
          onClick={resetHandle}
          className="border-2 border-blue-950 rounded-md w-full p-2 text-center"
        >
          Reset
        </div>
        <div
          className="border-2 border-blue-950 bg-blue-950 text-white rounded-md w-full  p-2 text-center"
          onClick={onClick}
        >
          Selesai
        </div>
      </div>
    </div>
  );
}

export default AreaMeasure;
