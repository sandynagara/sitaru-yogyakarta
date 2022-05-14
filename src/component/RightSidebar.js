import React, { useState } from "react";
import "./RightSidebar.css";
import * as Md from "react-icons/md";
import logo from "../images/Logo_Kota_Yogyakarta.png";
import Keterangan from "./Keterangan";

function RightSidebar({data,setOpen}) {
  const [Tampil, setTampil] = useState(true);

  return (
    <div className="right-sidebar">
      <div className="tombol-sidebar" onClick={() => setTampil(!Tampil)}>
          <Md.MdOutlineArrowForwardIos
            style={Tampil ? { width: "20px", height: "20px" ,transition:"500ms" } : {transform:"rotate(180deg)" ,transition:"500ms"} }
          />
      </div>
      <div
        className="sidebar-container"
        style={Tampil ? { width: "320px" } : { width: "0px" }}
      >
        {data && <div className="judul">
          {/* <img src={logo} alt="" /> */}
          Sistem Informasi Tata Ruang <br/> Kota Yogyakarta
        </div>} 
        {data ? <Keterangan data={data}/> : 
        <div className="display-info">
          <img src={logo}/>
          <div style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
            <p style={{fontWeight:"500",fontSize:"medium",marginBottom:"1rem"}}>Sistem Informasi Tata Ruang (SITARU)<br/>Kota Yogyakarta</p>
            <div style={{background:"black",width:"90%",height:"2px",marginBottom:"1rem"}}/>
            <p style={{fontWeight:"500",fontSize:"small",marginBottom:"1rem"}}>Dinas Pertanahan dan Tata Ruang <br/> Kota Yogyakarta</p>
            <p>l. Kenari No.56, Muja Muju, Umbulharjo, Kota Yogyakarta,
            Daerah Istimewa Yogyakarta 55165</p>
            <p>Telp. 0274515865, 0274515866</p>
            <p>Email : pertanahantataruang@jogjakota.go.id</p>
            
          </div>
        </div>}
        
        {data && <div className="pelaporan">
          <button onClick={()=>setOpen("Simulasi")}>
            Simulasi
          </button>
        </div>}
      </div>
    </div>
  );
}

export default RightSidebar;
