import React,{useEffect,useState,useContext} from 'react'
import "./HasilSimulasi.scss"
import {AiOutlineClose} from "react-icons/ai"

import SyaratHasilSimulasi from '../SyaratSimulasi'
import KetentuanHasilSimulasi from '../KetentuanSimulasi'
import IntensitasHasilSimulasi from '../IntensitasSimulasi'
import PdfWithoutKop from '../../PDF/PdfWithoutKop'
import Modal from '@mui/material/Modal';
import { useNavigate } from 'react-router-dom'
import { PDFDownloadLink } from '@react-pdf/renderer'
import ScreenshootContext from '../../Context/ScreenshootContext'
import GSBSimulasi from '../GSBSimulasi'

export default function HasilSimulasi({close,hasil = false }) {

  const {setResult,screenshoot} = useContext(ScreenshootContext);

  const [pilihSyarat, setPilihSyarat] = useState("")
  const [user, setUser] = useState(false)
  const [isLogin, setIsLogin] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    if(!hasil) return ()=>{}
    const url = process.env.REACT_APP_BASE_URL + "user"
    fetch(url,{method:"GET",credentials:"include"}).
    then(res=>res.json()).
    then(res=>setUser(res)).
    catch(err=>console.log(err))

  }, [])

  const listIzin = {
    "I":"Diizinkan",
    "B":"Bersyarat tertentu",
    "X":"Tidak diizinkan",
    "TB":"Terbatas dan bersyarat tertentu",
    "T":"Terbatas",
  }

  useEffect(() => {
    if(!hasil) return () => {}
    setResult(hasil)
    if(hasil.simulasi.izin !== "X") setPilihSyarat("intensitas")

    const url = process.env.REACT_APP_BASE_URL+"user/check"
    fetch(url,{
      credentials:'include'
    }).then(res=>res.json()).then(res=>{
      if(res != "unauthorized"){
        setIsLogin(true)
      }
    }).catch(err=>console.log(err))

  }, [])

  return (
    <Modal open={hasil ? true : false}>
        <div className=' absolute h-screen w-screen flex justify-center items-center'>
          <div className='hasil-simulasi'>
            <div className="hasil-simulasi-header">
                <b>Hasil Simulasi</b>
                <AiOutlineClose onClick={()=>{close(false)}} className=' w-[25px] h-[25px] bg-white p-[4px] cursor-pointer text-red-800'/>
            </div>
            {hasil && 
            <div className='w-[90vw] p-2 flex flex-col scroll scroll-m-0 overflow-y-scroll overflow-x-hidden gap-2 bg-white md:w-[60vw] md:px-[20px] md:py-[10px]' style={hasil.simulasi.izin != "Tidak diizinkan" ? {maxHeight:"70vh"} : {}}>
                <p>Pembangunan untuk kegiatan dan pada zona berikut :</p>
                <div className='perizinan'>
                  <p className='list'>Kegiatan </p>
                  <p className='list'>: {hasil.simulasi.kegiatan}</p>
                  <p className='list'>SWP </p>
                  <p className='list'>: {hasil.dataZonasi.swp}</p>
                  <p className='list'>Kawasan Khusus</p>
                  <p className='list'>: {hasil.dataZonasi.kawasan}</p>
                  <p className='list'>Zona </p>
                  <p className='list'>: {hasil.simulasi.zona}</p>
                  <p className='list'>Sub Zona</p>
                  <p className='list'>: {hasil.simulasi.subzona} ({hasil.dataZonasi.zona})</p>
                  <p className='list'>Izin </p>
                  <p className='list'>: <b>{listIzin[hasil.simulasi.izin]}</b></p>
                </div>
                {
                  listIzin[hasil.simulasi.izin] !== "Tidak diizinkan" && 
                  <div className='syarat-simulasi'>
                      <div className='hasil-simulasi-ketentuan'>
                        <div className='syarat flex items-center justify-center' style={ pilihSyarat == "intensitas" ? {color:"#0075eb",borderColor:"#0075eb"} : {}} onClick={()=>{setPilihSyarat("intensitas")}}>Intensitas</div>
                        <div className='syarat flex items-center justify-center' style={ pilihSyarat == "GSB" ? {color:"#0075eb",borderColor:"#0075eb"} : {}} onClick={()=>{setPilihSyarat("GSB")}}>GSB</div>
                        { hasil.simulasi.syarat !== "" && <div className='syarat flex items-center justify-center' style={ pilihSyarat == "syarat zonasi" ? {color:"#0075eb",borderColor:"#0075eb"} : {}} onClick={()=>{setPilihSyarat("syarat zonasi")}}>Syarat zonasi</div>} 
                        { hasil.dataZonasi.kawasan !== "Tidak Ada" && <div className='syarat flex items-center justify-center' style={ pilihSyarat == "ketentuan" ? {color:"#0075eb",borderColor:"#0075eb"} : {}} onClick={()=>{setPilihSyarat("ketentuan")}} >Ketentuan khusus</div>}
                      </div>
                      {pilihSyarat === "intensitas" && <IntensitasHasilSimulasi intensitas={hasil.intensitas}/>}
                      {pilihSyarat === "GSB" && <GSBSimulasi gsb={hasil.dataZonasi.gsb} remark={hasil.dataZonasi.remarkGsb}/>}
                      {pilihSyarat === "syarat zonasi" && <SyaratHasilSimulasi syarat={hasil.simulasi.syarat}/>} 
                      {pilihSyarat === "ketentuan" && <KetentuanHasilSimulasi ketentuan={hasil.ketentuan.gaya}/>}
                  </div>
                }

                {
                  listIzin[hasil.simulasi.izin] !== "Tidak diizinkan" && screenshoot &&
                  <div className="bg-white flex flex-col gap-2">
                    <PDFDownloadLink document={<PdfWithoutKop hasil={hasil} screenshoot={screenshoot}/>} fileName="INFORMASI KETENTUAN TATA RUANG">
                      <button  className=' bg-sky-600  border-2 w-full border-solid text-white hover:bg-sky-700 px-5 mx-4 ml-[-1px] text-center py-2  rounded-md hover:text-white cursor-pointer'>
                        Print
                      </button>
                    </PDFDownloadLink>
                    {isLogin &&  
                      <button onClick={()=>navigate("/dashboard/pdf")} className=' bg-sky-600  border-2 w-full border-solid text-white hover:bg-sky-700 px-5 mx-4 ml-[-1px] text-center py-2  rounded-md hover:text-white cursor-pointer'>
                          Print (With Kop)
                      </button>
                    }
                  </div>
                }
              </div>} 
          </div>
        </div>
        </Modal>
  )
}
