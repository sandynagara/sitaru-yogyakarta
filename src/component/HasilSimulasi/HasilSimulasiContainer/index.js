import React,{useEffect,useState} from 'react'
import "./HasilSimulasi.scss"
import {AiOutlineClose} from "react-icons/ai"
import {PDFDownloadLink} from "@react-pdf/renderer"
import configData from "../../config.json"
import SyaratHasilSimulasi from '../SyaratSimulasi'
import KetentuanHasilSimulasi from '../KetentuanSimulasi'
import IntensitasHasilSimulasi from '../IntensitasSimulasi'
import PDFBaru from '../../PDF/PDFBaru'
import Modal from '@mui/material/Modal';

export default function HasilSimulasi({close,hasil = false,openModal }) {

  const [pilihSyarat, setPilihSyarat] = useState("")
  const [user, setUser] = useState(false)

  useEffect(() => {
      if(!hasil) return
      const url = configData.SERVER_API + "user"
      fetch(url,{method:"GET",credentials:"include"}).
      then(res=>res.json()).
      then(res=>setUser(res)).
      catch(err=>console.log(err))
    }, [])

  useEffect(() => {
    if(!hasil) return
    if(hasil.simulasi.izin === "I"){
      hasil.simulasi.izin = "Diizinkan"
    }else if(hasil.simulasi.izin === "B"){
      hasil.simulasi.izin = "Bersyarat tertentu"
    }else if(hasil.simulasi.izin === "X"){
      hasil.simulasi.izin = "Tidak diizinkan"
    }else if(hasil.simulasi.izin === "TB"){
      hasil.simulasi.izin = "Terbatas dan bersyarat tertentu"
    }else if(hasil.simulasi.izin === "T"){
      hasil.simulasi.izin = "Terbatas"
    }

    if(hasil.simulasi.izin !== "X"){
      setPilihSyarat("intensitas")
    }
  }, [])
  
  return (
    <Modal open={hasil}>
        <div className=' absolute h-screen w-screen flex justify-center items-center'>
        <div className='hasil-simulasi'>
          <div className="hasil-simulasi-header">
              <b>Hasil Simulasi</b>
              <AiOutlineClose onClick={()=>{close(false)}} style={{cursor:"pointer", width:"25px",height:"25px",backgroundColor:"rgba(255,255,255,0.3)",padding:"4px",borderRadius:"100%"}}/>
          </div>
          {hasil && 
          <div className='w-[90vw] p-2 scroll scroll-m-0 overflow-y-scroll overflow-x-hidden bg-white md:w-[40vw] md:px-[20px] md:py-[10px]' style={hasil.simulasi.izin != "Tidak diizinkan" ? {maxHeight:"70vh"} : {}}>
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
                <p className='list'>Sub Zona </p>
                <p className='list'>: {hasil.simulasi.subzona} ({hasil.dataZonasi.zona})</p>
                <p className='list'>Izin </p>
                <p className='list'>: <b>{hasil.simulasi?.izin}</b></p>
                {/* {hasil.simulasi.izin !== "Tidak diizinkan" && user && 
                  <>
                    <p className='list flex items-center'>Cetak Dokumen</p>
                    <p className='list flex items-center'>: 
                      <div className="bg-white mt-2">
                        <PDFDownloadLink document={<PDFBaru hasil={hasil} user={user}/>} fileName="INFORMASI KETENTUAN TATA RUANG">
                          <button className='bg-white border-sky-500 border-2 border-solid w-full text-sky-500 hover:bg-sky-500 px-5 ml-1 text-center text-sm rounded-sm hover:text-white cursor-pointer'>
                            Download
                          </button>
                        </PDFDownloadLink>
                      </div>
                    </p>
                  </>
                 
                } */}
              </div>
              {hasil.simulasi.izin && hasil.simulasi?.izin !== "Tidak diizinkan" && 
                <div className='syarat-simulasi'>
                    <div className='hasil-simulasi-ketentuan'>
                      <div className='syarat' style={ pilihSyarat == "intensitas" ? {color:"#0075eb",borderColor:"#0075eb"} : {}} onClick={()=>{setPilihSyarat("intensitas")}}>Intensitas</div>
                      { hasil.simulasi.syarat !== "" && <div className='syarat' style={ pilihSyarat == "syarat zonasi" ? {color:"#0075eb",borderColor:"#0075eb"} : {}} onClick={()=>{setPilihSyarat("syarat zonasi")}}>Syarat zonasi</div>} 
                      { hasil.dataZonasi.kawasan !== "Tidak Ada" && <div className='syarat' style={ pilihSyarat == "ketentuan" ? {color:"#0075eb",borderColor:"#0075eb"} : {}} onClick={()=>{setPilihSyarat("ketentuan")}} >Ketentuan khusus</div>}
                    </div>
                    {pilihSyarat === "intensitas" && <IntensitasHasilSimulasi intensitas={hasil.intensitas}/>}
                    {pilihSyarat === "syarat zonasi" && <SyaratHasilSimulasi syarat={hasil.simulasi.syarat}/>} 
                    {pilihSyarat === "ketentuan" && <KetentuanHasilSimulasi ketentuan={hasil.ketentuan.gaya}/>}
                </div>
              }
              {
                hasil.simulasi.izin !== "Tidak diizinkan" && user &&
                <div className="bg-white mt-2">
                  <PDFDownloadLink document={<PDFBaru hasil={hasil} user={user}/>} fileName="INFORMASI KETENTUAN TATA RUANG">
                    <button className='bg-white border-sky-500 border-2 w-full border-solid text-sky-500 hover:bg-sky-500 px-5 mx-4 ml-[-1px] text-center py-1  rounded-sm hover:text-white cursor-pointer'>
                      Cetak
                    </button>
                  </PDFDownloadLink>
                </div>
              }
            </div>} 
            

        </div>
        </div>
        </Modal>
  )
}
