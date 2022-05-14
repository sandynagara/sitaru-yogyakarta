import React from 'react'
import "./Panduan.css"

function Panduan({setOpen}) {
  return (
    <div className='pop-up'>
        <div></div>
        <div className='black-layer' onClick={()=>setOpen(false)}></div>
    </div>
  )
}

export default Panduan