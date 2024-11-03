import React from 'react'
import './Layer.css'
import listLayer from "./listLayer"
import ItemLayer from './ItemLayer'
import { useLayer } from './hooks/useLayer'
function LayerContainer({open}) {
    const LAYER = useLayer()

    const handleChangeOpacity = (name,valueOpacity) => {
        if(name === "Basemap"){
            LAYER.setOpacityBasemap(valueOpacity)
        }else if(name === "Bidang Tanah"){
            LAYER.setOpacityBidangTanah(valueOpacity)
        }else if(name === "RDTR"){
            LAYER.setOpacityRdtr(valueOpacity)
        }else if(name === "Foto Udara"){
            LAYER.setOpacityFotoUdara(valueOpacity)
        }
    }
 
    return (
        <div className={`layer3 ${open === "Layer" ? "ml-[64px] md:ml-[194px]" : "ml-[-250px]"}`}>
            {listLayer.map(({name})=>{
                return <ItemLayer name={name} key={name} onChangeValue={handleChangeOpacity}/>
            })}
        </div>
    )
}

export default LayerContainer
