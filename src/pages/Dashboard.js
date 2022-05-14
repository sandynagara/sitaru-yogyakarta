import Peta from "../component/Peta";
import React, { useState,useEffect } from 'react'
import Sidebar from "../component/Sidebar";
import RightSidebar from "../component/RightSidebar";
import Basemap from "../component/Basemap";
import Layer from "../component/Layer";
import SimulasiHp from "../component/SimulasiHp";
import LoginRegisterForm from "../component/LoginRegisterForm";
import Pelaporan from "../component/Pelaporan";
import Profile from "../component/Profile";
import configData from "../component/config.json"
import Panduan from "../component/Panduan";
import Legenda from "../component/Legenda";

function Dashboard() {

    const [basemap,setBasemap] = useState("https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}")
    const [opacityBasemap, setOpacityBasemap] = useState(100)
    const [opacityPersil, setOpacityPersil] = useState(50)
    const [opacityRdtr, setOpacityRdtr] = useState(80)
    const [open,setOpen] = useState(false)
    const [width, setWidth] = useState(false)
    const [data, setData] = useState(false)
    const [user, setUser] = useState(false)

    window.addEventListener('resize', handleScroll, { passive: true });

    const handleScroll = () => {
      const position = document.documentElement.clientWidth;
      if(position<400){
        setWidth(false);
      }else{
        setWidth(true);
      }
    };

    useEffect(() => {
      const url = configData.SERVER_API + "user"
      fetch(url,{
        method:"GET",
        credentials:"include"
      })
      .then(res=>res.json())
      .then(res=>{
        console.log(res)
        setUser(res)
      }).catch(err=>console.log(err))
    }, [])


    useEffect(() => {
    const position = document.documentElement.clientWidth;
    if(position<400){
        setWidth(false);
    }else{
        setWidth(true);
    }
    }, [])

    return (
        <div >
            <Sidebar open={open}  setOpen={setOpen} width={width}/>
            <Basemap open={open} setInputBasemap={(e) => setBasemap(e)} inputBasemap={basemap}/>
            <Layer open={open} setOpacityBasemap={(e)=>setOpacityBasemap(e)} setOpacityPersil={(e)=>setOpacityPersil(e)} setOpacityRdtr={(e)=>setOpacityRdtr(e)}/>
            <Legenda open={open}/>
            { width && <RightSidebar data={data} setOpen={setOpen}/> }
            <SimulasiHp open={open} data={data}/>
            <Peta inputBasemap={basemap} opacityBasemap={opacityBasemap} opacityPersil={opacityPersil} opacityRdtr={opacityRdtr} setData={setData}/>
            {open === "Login" && <LoginRegisterForm setOpen={setOpen}/>}
            {open === "Panduan" && <Panduan setOpen={setOpen}/>}
            {open === "Lapor" && <Pelaporan setOpen={setOpen} data={data} />} 
            {open === "Profile" && <Profile setOpen={setOpen} user={user} setUser={setUser} />} 
        </div>
    )
}

export default Dashboard
