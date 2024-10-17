import Peta from "../component/Peta";
import React, { useState,useEffect } from 'react'
import RightSidebar from "../component/Sidebar/RightSidebar";
import Basemap from "../component/Basemap/ListBasemap";
import Layer from "../component/Layer";
import Pelaporan from "../component/Pelaporan";
import Profile from "../component/Profile";

import Legenda from "../component/Legenda";
import FindRoadContainer from "../component/FindRoad/FindRoadContainer";
import LoginRegisterForm from "../component/LoginRegister/LoginRegisterForm";
import Sidebar from "../component/Sidebar/LeftSidebar";
import Simulasi from "../component/Simulasi/SimulasiHp";
import Panduan from "../component/Panduan/Panduan";
import ToolAddressContainer from "../component/ToolAddress/ToolAddressContainer";
import KeteranganContainerLeft from "../component/Keterangan/KeteranganContainerLeft";
import ModalDisclaimer from "../component/ModalDisclaimer";

function Dashboard() {

    const [basemap,setBasemap] = useState("https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}")
    const [opacityBasemap, setOpacityBasemap] = useState(100)
    const [opacityPersil, setOpacityPersil] = useState(50)
    const [opacityRdtr, setOpacityRdtr] = useState(80)
    const [open,setOpen] = useState(false)
    const [width, setWidth] = useState(false)
    const [data, setData] = useState(false)
    const [user, setUser] = useState(false)
    const [center, setCenter] = useState(false)
    const [centerMarker, setCenterMarker] = useState(false);

    const handleScroll = () => {
      const position = document.documentElement.clientWidth;
      if(position<400){
        setWidth(false);
      }else{
        setWidth(true);
      }
    };

    window.addEventListener('resize', handleScroll, { passive: true });

    useEffect(() => {
      const url = process.env.REACT_APP_BASE_URL + "user"
      fetch(url,{
        method:"GET",
        credentials:"include"
      })
      .then(res=>res.json())
      .then(res=>{
        setUser(res)
      }).catch(err=>console.log(err))
    }, [])


    useEffect(() => {
      const position = document.documentElement.clientWidth;
      if(position<640){
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
          <KeteranganContainerLeft data={data} open={open}/>
          { width && <RightSidebar data={data} setOpen={setOpen}/> }
          <Simulasi open={open} data={data}/>
          <FindRoadContainer open={open}/>
          <Peta center={center} setCenter={setCenter} inputBasemap={basemap} opacityBasemap={opacityBasemap} opacityPersil={opacityPersil} opacityRdtr={opacityRdtr} setData={setData} centerMarker={centerMarker} setCenterMarker={setCenterMarker}/>
          <ToolAddressContainer setCenter={setCenter} open={open} setCenterMarker={setCenterMarker}/>
          {open == "Login" && <LoginRegisterForm setOpen={setOpen}/>}
          {open == "Panduan" && <Panduan open={open} setOpen={setOpen}/>}
          {open == "Lapor" && <Pelaporan setOpen={setOpen} data={data} />} 
          {open == "Profile" && <Profile setOpen={setOpen} user={user} setUser={setUser} />} 
          <ModalDisclaimer/>
      </div>
    )
}

export default Dashboard
