import React,{useEffect} from 'react'
import { useRoad } from "./hooks/useRoad";
import { GeoJSON, useMap} from "react-leaflet";

function RoadMap() {

    const ROAD = useRoad()
    const map = useMap()

    useEffect(() => {
        if(!ROAD.state.selectedRoad?.geometry) return ()=>{}
        const bounds = L.geoJSON(ROAD.state.selectedRoad).getBounds();
        map.fitBounds(bounds)        
    }, [ROAD.state.selectedRoad])
    

  return <GeoJSON key={ROAD.state.selectedRoad ? ROAD.state.selectedRoad.properties.NAMRJL : null} data={ROAD.state.selectedRoad ?? null} style={{color:"yellow",weight:10}} />
}

export default RoadMap