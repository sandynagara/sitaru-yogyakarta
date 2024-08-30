import React from 'react'
import "./Legenda.css"

const daftarLegenda = [
    {
        nama:"Badan Jalan",
        color:"#eb1e1e"
    },
    {
        nama:"Campuran Intensitas Tinggi",
        color:"#f05500"
    },
    {
        nama:"Campuran Intensitas Menengah/Sedang",
        color:"#f0731e"
    },
    {
        nama:"Perdagangan dan Jasa Skala Kota",
        color:"#ff6464"
    },
    {
        nama:"Perdagangan dan Jasa Skala WP",
        color:"#ffa5a5"
    },
    {
        nama:"Perumahan Kepadatan Tinggi",
        color:"#ffdc00"
    },
    {
        nama:"Perumahan Kepadatan Sedang",
        color:"#fff005"
    },
    {
        nama:"Perkantoran",
        color:"#9b9b9b"
    },
    {
        nama:"Pertahanan dan Keamanan",
        color:"#9b00ff"
    },
    {
        nama:"Ruang Terbuka Non Hijau",
        color:"#006969"
    },
    {
        nama:"SPU Skala Kota",
        color:"#7d197d"
    },
    {
        nama:"SPU Skala Kecamatan",
        color:"#9b329b"
    },
    {
        nama:"SPU Skala Kelurahan",
        color:"#b94bb9"
    },
    {
        nama:"Transportasi",
        color:"#d73700"
    },
    {
        nama:"Badan Air",
        color:"#97dbf2"
    },
    {
        nama:"Perlindungan Setempat",
        color:"#05d7d7"
    },
    {
        nama:"Cagar Budaya",
        color:"#ff37cd"
    },
    {
        nama:"Taman Kota",
        color:"#416900"
    },
    {
        nama:"Taman Kecamatan",
        color:"#468700"
    },
    {
        nama:"Taman Kelurahan",
        color:"#4ba500"
    },
    {
        nama:"Taman RW",
        color:"#50c300"
    },
    {
        nama:"Pemakaman",
        color:"#5aff00"
    },
    {
        nama:"Jalur Hijau",
        color:"#0ff500"
    }
]


function Legenda({open}) {
  return (
    <div className={`layer ${open === "Legenda" ? "ml-[64px] md:ml-[194px]" : "ml-[-250px]"}`}>
        <div style={{fontWeight:"700",marginBottom:"10px"}}>Legenda</div>
        {daftarLegenda.map((item,index)=>{
            return <div style={{display:"flex",alignItems:"center",marginBottom:"10px"}} key={index}>
                <div style={{background:`${item.color}`,width:"15px",height:"15px",marginRight:"10px"}}></div>
                <p>{item.nama}</p>
            </div>
        })}
    </div>
  )
}

export default Legenda

