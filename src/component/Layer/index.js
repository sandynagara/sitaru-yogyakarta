import React from 'react'
import './Layer.css'

function Layer({open,setOpacityBasemap,setOpacityPersil,setOpacityRdtr}) {
    return (
        <div className={`layer3 ${open === "Layer" ? "ml-[64px] md:ml-[194px]" : "ml-[-250px]"}`}>
            <div className='layer-item'>
                <p style={{marginBottom:"10px"}}>Basemap</p>
                <input type="range" onChange={(e)=>setOpacityBasemap(e.target.value)}/>
            </div>
            <div className='layer-item'>
                <p style={{marginBottom:"10px"}}>Bidang Tanah</p>
                <input type="range" onChange={(e)=>setOpacityPersil(e.target.value)}/>
            </div>
            <div className='layer-item'>
                <p style={{marginBottom:"10px"}}>RDTR</p>
                <input type="range" onChange={(e)=>setOpacityRdtr(e.target.value)}/>
            </div>
        </div>
    )
}

export default Layer
