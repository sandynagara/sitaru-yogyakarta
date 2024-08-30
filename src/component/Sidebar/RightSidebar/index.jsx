import React, { useState } from "react";
import "./RightSidebar.css";
import * as Md from "react-icons/md";
import Keterangan from "../../Keterangan/ListKeteranganBidang";
import KeteranganSitaru from "../../Keterangan/KeteranganSitaru";

function RightSidebar({data,setOpen}) {
  const [Tampil, setTampil] = useState(true);

  return (
    <div className="right-sidebar">
      <div className="tombol-sidebar" onClick={() => setTampil(!Tampil)}>
          <Md.MdOutlineArrowForwardIos
            style={Tampil ? { width: "20px", height: "20px" ,transition:"500ms" } : {transform:"rotate(180deg)" ,transition:"500ms"} }
          />
      </div>
      <div
        className="sidebar-container"
        style={Tampil ? { width: "320px" } : { width: "0px" }}
      >
        
        {data ? <Keterangan data={data}/> : <KeteranganSitaru/>}
        
        {/* {data && 
        <div className="absolute w-full p-2 bottom-0">
          <div className="bg-sky-600  bottom-0 hover:bg-sky-700 text-sm text-center py-2 rounded-md text-white cursor-pointer"
            onClick={()=>setOpen("Simulasi")}
          >
            <button >
              Simulasi
            </button>
          </div>
        </div>
       
        } */}
      </div>
    </div>
  );
}

export default RightSidebar;
