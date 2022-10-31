import React from 'react'
import {AiOutlineClose} from "react-icons/ai"
import ItemMenu from './LandingPage/ItemMenu'
import {GrDocumentConfig,GrDocumentTest} from "react-icons/gr"

function Layanan({setLayananOpen}) {
  return (
    <div className='w-screen h-screen fixed bg-black top-0 left-0 bg-opacity-60 flex justify-center items-center z-50 text-black'>
        <div className='bg-white relative  p-5 rounded-md flex flex-col items-center'>
            <AiOutlineClose className='absolute right-4 top-5 w-5 h-6 cursor-pointer text-red-400' onClick={()=>setLayananOpen(false)}/>
            <div className='font-bold text-center mb-5'>
                Layanan
            </div>
            <div className='lg:flex'>
                <ItemMenu judul={"Layanan IKTR"} 
                keterangan={"Permohonan Informasi Kesesuaian Tata Ruang"}
                customAction={()=>{window.open("https://docs.google.com/forms/d/1LPMOOlF3B7bF0v6ReLwfS1saVlubsH1J09qCrANMkfI/viewform?edit_requested=true", '_blank', 'noopener,noreferrer');}}
                active={true}
                icon={<GrDocumentConfig size={50}/>}
                />
                <ItemMenu judul={"Layanan KKPR"} 
                keterangan={"Sistem perizinan online DPMPTSP"}
                customAction={()=>{window.open("https://perizinanonline.jogjakota.go.id/layanan/landing/", '_blank', 'noopener,noreferrer');}}
                active={true}
                icon={<GrDocumentTest size={50}/>}
                />
            </div>
           
                
        </div>
        
    </div>
  )
}

export default Layanan