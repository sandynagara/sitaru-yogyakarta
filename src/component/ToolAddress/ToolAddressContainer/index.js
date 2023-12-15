import React,{useState} from 'react'
import CoordinateAddress from '../CoordinateAddress'
import ListTool from '../ListTool'
import SearchAddress from '../SearchAddress'

function ToolAddressContainer({setCenter,open,setCenterMarker}) {

    const [on, setOn] = useState(false)
    const [listAddress, setListAddress] = useState(false)

  return (
    <div className={`ml-[60px] mt-2 flex gap-x-1 z-[997] fixed top-0 duration-500 ${open && open !== "Panduan" ? "ml-[325px] md:ml-[460px]" : "ml-[70px] md:ml-[210px]"} `}
    >
        <ListTool on={on} setOn={setOn} setListAddress={setListAddress} setCenterMarker={setCenterMarker}/>
        {on == "geocoding" && <SearchAddress setCenter={setCenter} listAddress={listAddress} setListAddress={setListAddress}/>}
        {on == "koordinat" && <CoordinateAddress setCenter={setCenter}/>}
        
    </div>
  )
}

export default ToolAddressContainer