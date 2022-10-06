import React from 'react'
import ItemMenu from '../component/LandingPage/ItemMenu'
import {FaRegMap} from "react-icons/fa"
import {AiOutlineQuestion} from "react-icons/ai"
import logoYogya from "../images/Logo_Kota_Yogyakarta.png";
import { Link } from 'react-router-dom';

function LandingPage() {
  return (
    <div style={{width:"100vw",height:"100vh",display:"flex",justifyContent:"center"}}>
        <div style={{
          backgroundColor:"rgba(0,0,0,0.5)",
          width:"100vw",
          height:"100vh",
          position:"absolute",
          display:"flex",
          flexDirection:"column",
          justifyContent:"center",
          alignItems:"center"
        }}>
          <div style={{
            backgroundColor:"white",
            padding:"15px",
            borderRadius:"12px",
            display:"flex"
          }}>
            <div>
              <img src={logoYogya} style={{width:"75px",height:"100px"}}/>
            </div>
            <div style={{marginLeft:"20px",fontSize:"14px",display:"flex",flexDirection:"column",justifyContent:"space-evenly"}}>
              <div style={{fontWeight:"700"}}>
                DINAS PERTANAHAN DAN TATA RUANG
              </div>
              <div>
                Kundha Niti Mandala sarta Tata Sasana
              </div>
              <div>
                Kota Yogyakarta
              </div>
            </div>
            
          </div>
          <div>
            
          </div>
          <div
            style={{
              marginTop:"3rem",
              width:"100%",
              display:"flex",
              flexWrap:"wrap",
              justifyContent:"space-evenly",
              alignItems:"center",
              
            }}
          >
            <Link to="/dashboard">
              <ItemMenu icon={ <FaRegMap color='white' size={25}/>} judul="Sitaru" color="rgb(66, 129, 245)"/>
            </Link>
            <ItemMenu icon={ <AiOutlineQuestion color='white' size={25}/>} judul="Siperta"/>
            <ItemMenu icon={ <AiOutlineQuestion color='white' size={25}/>} judul="Sipancang"/>
            <ItemMenu icon={ <AiOutlineQuestion color='white' size={25}/>} judul="Silapor"/>
            <ItemMenu icon={ <AiOutlineQuestion color='white' size={25}/>} judul="Satu Data"/>
          </div>
          <div
            style={{
              width:"100%",
              marginTop:"50px",
              display:"flex",
              flexWrap:"wrap",
              justifyContent:"space-evenly",
              alignItems:"center"
            }}
          >

          <ItemMenu icon={ <AiOutlineQuestion color='white' size={25}/>} judul="Joint Studio"/>
          <ItemMenu icon={ <AiOutlineQuestion color='white' size={25}/>} judul="Regulasi"/>
          <ItemMenu icon={ <AiOutlineQuestion color='white' size={25}/>} judul="Layanan"/>
          <ItemMenu icon={ <AiOutlineQuestion color='white' size={25}/>} judul="IKM dan Aduan"/>
          <ItemMenu icon={ <AiOutlineQuestion color='white' size={25}/>} judul="Panduan"/>
          </div>
          
        
        </div>
        <img 
          src='https://koperasi.jogjakota.go.id/resources/img/gallery/20171004141304.jpg' 
          style={{width:"100vw",backgroundSize:"cover"}}
        />
    </div>
  )
}

export default LandingPage