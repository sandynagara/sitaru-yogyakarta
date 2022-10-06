import React,{useState} from 'react'
import configData from "../config.json"

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
            if(res !== "unauthorized"){
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

export default Icon