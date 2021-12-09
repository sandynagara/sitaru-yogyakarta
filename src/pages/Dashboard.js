import Peta from "../component/Peta";
import React, { useState } from 'react'
import Sidebar from "../component/Sidebar";
import RightSidebar from "../component/RightSidebar";
import Basemap from "../component/Basemap";

function Dashboard() {

    const [basemap,setBasemap] = useState("https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}")

    const [open,setOpen] = useState(false)

    return (
        <div >
            <Sidebar open={open} setOpen={setOpen}/>
            <Basemap open={open} setInputBasemap={(e) => setBasemap(e)} inputBasemap={basemap}/>
            <RightSidebar/>
            <Peta inputBasemap={basemap}/>
        </div>
    )
}

export default Dashboard
