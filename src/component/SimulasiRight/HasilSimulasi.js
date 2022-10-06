import React,{useEffect,useState} from 'react'
import "./HasilSimulasi.css"
import {AiOutlineClose} from "react-icons/ai"
import PDF from '../PDF/PDFLama'
import {PDFDownloadLink} from "@react-pdf/renderer"
import configData from "../config.json"
import SyaratHasilSimulasi from './SyaratHasilSimulasi'
import KetentuanHasilSimulasi from './KetentuanHasilSimulasi'
import IntensitasHasilSimulasi from './IntensitasHasilSimulasi'

export default function HasilSimulasi({close,hasil = false }) {

  const [pilihSyarat, setPilihSyarat] = useState(false)
  const [user, setUser] = useState(false)

  useEffect(() => {
      const url = configData.SERVER_API + "user"
      fetch(url,{method:"GET",credentials:"include"}).
      then(res=>res.json()).
      then(res=>setUser(res)).
      catch(err=>console.log(err))
    }, [])

  useEffect(() => {
    if(hasil.simulasi.syarat != ""){
      setPilihSyarat("syarat zonasi")
    }else if(hasil.dataZonasi.kawasan != "Tidak Ada"){
      setPilihSyarat("ketentuan")
    }else{
      setPilihSyarat("intensitas")
    }

    if(hasil.simulasi.izin == "I"){
      hasil.simulasi.izin = "Diizinkan"
    }else if(hasil.simulasi.izin == "B"){
      hasil.simulasi.izin = "Bersyarat tertentu"
    }else if(hasil.simulasi.izin == "X"){
      hasil.simulasi.izin = "Tidak diizinkan"
    }else if(hasil.simulasi.izin == "TB"){
      hasil.simulasi.izin = "Terbatas dan bersyarat tertentu"
    }else if(hasil.simulasi.izin == "T"){
      hasil.simulasi.izin = "Terbatas"
    }
  }, [])
  
  return (
    <div className='pop-up'>
        <div className='hasil-simulasi'>
          <div className="hasil-simulasi-header">
              <b>Hasil Simulasi</b>
              <AiOutlineClose onClick={()=>{close(false)}} style={{cursor:"pointer", width:"20px",height:"20px",backgroundColor:"rgba(255,255,255,0.3)",padding:"4px",borderRadius:"100%"}}/>
          </div>
          {hasil && <div className='hasil-simulasi-izin' style={hasil.simulasi.izin != "Tidak diizinkan" ? {height:"500px"} : {}}>
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
                <p className='list'>: <b>{hasil.simulasi.izin}</b></p>
              </div>
              {hasil.simulasi.izin != "Tidak diizinkan" && 
                <div className='syarat-simulasi'>
                    <div className='hasil-simulasi-ketentuan' style={hasil.simulasi.syarat == "" || hasil.dataZonasi.kawasan == "Tidak Ada" ? {gridTemplateColumns:"50% 50%"}: {}}>
                    { hasil.simulasi.syarat != "" && <div className='syarat' style={ pilihSyarat == "syarat zonasi" ? {color:"#0075eb",borderColor:"#0075eb"} : {}} onClick={()=>{setPilihSyarat("syarat zonasi")}}>Syarat zonasi</div>} 
                    { hasil.dataZonasi.kawasan != "Tidak Ada" && <div className='syarat' style={ pilihSyarat == "ketentuan" ? {color:"#0075eb",borderColor:"#0075eb"} : {}} onClick={()=>{setPilihSyarat("ketentuan")}} >Ketentuan khusus</div>}
                    <div className='syarat' style={ pilihSyarat == "intensitas" ? {color:"#0075eb",borderColor:"#0075eb"} : {}} onClick={()=>{setPilihSyarat("intensitas")}}>Intensitas</div>
                    </div>
                    {pilihSyarat == "syarat zonasi" && <SyaratHasilSimulasi syarat={hasil.simulasi.syarat}/>} 
                    {pilihSyarat == "intensitas" && <IntensitasHasilSimulasi intensitas={hasil.intensitas}/>}
                    {pilihSyarat == "ketentuan" && <KetentuanHasilSimulasi ketentuan={hasil.ketentuan.gaya}/>}
                 
                </div>
              }
            </div>
            }
            {hasil.simulasi.izin != "Tidak diizinkan" && user &&
              <div style={{backgroundColor:"white",padding:"0px 20px 15px 20px"}}>
                <PDFDownloadLink document={<PDF hasil={hasil} user={user}/>} fileName="ADVICE PLANNING">
                  <button className='cetak-simulasi'>
                    Cetak
                  </button>
                </PDFDownloadLink>
              </div>
            }

        </div>
        <div className='black-layer' onClick={()=>{close(false)}}></div>
    </div>
  )
}
