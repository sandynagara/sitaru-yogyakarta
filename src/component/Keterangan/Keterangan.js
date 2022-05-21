import React,{useState} from "react";
import "./Keterangan.css";
import ListKeterangan from "./ListKeterangan";

function Keterangan({data}) {

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
