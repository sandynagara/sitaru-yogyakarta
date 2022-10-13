import React from 'react'
import {AiOutlineQuestion} from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'
import Swal from "sweetalert2"

function ItemMenu({icon,judul,keterangan="Belum diisi",active=false,link="/"}) {

  const navigate = useNavigate()

  const movePage = () => {
    if(active){
      navigate(link);
    }else{
      Swal.fire({
        icon: 'error',
        title: 'Maaf',
        text: `Fitur ${judul} masih dalam tahap pengembangan`,
      })
    }
    
  }

  return (
    <div className='bg-white p-2 flex flex-col items-center'>
      <div className='z-10 w-[80px] h-[80px] flex justify-center items-center bg-sky-200 m-2 rounded-md'>
        {active ? icon : <AiOutlineQuestion size={35}/>}
      </div>
    
        <div className='text-center cursor-pointer w-64 border-2 rounded-xl mt-[-40px] pt-[40px] pb-5 border-gray-200 p-2 hover:shadow-lg hover:shadow-gray-300'
          onClick={()=>{movePage()}}
        >
          <div className='font-bold text-sky-700 text-lg' style={active?{}:{color:"rgb(220 38 38)"}}>
            {judul}
          </div>
          <div className='text-sm mt-4 text-gray-500 font-medium'>
            {keterangan}
          </div>
        </div>
      
    </div>
  )
}

export default ItemMenu