import React, { useState } from "react";
import "./RightSidebar.css";
import * as Md from "react-icons/md";
import logo from "../images/Logo_Kota_Yogyakarta.png";
import Keterangan from "./Keterangan";
import Simulasi from "./Simulasi";

function RightSidebar() {
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
        style={Tampil ? { width: "350px" } : { width: "0px" }}
      >
        <div className="judul">
          <img src={logo} alt="" />
          Sistem Informasi Tata Ruang <br/> Kota Yogyakarta
        </div>
        <Keterangan/>
        <Simulasi/>
      </div>
    </div>
  );
}

export default RightSidebar;
