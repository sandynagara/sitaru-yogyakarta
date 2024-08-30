import React,{useState,useRef} from 'react'
import {AiOutlineUpload,AiFillFile,AiOutlineClose} from "react-icons/ai"
import configData from "../../config.json"
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import LoadingIcon from "../../../images/Loading.svg"
function FormPermohonan() {

    const inputformulir = useRef(null) 
    const inputSertifikat = useRef(null) 
    const inputKtp = useRef(null) 
    const inputDenah = useRef(null) 
    
    const [loading, setLoading] = useState(false)
    const [openSnackbar, setOpenSnackbar] = useState({open:false,condition:"error"})
    const [form, setForm] = useState({
        email:"",
        pemohon:"",
        nik:"",
        alamat:"",
        nomor:"",
        formulir:"",
        ktp:"",
        sertifikat:"",
        denah:"",
    })
        
    const ListForm = [
        {
            label:"Email",
            field:"email",
            type:"text"
        },
        {
            label:"Pemohon",
            field:"pemohon",
            type:"text"
        },
        {
            label:"NIK",
            field:"nik",
            type:"number"
        },
        {
            label:"Alamat",
            field:"alamat",
            type:"text"
        },
        {
            label:"Nomor Whatsapp",
            field:"nomor",
            type:"number"
        }
    ]

    const ListUpload = [
        {
            label:"Formulir Permohonan Informasi Kesesuaian Tata Ruang",
            field:"formulir",
            type:"application/pdf",
            ref:inputformulir,
            note:  <div className='text-xs'>Template formulir di <a href={"http://bit.ly/Pelayanandinpertarujogja"} className='text-[#1A73E9]'>http://bit.ly/Pelayanandinpertarujogja</a>, Format file dalam pdf </div>
        },
        {
            label:"KTP Pemohon",
            field:"ktp",
            type:"image/png, image/gif, image/jpeg",
            ref:inputKtp,
            note:  <div className='text-xs'>Format file dalam png,jpg atau jpeg</div>
        },
        {
            label:"Sertifikat Tanah",
            field:"sertifikat",
            type:"image/png, image/gif, image/jpeg",
            ref:inputSertifikat,
            note:  <div className='text-xs'>Format file dalam png,jpg atau jpeg</div>
        },
        {
            label:"Denah Letak Tanah",
            field:"denah",
            type:"image/png, image/gif, image/jpeg",
            ref:inputDenah,
            note:  <div className='text-xs'>Format file dalam png,jpg atau jpeg</div>
        }
    ]

    const setValueForm = (field,value) => {
        setForm({ ...form, [field]: value });
    }

    const uploadForm =  async () => {
        if (loading) return
        setLoading(true)
        const url = configData.SERVER_API + "permohonan"

        var body = new FormData()
        var checkFile = true
        Object.entries(form).map(([key, value]) => {
            if(value == ""){
                checkFile = false
            }
            body.append(key, value)
        })

        if(!checkFile){
            setOpenSnackbar({open:true,condition:"error"})
            setLoading(false)
            return
        }
     
        const response = await fetch(url,{
            method:"POST",
            credentials:"include",
            body:body
        });
        const data = await response.json();
        setLoading(false)
        setOpenSnackbar({open:true,condition:"succes"})
    }

    const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
        return;
    }
        setOpenSnackbar({open:false,condition:"error"});
    };
    

  return (
    <div className='flex flex-col gap-4 lg:px-16'>
        <div className='px-4 py-2 lg:py-4 flex flex-col gap-3'>
            <div className='text-xl font-bold text-[#0C2879]'>Permohonan Informasi Kesesuaian Tata Ruang</div>
            <div className='text-gray-500 text-justify'>
                Pastikan Anda mengisi data dan mengunggah persyaratan dengan benar!
                Untuk Informasi Kesesuaian Tata Ruang akan dikirimkan melalui email/nomor telepon yang tertera,
                Informasi lebih lanjut dapat menghubungi WhatsApp 08112735100,
                Terimakasih.
            </div>
        </div>
        <div className='flex flex-col gap-4 px-4 lg:px-8 py-2 lg:py-8  border-2 rounded-md bg-white lg:w-full'>

            <div className='text-[#0C2879] text-lg font-bold'>Permohonan IKTR</div>

            <div className=' flex flex-col lg:grid lg:grid-cols-2 lg:gap-4'>
                {ListForm.map((form,index)=>{
                    return <div key={index} className=' flex flex-col gap-2'>
                        <div className=' text-gray-500'>{form["label"]}</div>
                        <input onChange={(e)=>setValueForm(form["field"],e.target.value)} type={form["type"]} className='w-full  h-10  font-semibold px-2 py-3 border-2 rounded-md border-solid'/>
                    </div>
                })}

                {ListUpload.map((item,index)=>{
                    return <div className='flex flex-col gap-2' key={index}>
                        <input onChange={(e)=>setValueForm(item["field"],e.target.files[0])} type='file' accept={item["type"]} id='file' ref={item["ref"]} style={{display: 'none'}}/>
                        <div className=' text-gray-500'>{item["label"]}</div>

                        {form[item["field"]] == "" && 
                            <div className='py-2 flex justify-center gap-2 items-center border-[1px] font-semibold text-[#1A73E9] hover:bg-gray-50 cursor-pointer'
                                onClick={()=>{item["ref"].current.click()}}
                            >
                                <AiOutlineUpload size={20}/>
                                <div>Tambahkan File</div>
                            </div>
                        }
                        
                        {form[item["field"]] !== "" && 
                            <div className='flex justify-center items-center gap-2 border-[1px] py-2 relative cursor-pointer hover:bg-gray-50'>
                                <AiFillFile color='#D93025' size={20}/>
                                {form[item["field"]]["name"]} 
                                <div onClick={(e)=>{
                                        setValueForm(item["field"],"")
                                        e.stopPropagation();
                                    }} 
                                    className='absolute right-3 cursor-pointer'>
                                    <AiOutlineClose size={20}/>
                                </div>
                            </div>
                        }
                        
                        {item["note"]}
                    </div>
                })}
                
              
            </div>

            <div onClick={uploadForm} className='bg-[#1A73E9] hover:bg-[#106ce4] mt-5 flex justify-center items-center p-2 text-white rounded-lg cursor-pointer'>
                {loading ? <img src={LoadingIcon} className='w-5'/> : "Unggah"}
            </div>  
            <Snackbar
                open={openSnackbar["open"]}
                autoHideDuration={2000}
            >   
                {openSnackbar["condition"] === "error" ? <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                    Ada data yang kosong! Tolong lengkapi data tersebut!
                </Alert> : <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    Permohonan berhasil diunggah
                </Alert>}
                
            </Snackbar>
        </div>
    </div>

  )
}

export default FormPermohonan