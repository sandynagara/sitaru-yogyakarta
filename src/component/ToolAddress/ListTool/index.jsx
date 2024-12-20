import React from 'react'
import {AiOutlineSearch} from "react-icons/ai";
import { TbRulerMeasure } from "react-icons/tb";
import { useTool } from '../hooks/useTool';

function ListTool({on,setOn,setListAddress,setCenterMarker}) {

    const TOOL = useTool()

    const handleToggleAddress = (value) => {
        if(on == value){
            setOn(false)
            setCenterMarker(false)
            TOOL.resetAll()
        }else{
            setOn(value)
            setListAddress([])
        }
    }

    const ListToolItem = [
        {
            toolbar:"geocoding",
            icon:<AiOutlineSearch color='#1E2E4A' size={20}/>
        },
        {
            toolbar:"measure",
            icon:<TbRulerMeasure color='#1E2E4A' size={20}/>
        },
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