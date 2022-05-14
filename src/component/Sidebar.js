import React,{useState} from "react";
import "./Sidebar.css";
import * as Ai from "react-icons/ai";
import {FaRegMap} from "react-icons/fa"
import * as Bs from "react-icons/bs";
import { BiTestTube } from "react-icons/bi";
import {MdReportGmailerrorred} from "react-icons/md"
import configData from "./config.json"

function Icon({ icon ,judul ,open, setOpen}) {
    const [hover ,setHover] = useState(false)

    const changeOpenSidebar = () => {
        var style
        if (open === judul) {
            style = {borderRadius : "5px 0px 0px 5px" ,padding:"10px 12px 10px 10px" ,backgroundColor:"white",color:"#1976D2"}
        }
        return style
    }

    const gantiTombol = () =>{
      if(open === judul){
        setOpen(false)
      }else{
        if(judul==="Login"){
          const url = configData.SERVER_API + "check"
          fetch(url,{
            method:"GET",
            credentials:"include"
          })
          .then(res=>res.json())
          .then(res=>{
            if(res != "unauthorized"){
              console.log(res,"res")
              setOpen("Profile")
            }else{
              setOpen("Login")
            }
          })
        }else{
          setOpen(judul)
        }
      }
    }

  return (
    <div style={{display:"flex" ,alignItems:"center"}}>
      <div className={"menu-logo"} style={changeOpenSidebar()} onMouseEnter={() => {setHover(true)}} onMouseLeave={()=>{setHover(false)}} onClick={gantiTombol}>{icon}</div>
      {hover && <div className="menu-name">{judul}</div> }
    </div>
  );
}

function NavPeta({open,setOpen,width }) {

  return (
    <div className="navbar-peta">
      <Icon
        icon={<Bs.BsLayers style={{ width: "20px", height: "20px" }} /> }
        judul="Layer"
        open={open}
        setOpen={setOpen}
      />

      <Icon
        icon={<FaRegMap style={{ width: "20px", height: "20px" }} /> }
        judul="Legenda"
        open={open}
        setOpen={setOpen}
      />

      <Icon
        icon={<Bs.BsGlobe2 style={{ width: "20px", height: "20px" }} /> }
        judul="Basemap"
        open={open}
        setOpen={setOpen}
      />  

 
      <Icon
      icon={<BiTestTube style={{ width: "20px", height: "20px" }} /> }
      judul="Simulasi"
      open={open}
      setOpen={setOpen}
      />  

      <Icon
        icon={<MdReportGmailerrorred style={{ width: "20px", height: "20px" }} /> }
        judul="Lapor"
        open={open}
        setOpen={setOpen}
      /> 

        <div style={{position: "absolute",bottom:"0"}}>
          <Icon
            icon={<Ai.AiOutlineQuestion style={{ width: "20px", height: "20px" }} /> }
            judul="Panduan"
            open={open}
            setOpen={setOpen}
          />
          <Icon
            icon={<Ai.AiOutlineUser style={{ width: "20px", height: "20px" }} /> }
            judul="Login"
            open={open}
            setOpen={setOpen}
          />
        </div>
    </div>
  );
}

export default NavPeta;
