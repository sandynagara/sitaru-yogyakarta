import React,{useState} from 'react'
import Modal from '@mui/material/Modal';
import {AiOutlineClose,AiFillFile} from "react-icons/ai"

import ModalShowImage from '../ModalShowImage';

function ModalPermohonan({open,setOpen,data=false}) {

    const [openImage, setOpenImage] = useState(false)
    const [imageData, setImageData] = useState(false)

    const listField = [
        {"title":"Pemohon","field":"pemohon"},
        {"title":"Email","field":"email"},
        {"title":"NIK","field":"nik"},
        {"title":"Alamat","field":"alamat"},
        {"title":"Nomor","field":"nomor"},
        {"title":"Tanggal diunggah","field":"tanggal"},
    ]

    const listFieldFile = [
        {"title":"Formulir","type":"file","field":"formulir"},
        {"title":"KTP","type":"image","field":"ktp"},
        {"title":"Sertifikat","type":"image","field":"sertifikat"},
        {"title":"Denah","type":"image","field":"denah"},
    ]

    const convertISOtoLocal = (data) => {
        const date = new Date(data);
        let options = {year: 'numeric', month: 'numeric', day: 'numeric'};
        return date.toLocaleDateString('UTC', options);
    }

    const openFile = (path,name,type) => {
        let url = `${process.env.REACT_APP_BASE_URL}permohonan/${path}`
        if(type === "image"){
            setOpenImage(true)
            setImageData({url:url,name:name})
            return
        }
        let w = window.open("", '_blank');
        if(w.document) { 
             w.document.write('<html><head><title>'+name+'</title></head><body style="margin:0px;overflow:"hidden"><iframe src="' + url + '" height="100%" width="100%"></iframe></body></html>');
        }
    }

  return (
    <Modal open={open} onClose={()=>setOpen(!open)}>
        <div className='fixed  top-0 w-screen h-screen items-center flex justify-center'>
            <div className='bg-white p-4 w-11/12 lg:w-1/3 gap-4 flex flex-col rounded-md '>
                <div className='flex justify-between items-center'>
                    <div className='font-bold text-[#0C2879]'>
                        Detail Permohonan
                    </div>
                    <AiOutlineClose style={{cursor:"pointer"}} size={22} color="red" onClick={()=>setOpen(false)}/>
                </div>

                <div className='max-h-[70vh] overflow-y-scroll flex flex-col gap-4'>
                    {data && listField.map((field,index)=>{
                        return <div key={index}>
                            <div className='font-semibold'>
                                {field["title"]}
                            </div>
                            <div className=''>
                                {field["field"] === "tanggal" ? convertISOtoLocal(data[field["field"]]) : data[field["field"]]}
                            </div>
                        </div>
                    })}

                    {data && listFieldFile.map((field,index) => {
                        return <div key={index} onClick={()=>openFile(data[field["field"]],`${field["title"]}_${data["pemohon"]}`,field["type"] )}>
                            <div className='font-semibold'>
                                {field["title"]}
                            </div>
                            <div className='flex justify-left px-2 items-center gap-2 border-[1px] py-2 relative cursor-pointer hover:bg-gray-50'>
                                <AiFillFile color='#D93025' size={15}/>
                                <div className='text-sm'>
                                    {field["title"]}_{data["pemohon"]} 
                                </div>
                            </div>
                        </div>
                    })}
                </div>
            </div>
            <ModalShowImage open={openImage} setOpen={setOpenImage} imageData={imageData}/>
        </div>
    </Modal>
  )
}

export default ModalPermohonan