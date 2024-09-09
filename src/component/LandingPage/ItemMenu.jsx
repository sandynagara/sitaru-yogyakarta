import React from 'react'
import {AiOutlineQuestion} from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'
import Swal from "sweetalert2"

function ItemMenu({icon,judul,keterangan="Belum diisi",active=false,link="/",customAction=false}) {

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
    <div className='p-2 flex flex-col items-center'>
      <div className='z-10 w-[80px] h-[80px] flex justify-center items-center bg-[#111926] m-2 rounded-md border-2 border-gray-200 '>
        {active ? icon : <AiOutlineQuestion size={35}/>}
      </div>
    
        <div className='text-center bg-[#111926] cursor-pointer w-64 border-2 rounded-xl mt-[-40px] pt-[40px] pb-5 border-gray-200 p-2 hover:shadow-lg hover:shadow-gray-300'
          onClick={()=>{
            if(customAction){
              customAction()
            }else{
              movePage()
            }
          }
          }
        >
          <div className='font-bold text-white text-lg' style={active?{}:{color:"rgb(220 38 38)"}}>
            {judul}
          </div>
          <div className='text-sm mt-4 text-white font-medium'>
            {keterangan}
          </div>
        </div>
    </div>
  )
}

export default ItemMenu