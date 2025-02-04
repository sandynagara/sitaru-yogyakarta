import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import axios from "axios";

function SearchAddress({ setCenter, setListAddress, listAddress }) {
  const [searchTerm, setSearchTerm] = useState("");

  const processChange = debounce((e) => saveInput(e));
  function debounce(func, timeout = 1000) {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func.apply(this, args);
      }, timeout);
    };
  }

  function saveInput(name) {
    if (name == "") {
      setListAddress([]);
    } else {
      fetchAddress(name);
    }
  }


  const fetchAddress = async (name) => {
    const url =
      `${process.env.REACT_APP_BASE_URL}/` + "geocoding/" + name;
    try {
      const response = await axios.get(url);
      if (response.data.length == 0) {
        setListAddress([{ display_name: "Alamat tidak ditemukan" }]);
      } else {
        setListAddress(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleClick = (value) => {
    if (value.display_name !== "Alamat tidak ditemukan") {
      const lat = value.lat;
      const lon = value.lon;
      setCenter([lat, lon]);
      setSearchTerm(value["display_name"]);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <TextField
        label=""
        id="outlined-size-small"
        defaultValue=""
        placeholder="Alamat"
        size="small"
        inputProps={{ style: { fontSize: "0.875rem" } }}
        value={searchTerm}
        className="w-[260px] text-xs p-0 bg-white"
        onChange={(e) =>{
            setSearchTerm(e.target.value)
            processChange(e.target.value)}
        }
      />
      <div className="bg-white max-h-[500px] w-[260px] flex flex-col">
        {listAddress &&
          listAddress.map((value, index) => {
            return (
              <div
                className="p-2 text-sm overflow-hidden cursor-pointer border-gray-200 border-solid border-[1px] hover:bg-sky-100"
                key={index}
                onClick={() => handleClick(value)}
              >
                {value["display_name"]}
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default SearchAddress;
