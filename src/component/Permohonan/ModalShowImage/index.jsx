import React from 'react'
import Modal from '@mui/material/Modal';
import {AiOutlineArrowLeft} from "react-icons/ai"
import {BsFillImageFill} from "react-icons/bs"
import {FiDownload} from "react-icons/fi"
import {Link} from "react-router-dom"

function ModalShowImage({open,setOpen,imageData}) {

  const handleDownload = async () => {
    const response = await fetch(imageData["url"]);
    const blob = await response.blob();

    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = imageData["name"];
    link.click();

    // Clean up the temporary URL object
    window.URL.revokeObjectURL(link.href);
  };

  return (
    <Modal open={open} onClose={()=>setOpen(!open)}>
        <div className='fixed w-screen h-screen flex justify-center items-center'>
            <div onClick={()=>setOpen(!open)} className='absolute w-screen h-screen z-[-1]'/>
            <div className='absolute top-0 w-full flex p-5 items-center justify-between'>
                <div className='flex gap-3 items-center'>
                  <AiOutlineArrowLeft color="white" size={18} className=' cursor-pointer' onClick={()=>setOpen(!open)}/>
                  <BsFillImageFill color="white" size={15}/>
                  <div className='text-white'>
                    {imageData["name"]}
                  </div>
                </div>
                <Link to={imageData["url"]} target="_blank" download>Download</Link>
                <FiDownload color="white" size={20} className='cursor-pointer' onClick={handleDownload}/>
            </div>
  
            {imageData && <img className='p-4 w-auto h-auto max-h-[90vh]' src={imageData["url"]}  alt='logo gatra matra'/>}
        </div>
    </Modal>
  )
}

export default ModalShowImage