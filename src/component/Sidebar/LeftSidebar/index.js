import React from 'react'
import Icon from '../IconSidebar';
import "./Sidebar.css";
import * as Ai from "react-icons/ai";
import {FaMap,FaGlobe} from "react-icons/fa"
import * as Bs from "react-icons/bs";
import { RiTestTubeFill } from "react-icons/ri";
import {Link} from "react-router-dom"

function Sidebar({open,setOpen}) {
  
    return (
        <div className="navbar-peta h-screen">
    
          <Link to="/">
            <Icon
              icon={<Ai.AiFillHome style={{ width: "20px", height: "20px" }} /> }
              judul="Home"
              open={open}
              setOpen={setOpen}
            />
          </Link>
          
          <Icon
            icon={<Bs.BsFillLayersFill style={{ width: "20px", height: "20px" }} /> }
            judul="Layer"
            open={open}
            setOpen={setOpen}
          />
    
          <Icon
            icon={<FaMap style={{ width: "20px", height: "20px" }} /> }
            judul="Legenda"
            open={open}
            setOpen={setOpen}
          />
    
          <Icon
            icon={<FaGlobe style={{ width: "20px", height: "20px" }} /> }
            judul="Basemap"
            open={open}
            setOpen={setOpen}
          />  
    
     
          <Icon
            icon={<RiTestTubeFill style={{ width: "20px", height: "20px" }} /> }
            judul="Simulasi"
            open={open}
            setOpen={setOpen}
          />  
          
          {/*    
          <Icon
            icon={<MdReportGmailerrorred style={{ width: "20px", height: "20px" }} /> }
            judul="Lapor"
            open={open}
            setOpen={setOpen}
          />  
          */}
    
            <div style={{position: "absolute",bottom:"0"}}>
              <Icon
                icon={<Ai.AiOutlineQuestion style={{ width: "20px", height: "20px" }} /> }
                judul="Panduan"
                open={open}
                setOpen={setOpen}
              />
              {/* <Icon
                icon={<Ai.AiOutlineUser style={{ width: "20px", height: "20px" }} /> }
                judul="Login"
                open={open}
                setOpen={setOpen}
              /> */}
            </div>
        </div>
      );
}

export default Sidebar