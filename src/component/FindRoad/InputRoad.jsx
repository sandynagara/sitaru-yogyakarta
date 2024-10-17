import React from 'react'
import { useRoad } from "./hooks/useRoad";

function InputRoad() {

    const ROAD = useRoad();

    const processChange = debounce((e) => saveInput(e));
    function debounce(func, timeout = 2000) {
        let timer;
        return (...args) => {
          clearTimeout(timer);
          timer = setTimeout(() => {
            func.apply(this, args);
          }, timeout);
        };
    }

    function saveInput(e) {
        ROAD.get_road(e)
    }

    return (
        <div className={`flex flex-col`}>
            <div className='text-sm'>Masukkan <b>Nama Jalan</b></div>
            <div className="flex items-center">
              <input className='px-2 py-2 w-full text-sm rounded-md  border-[2px] border-gray-700'
                onChange={(e)=>processChange(e.target.value)}
                placeholder='Nama Jalan'
              />
            </div>
        </div>
    )
}

export default InputRoad
