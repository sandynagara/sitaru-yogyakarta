import React,{useState} from 'react'
import CoordinateAddress from '../CoordinateAddress'
import ListTool from '../ListTool'
import SearchAddress from '../SearchAddress'

function ToolAddressContainer({setCenter,open}) {

    const [on, setOn] = useState(false)
    const [listAddress, setListAddress] = useState(false)

  return (
    <div className='ml-[60px] mt-2 flex gap-x-1 z-[997] fixed top-0 duration-500'
        style={open && open !== "Panduan" ? {marginLeft:"310px"}: {marginLeft:"60px"}}
    >
        <ListTool on={on} setOn={setOn} setListAddress={setListAddress}/>
        {on == "geocoding" &&  <SearchAddress setCenter={setCenter} listAddress={listAddress} setListAddress={setListAddress}/>}
        {on == "koordinat" && <CoordinateAddress setCenter={setCenter}/>}
        
    </div>
  )
}

export default ToolAddressContainer