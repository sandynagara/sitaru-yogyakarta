import React,{useState} from 'react'
import Swal from "sweetalert2"
import {AiOutlineClose} from "react-icons/ai"
import Loading from "../../images/Loading.svg"


function UploadPeta({setUploadOpen,setBerubah,berubah}) {

    const [nama, setNama] = useState("")
    const [file, setFile] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const unggahPeta = () => {
        setIsLoading(true)
        const url = `${process.env.REACT_APP_BASE_URL}/` + "peta"

        var data = new FormData()
        data.append('peta', file)
        data.append('nama', nama)
        
        fetch(url,{
            method:"POST",
            credentials:"include",
            body:data
        }).then(res=>res.json()).then((res)=>{
            setIsLoading(false)
            if(res["RTN"]){
                setBerubah(!berubah)
                setUploadOpen(false)
                Swal.fire({
                    icon: 'success',
                    title:'Peta berhasil ditambahkan',
                    timer: 2000,
                    }
                )
            }else{
                Swal.fire({
                    icon: 'error',
                    title: 'Maaf',
                    text: 'Peta gagal ditambahkan',
                })
            }
        })
    }

  return (
    <div className='w-screen h-screen fixed bg-black top-0 left-0 bg-opacity-60 flex justify-center items-center'>
        <div className='bg-white relative w-3/4 lg:w-1/2 p-5 rounded-md'>
            <AiOutlineClose className='absolute right-3 top-5 w-5 h-6 cursor-pointer text-red-400' onClick={()=>setUploadOpen(false)}/>
            <div className='font-bold text-center mb-5'>
                Upload Peta
            </div>
            <div>
                Nama Peta :
            </div>
            <input 
                className='border-2 p-2 border-gray-600 w-full rounded-md my-3'
                onChange={(e)=>setNama(e.target.value)}
            />
            <div className='mb-2'>
                File Peta (*pdf & *maksimal 10 MB):
            </div>
            
            <input className="block w-full text-sm text-gray-900 bg-gray-50 rounded-r-lg border py-2 border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="file_input" type="file" accept="application/pdf" onChange={(e)=>setFile(e.target.files[0])}/>
            <div 
                className={` p-2 mt-3 rounded-md flex justify-center text-white text-center ${nama !== "" && file ? "bg-sky-600 hover:bg-sky-700  cursor-pointer" : "bg-gray-500 "}`}
                onClick={()=>{
                    if(nama !== "" && file){
                        unggahPeta()
                    }
                }}
            >   
                {isLoading ? <img src={Loading} className="w-5 h-5" alt='loading'/> : "Unggah"}
                
            </div>
        </div>
    </div>
  )
}

export default UploadPeta