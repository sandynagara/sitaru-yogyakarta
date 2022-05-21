import React from 'react'
import Icon from './Icon';
import "./Sidebar.css";
import * as Ai from "react-icons/ai";
import {FaRegMap} from "react-icons/fa"
import * as Bs from "react-icons/bs";
import { BiTestTube } from "react-icons/bi";
import {MdReportGmailerrorred} from "react-icons/md"
import {Link} from "react-router-dom"

function Sidebar({open,setOpen}) {
  
    return (
        <div className="navbar-peta">
    
          <Link to="/">
            <Icon
              icon={<Ai.AiOutlineHome style={{ width: "20px", height: "20px" }} /> }
              judul="Home"
              open={open}
              setOpen={setOpen}
            />
          </Link>
          
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

export default Sidebar