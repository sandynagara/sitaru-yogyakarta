import React,{useState} from "react";
import {IoMdArrowDropdown} from 'react-icons/io'
import "./Keterangan.css";

function Keterangan() {

  const [active, setActive] = useState(false)

  return (
    <div id="keterangan">
      <div className="dropdown" onClick={()=>setActive(!active)}>
        <p>Keterangan Bidang Tanah</p>
        <IoMdArrowDropdown style={active ? {marginRight:"20px",width:"22px",height:"22px"} : {marginRight:"20px",width:"22px",height:"22px" ,transform:"rotate(90deg)"}}/>
      </div>
      {active ? <div className="list">   
        <div className="kode">
            <p>Kode Zona : </p>
            <p className="isi">LU</p>
          </div>
          <div className="kode">
            <p>Zona RDTR : </p>
            <p className="isi">Cagar Budaya</p>
          </div>
          <div className="kode">
            <p>Sub-Zona RDTR : </p>
            <p className="isi">Cagar Budaya</p>
          </div>
          <div className="kode">
            <p>Status Kawasan : </p>
            <p className="isi">Kawasan Lindung</p>
          </div>
          <div className="kode">
            <p>Jenis Hak : </p>
            <p className="isi">Sultan Ground</p>
          </div>
          <div className="kode">
            <p>Luas Bidang : </p>
            <p className="isi">8579 m2</p>
          </div>
      </div> : ""}
      
    </div>
  );
}

export default Keterangan;
