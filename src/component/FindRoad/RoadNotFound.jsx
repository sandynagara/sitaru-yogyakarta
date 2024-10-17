import React from 'react'
import { FaMapMarkerAlt } from "react-icons/fa";

function RoadNotFound() {
  return (
    <div className='flex justify-center text-sm cursor-pointer items-center p-3 bg-[#1E2E4A] rounded-md text-white' onClick={onClick && onClick}>
        Not Found
    </div>
  )
}

export default RoadNotFound