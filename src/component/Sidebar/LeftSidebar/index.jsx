import React from 'react'
import IconSidebar from '../IconSidebar';
import "./Sidebar.css";
import * as Ai from "react-icons/ai";
import {FaMap,FaGlobe} from "react-icons/fa"
import * as Bs from "react-icons/bs";
import { RiTestTubeFill } from "react-icons/ri";
import {Link} from "react-router-dom"
import logo from "../../../images/Logo_Kota_Yogyakarta.png";

function Sidebar({open,setOpen,width}) {

    const styleIcon = {width: "20px", height: "20px"}

    const listItmeSidebar = [
      {
        to:"/",
        title:"Home",
        icon:<Ai.AiFillHome style={styleIcon}/>,
        responsive:false
      },
      {
        to:false,
        title:"Layer",
        icon:<Bs.BsFillLayersFill style={styleIcon}/>,
        responsive:false
      },
      {
        to:false,
        title:"Legenda",
        icon:<FaMap style={styleIcon}/>,
        responsive:false
      },
      {
        to:false,
        title:"Basemap",
        icon:<FaGlobe style={styleIcon}/>,
        responsive:false
      },
      {
        to:false,
        title:"Simulasi",
        icon:<RiTestTubeFill style={styleIcon}/>,
        responsive:false
      },
      {
        to:false,
        title:"Keterangan",
        icon:<Ai.AiFillInfoCircle style={styleIcon} />,
        responsive:true
      },
    ]
  
    return (
        <div className="navbar-peta h-screen py-2 pl-2 gap-4">
          {/* <div className='flex p-2 items-center gap-4 justify-center text-white font-semibold'>
            <img src={logo} className='w-8 bg-contain'/>
          </div> */}
         
          {
            listItmeSidebar.map((item,index)=>{

              if(width && item.responsive){
                return 
              }

              return (
                <Link to={item.to} key={index}>
                  <IconSidebar
                    icon={item.icon}
                    judul={item.title}
                    open={open}
                    setOpen={setOpen}
                  />
                </Link>
              )
            })
          }
          <div style={{position: "absolute",bottom:"0"}}>
            <IconSidebar
              icon={<Ai.AiOutlineQuestion style={styleIcon} /> }
              judul="Panduan"
              open={open}
              setOpen={setOpen}
            />
          </div>
        </div>
      );
}

export default Sidebar