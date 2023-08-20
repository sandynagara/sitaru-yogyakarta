import React,{useState,useEffect} from 'react'
import {AiOutlineSearch} from "react-icons/ai"
import {GiPositionMarker} from 'react-icons/gi'

function ListTool({on,setOn,setListAddress,setCenterMarker}) {

    const handleToggleAddress = (value) => {
        if(on == value){
            setOn(false)
            setCenterMarker(false)
            return
        }
        setOn(value)
        setListAddress(false)
    }

    const ListToolItem = [
        {
            toolbar:"geocoding",
            icon:<AiOutlineSearch color='#1976D2' size={20}/>
        }
        // {
        //     toolbar:"koordinat",
        //     icon:<GiPositionMarker color='#1976D2' size={20}/>
        // },
    ]

  return (
    <div className='flex flex-col gap-2'>
        {ListToolItem.map((item,index)=>{
            return (
                <div key={index} className='rounded-md flex justify-center items-center bg-white w-9 h-9 cursor-pointer hover:bg-gray-200'
                        onClick={()=>handleToggleAddress(item["toolbar"])}
                >
                    {item["icon"]}
                </div>
            )
        })}
    </div>
 
  )
}

export default ListTool