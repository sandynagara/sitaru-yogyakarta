import React from 'react'
import { FaMapMarkerAlt } from "react-icons/fa";

function RoadItem({name,onClick}) {
  return (
    <div className='flex justify-between text-sm cursor-pointer items-center p-3 bg-[#1E2E4A] rounded-md text-white' onClick={onClick && onClick}>
        {name}
        <FaMapMarkerAlt color='white'/>
    </div>
  )
}

export default RoadItem