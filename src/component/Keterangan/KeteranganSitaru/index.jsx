import React from 'react'
import "./KeteranganSitaru.scss"
import logo from "../../../images/Logo_Kota_Yogyakarta.png";

function KeteranganSitaru() {
  return (
    <div className="display-info">
        <img src={logo}  alt='logo gatra matra jogja'/>
        <div className="flex flex-col items-center">
        <p className=" font-bold text-lg mb-2">Gatra Matra Jogja</p>
        <div style={{background:"black",width:"90%",height:"2px",marginBottom:"1rem"}}/>
        <p style={{fontWeight:"500",fontSize:"small",marginBottom:"1rem"}}>Dinas Pertanahan dan Tata Ruang <br/> Kota Yogyakarta</p>
        <p>Jln. Kenari No.56, Muja Muju, Umbulharjo, Kota Yogyakarta,
        Daerah Istimewa Yogyakarta 55165</p>
        <p>Telp. 0274515865, 0274515866</p>
        <p>No. WA Layanan Online : 0811-2735-100</p>
        <p>Email : pertanahantataruang@jogjakota.go.id</p>
        </div>
    </div>
  )
}

export default KeteranganSitaru