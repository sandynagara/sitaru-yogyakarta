import React from 'react'
import basemap from "../../images/Panduan/Basemap/basemap.png"

function PanduanBasemap() {
  return (
    <div style={{
        padding:"20px 20px",
        lineHeight:"26px",
        textAlign:"justify",
        maxHeight:"500px",
        overflowY:"scroll",
        display:"flex",
        flexDirection:"column",
        alignItems:'center'
        }}
    >
        Menu Basemap merupakan menu yang digunakan untuk menampilkan dan/atau mengubah tampilan dari peta dasar yang digunakan pada peta digital yang terdapat pada website SIGDesa Karangsari. Basemap yang tersedia pada WebGIS tersebut, antara lain Google Satelite, Google Streets, ESRI WorldStreetMap, OpenStreetMap, CartoDB, OpenTopoMap, Stadia, ESRI WorldImagery, dan ESRI WorldTopoMap. Berikut tampilan menu basemap.
        <img src={basemap}  alt='gambar basemap'/>
    </div>
  )
}

export default PanduanBasemap