import React,{useEffect,useState} from 'react'
import {BiMapAlt} from 'react-icons/bi'
import {AiFillInfoCircle,AiFillDelete,AiFillEye,AiOutlineDownload,AiOutlineHome,AiOutlineUpload,AiOutlineLogout} from "react-icons/ai"
import Swal from "sweetalert2"
import configData from "../component/config.json"
import OpenPdf from '../component/PDF/OpenPdf'
import { useMediaQuery } from 'react-responsive'
import LoginForm from '../component/LoginRegister/LoginForm'
import {Link} from "react-router-dom"
import UploadRegulasi from '../component/Form/UploadRegulasi'

function Regulasi() {
  const [daftarRegulasiAwal, setDaftarRegulasiAwal] = useState(false)
  const [daftarRegulasi, setDaftarRegulasi] = useState(false)
  const [pdf, setPdf] = useState(false)
  const [open, setOpen] = useState(false)
  const [login, setLogin] = useState(false)
  const [berubah, setBerubah] = useState(false)
  const [uploadOpen, setUploadOpen] = useState(false)

  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-width: 800px)'
  })

  useEffect(() => {
    var url = configData.SERVER_API+"regulasi"
      fetch(url,{
        method: 'GET',
        credentials: 'include',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      })
      .then((respond) => respond.json())
      .then((hasil) =>{
        setDaftarRegulasiAwal(hasil)
        setDaftarRegulasi(hasil)
      })
      .catch((err)=>{
        console.log(err,"err")
      }); 
  }, [berubah])

  useEffect(() => {
    var url = configData.SERVER_API+"check"
    fetch(url,{
      method:"GET",
      credentials:"include"
    }).then(res=>res.json()).then(res=>{
      if(res != "unauthorized"){
        setLogin(true)
      }
    }).catch(err=>console.log(err))
  }, [])
  

  const downloadFile = (idFile,nama="No name") => {
    var url = configData.SERVER_API+"regulasi/"+idFile
    fetch(url).then(res=>res.blob()).then((res)=>{
      var data = new Blob([res], {type: 'application/pdf'});
      var csvURL = window.URL.createObjectURL(data);
      var tempLink = document.createElement('a');
      tempLink.href = csvURL;
      tempLink.setAttribute('download', `${nama}.pdf`);
      tempLink.click();
    })
  }

  const deleteFile = (idFile) => {
    Swal.fire({
      title: 'Apa anda yakin?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ya, hapus'
    }).then((result) => {
      if (result.isConfirmed) {
        var url = configData.SERVER_API+"regulasi/"+idFile
        fetch(url,{
            method:"DELETE",
            credentials:"include"
          }
        ).then(res=>res.json()).then(res=>{
          if(res["RTN"]){
            Swal.fire(
              'Deleted!',
              res["MSG"],
              'success'
            )
            setBerubah(!berubah)
          }else{
            Swal.fire(
              'Deleted!',
              res["MSG"],
              'error'
            )
          }
        }).catch(err=>{
          Swal.fire(
            'Deleted!',
            err,
            'error'
          )
        })
      }
    })
  }

  function formatBytes(bytes, decimals = 2) {
    if (!+bytes) return '0 Bytes'

    const k = 1024
    const dm = decimals < 0 ? 0 : decimals
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

    const i = Math.floor(Math.log(bytes) / Math.log(k))

    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
}

  const cariRegulasi = (text) => {
    var filtered = daftarRegulasiAwal.filter(function (data) { return data["nama"].toLowerCase().indexOf(text.toLowerCase()) !== -1; });
    setDaftarRegulasi(filtered)
  }

  const ItemRegulasi = ({data}) => {
    return <div className='flex w-full text-black lg:py-3 px-3 border-b-2 border-gray-300 hover:bg-gray-200 bg-white border-solid items-center justify-between lg:grid lg:grid-cols-6'>
    <div
      className='w-full  py-3 lg:py-0 lg:px-0 lg:col-span-3'
      onClick={()=>{
        var url = configData.SERVER_API+"regulasi/"+data["namaId"]
        if(!isDesktopOrLaptop){
          setPdf({url:url,nama:data["nama"]})
        }
      }}
    >
      {data["nama"]}
    </div>
    {isDesktopOrLaptop && <div>
      {data["tanggal"]}
    </div>}
    {isDesktopOrLaptop && <div>
      {formatBytes(data["ukuran"]) }
    </div>}
    {isDesktopOrLaptop && <div className='flex'>
      <AiFillEye size={23} className="mr-2 text-slate-600 cursor-pointer" onClick={()=>{
        var url = configData.SERVER_API+"regulasi/"+data["namaId"]
        setPdf({url:url,nama:data["nama"]})
      }}/>
      <AiOutlineDownload size={23} onClick={()=>downloadFile(data["namaId"],data["nama"])} className="cursor-pointer mr-2"/>
      {login && <AiFillDelete size={23} color="red" onClick={()=>deleteFile(data["namaId"])} className="cursor-pointer"/>}
    </div>}
    {!isDesktopOrLaptop && <AiFillInfoCircle size={25} color="gray" className='cursor-pointer' onClick={()=>{
      Swal.fire({
        title: '<strong>Info</u></strong>',
        icon: 'info',
        html:
          `<div>
            <div>Tanggal : ${data["tanggal"]}  </div> 
            <div>Ukuran : ${data["ukuran"]}  </div>
          </div>`,
        showCloseButton: true,
        focusConfirm: false,
        confirmButtonText:
          '<i class="fa fa-thumbs-up"></i> Close!',
      })
    }}/>}
  </div>
  }

  const logOut = () => {
    const url = configData.SERVER_API + 'logout'
    fetch(url,{
      method:"GET",
    }).then(res=>res.json()).then(res=>{
      if(res["RTN"]){
        setLogin(false)
      }
    })
  }

  return (
    <div className='h-screen bg-gray-300 lg:py-5 lg:px-10'>
      <div className='py-3 px-3 text-black flex items-center justify-between font-medium '>
        <div className='flex items-center'>
          <Link to="/">
            <div className='flex items-center bg-white px-3 rounded-md h-full'>
              <AiOutlineHome size={19} className='text-black py-1 w-9 h-8  cursor-pointer rounded-full'/>
              Home
            </div>
            
          </Link>
          {/* <BiMapAlt className='w-8 h-8 mr-1 rounded-full text-black p-1'/>
          Library Peta */}
        </div>
        <div className='flex'>
          {isDesktopOrLaptop &&
            <input 
            className=' px-3 py-2 mx-2 rounded-lg   text-sm' 
            placeholder='Cari Regulasi'
            onChange={(e)=>cariRegulasi(e.target.value)}
            />
          }
          {login ?
            <div className='flex text-white'>
              <div
                className='flex text-sm items-center cursor-pointer rounded-md bg-sky-600 hover:bg-sky-700 px-5 py-1 mr-2' 
                onClick={()=>setUploadOpen(true)}>
                  {isDesktopOrLaptop ? "Upload Data" : <AiOutlineUpload size={20}/> }
              </div>
              <div className='flex text-sm items-center cursor-pointer bg-red-600 hover:bg-red-700 rounded-md px-5 py-1' 
              onClick={logOut}>
                {isDesktopOrLaptop ? "Logout" : <AiOutlineLogout size={20}/> }
              </div>
            </div>
            : 
            <div>
              {/* <div className='flex items-center cursor-pointer' onClick={()=>setOpen(true)}>
                Login
                <AiOutlineLogin className='w-8 h-8 mr-1 rounded-full text-white p-1'/>
              </div> */}
              <div className='flex h-full text-sm items-center cursor-pointer rounded-md bg-sky-600 hover:bg-sky-700 px-5 py-1 mr-2 text-white' onClick={()=>setOpen(true)}>
                Login
              </div>
            </div>
          }
        </div>
        

      </div>
      {!isDesktopOrLaptop && 
        <div className='w-full flex flex-col'>
          <input 
          className=' p-2 mb-2 mx-2 rounded-md' 
          placeholder='Cari Regulasi'
          onChange={(e)=>cariRegulasi(e.target.value)}
          />
        </div>
      }
      <div className=' rounded-lg bg-white text-black mx-2'>
        <div className='py-3 px-3 font-semibold text-xl border-b-2 border-solid border-black lg:border-b-0'>
          Daftar Regulasi
        </div>
        {isDesktopOrLaptop &&
          <div className='py-2 px-3  lg:grid lg:grid-cols-6 font-medium border-b-2 border-solid border-black'>
          <div className='col-span-3'>
            Nama Regulasi
          </div>
          <div>
            Tanggal diunggah
          </div>
          <div>
            Ukuran
          </div>
          <div>
            Action
          </div>
        </div>
        }
        <div className='bg-white max-h-[calc(100vh_-_180px)] lg:max-h-[calc(100vh_-_200px)]  overflow-y-scroll scroll'>
          {daftarRegulasi && daftarRegulasi.map((data,index)=>{
            return <ItemRegulasi data={data} key={index}/>
          })}
        </div>
      </div>
      {pdf && <OpenPdf pdf={pdf} setPdf={setPdf}/>}
      {open && <div className='fixed bg-black bg-opacity-60 top-0 w-screen h-screen items-center flex justify-center'>
        <LoginForm setOpen={setOpen} setLogin={setLogin}/>
      </div> }
      {uploadOpen && <UploadRegulasi setUploadOpen={setUploadOpen} setBerubah={setBerubah} berubah={berubah}/>}
    </div>
  )
}

export default Regulasi