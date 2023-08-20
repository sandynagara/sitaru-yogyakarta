import React from "react";
import "./ListKeteranganBidang.scss";
import KeteranganItem from "../KeteranganItemBidang";

function ListKeteranganBidang({data}) {

  return (
    <div id="keterangan"> 
      <div className="p-2 font-bold">
          Keterangan Bidang
          
      </div>
      <div className="list">
        <KeteranganItem judul="Kelurahan" isi={data["wadmkd"]}/>
        <KeteranganItem judul="Kemantren" isi={data["wadmkc"].replace("Kecamatan","Kemantren")}/>
        <KeteranganItem judul="Zona" isi={data["namobj"]}/>
        <KeteranganItem judul="Kawasan" isi={data["cagbud"]}/>
        <KeteranganItem judul="SWP" isi={data["kodswp"]}/>
        <KeteranganItem judul="Kode Zona" isi={data["nilai_kolo"].split("_")[1].split("-")[0]}/>
        <KeteranganItem judul="Kode sub Zona" isi={data["nilai_kolo"].split("_")[1]}/>
      </div> 
      
    </div>
  );
}

export default ListKeteranganBidang;
