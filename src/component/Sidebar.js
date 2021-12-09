import React,{useState} from "react";
import "./Sidebar.css";
import * as Ai from "react-icons/ai";
import {FaRegMap} from "react-icons/fa"
import * as Bs from "react-icons/bs";

function Icon({ icon ,judul ,open, setOpen}) {
    const [hover ,setHover] = useState(false)

    const changeOpenSidebar = () => {
        var style
        if (open === judul) {
            style = {borderRadius : "5px 0px 0px 5px" ,padding:"10px 12px 10px 10px" ,backgroundColor:"white",color:"#673AB7"}
        }
        return style
    }

  return (
    <div style={{display:"flex" ,alignItems:"center"}}>
      <div className={"menu-logo"} style={changeOpenSidebar()} onMouseEnter={() => {setHover(true)}} onMouseLeave={()=>{setHover(false)}} onClick={(e)=> {open === judul ?  setOpen(false) : setOpen(judul)}}>{icon}</div>
      {hover ?  <div className="menu-name">{judul}</div> : ""}
    </div>
  );
}

function NavPeta({open,setOpen }) {

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
        icon={<Ai.AiOutlineUser style={{ width: "20px", height: "20px" }} /> }
        judul="Admin"
        open={open}
        setOpen={setOpen}
      />
    </div>
  );
}

export default NavPeta;
