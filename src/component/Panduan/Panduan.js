import React,{useState} from 'react'
import ButtonHeaderPanduan from './ButtonHeaderPanduan'
import "./Panduan.css"
import PanduanBasemap from './PanduanBasemap'
import PanduanKeterangan from './PanduanKeterangan'
import PanduanLayer from './PanduanLayer'
import PanduanLogin from './PanduanLogin'
import PanduanSimulasi from './PanduanSimulasi'
import {AiOutlineClose} from "react-icons/ai"

function Panduan({setOpen}) {

  const [pilih, setPilih] = useState("Keterangan")

  return (
    <div className='pop-up'>
        <div style={{
          backgroundColor:"white",
          zIndex:99,
          width:"700px",
 
        }}>
          <div style={{
            backgroundColor:"#0075eb",
            width:"100%",
   
            display:"flex",
            alignItems:"center",
            padding:"15px 0px"
          }}>
            <div style={{
              marginLeft:"20px",
              marginRight:"20px",
              fontWeight:"500",
              color:"white",
              fontSize:"18px",
              display:"flex",
              width:"100%",
              justifyContent:"space-between",
            }}>
              Panduan
              <AiOutlineClose onClick={()=>{setOpen(false)}} style={{cursor:"pointer", width:"25px",height:"25px",backgroundColor:"rgba(255,255,255,0.3)",padding:"4px",borderRadius:"100%"}}/>
            </div>
          </div>
          <div style={{

          }}>
            <div style={{
              display:"flex",
              flexDirection:"row",
              width:"100%"
            }}>
              <ButtonHeaderPanduan judul="Keterangan" pilih={pilih} setPilih={setPilih}/>
              {/* <ButtonHeaderPanduan judul="Login" pilih={pilih} setPilih={setPilih}/> */}
              <ButtonHeaderPanduan judul="Simulasi" pilih={pilih} setPilih={setPilih}/>
              <ButtonHeaderPanduan judul="Layer" pilih={pilih} setPilih={setPilih}/>
              <ButtonHeaderPanduan judul="Basemap" pilih={pilih} setPilih={setPilih}/>
            </div>
              {pilih === "Keterangan" && <PanduanKeterangan/>}
              {/* {pilih === "Login" && <PanduanLogin/>} */}
              {pilih === "Simulasi" && <PanduanSimulasi/>}
              {pilih === "Layer" && <PanduanLayer/>}
              {pilih === "Basemap" && <PanduanBasemap/>}
          </div>
        </div>
        <div className='black-layer' onClick={()=>setOpen(false)}></div>
    </div>
  )
}

export default Panduan