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
      </div>
    </div>
  );
}

export default RightSidebar;
