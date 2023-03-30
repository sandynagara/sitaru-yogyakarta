import React,{useState,useEffect} from 'react'
import {AiOutlineSearch} from "react-icons/ai"
import {GiPositionMarker} from 'react-icons/gi'

function ListTool({on,setOn,setListAddress}) {

    const handleToggleAddress = (value) => {
        if(on == value){
            setOn(false)
            return
        }
        setOn(value)
        setListAddress(false)
    }

  return (
    <div className='flex flex-col gap-2'>
        <div className='rounded-md flex justify-center items-center bg-white w-9 h-10 cursor-pointer hover:bg-gray-200'
            onClick={()=>handleToggleAddress("geocoding")}
        >
            <AiOutlineSearch color='#1976D2' size={20}/>
        </div>
        <div className='rounded-md flex justify-center items-center bg-white w-9 h-10 cursor-pointer hover:bg-gray-200'
            onClick={()=>handleToggleAddress("koordinat")}
        >
            <GiPositionMarker color='#1976D2' size={20}/>
        </div>
    </div>
 
  )
}

export default ListTool