import React,{useState} from "react";
import {IoMdArrowDropdown} from 'react-icons/io'
import "./Keterangan.css";

function ListKeterangan({judul,isi}){
  return <div className="kode">
  <p><b>{judul}</b></p>
  <p className="isi">{isi}</p>
</div>
}

function Keterangan({data}) {

  const [active, setActive] = useState(false)
  
  console.log(data)

  return (
    <div id="keterangan"> 
      <div className="list">
        <ListKeterangan judul="Kelurahan" isi={data["WADMKD"]}/>
        <ListKeterangan judul="Kecamatan" isi={data["WADMKC"]}/>
        <ListKeterangan judul="Zona" isi={data["NAMOBJ"]}/>
        <ListKeterangan judul="Kawasan" isi={data["CAGBUD"]}/>
        <ListKeterangan judul="SWP" isi={data["KODSWP"]}/>
        <ListKeterangan judul="Kode Zona" isi={data["nilai_kolo"].split("_")[1].split("-")[0]}/>
        <ListKeterangan judul="Kode sub Zona" isi={data["nilai_kolo"].split("_")[1]}/>
      </div> 
      
    </div>
  );
}

export default Keterangan;
