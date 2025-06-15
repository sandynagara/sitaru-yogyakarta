import { Typography } from '@mui/material'
import React from 'react'
import { AiOutlineArrowLeft } from "react-icons/ai"
import { Link } from 'react-router-dom'

function BackHome() {
  return (
    <Link to={"/"}>
      <div className='flex items-center gap-2 cursor-pointer'>
        <AiOutlineArrowLeft size={20} color='#0C2879' />
        <div className='font-bold text-[#0C2879] text-lg'>Back To Home</div>
      </div>
    </Link>
  )
}

export default BackHome