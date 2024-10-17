import React from 'react'
import ListRoad from './ListRoad';
import InputRoad from './InputRoad';
import { useRoad } from './hooks/useRoad';

function FindRoadContainer({open}) {

    const ROAD = useRoad()

    const handleClick = (e) => {
        ROAD.setRoadSelected(e)
    }
    
    return (
        <div className={`simulasi simulasiHp flex flex-col gap-3  h-screen bg-white ${open === "Pencarian Jalan" ? "ml-[64px] md:ml-[194px] " : "ml-[-250px]"} `}>
            <InputRoad/>
            <ListRoad listRoad={ROAD.state.listRoad} onClick={handleClick}/>
        </div>
    )
}

export default FindRoadContainer
9