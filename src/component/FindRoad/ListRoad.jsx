import React from 'react'
import RoadItem from './RoadItem'
import RoadNotFound from './RoadNotFound'

function ListRoad({listRoad,onClick}) {
    return (
        <div className='flex flex-col gap-2'>
            {listRoad?.list?.map((value,index)=>{
                return <RoadItem onClick={() => onClick && onClick(value)} name={value.properties.NAMRJL} key={index}/>
            }) 
        }
        </div>
    )
}

export default ListRoad
9