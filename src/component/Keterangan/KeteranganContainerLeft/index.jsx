import React from 'react'
import KeteranganSitaru from '../KeteranganSitaru'
import ListKeteranganBidang from '../ListKeteranganBidang'

function KeteranganContainerLeft({open,data}) {
  return (
    <div className={`bg-white w-[250px] h-screen absolute top-0 left-0 z-[997] duration-500  ${open === "Keterangan" ? "ml-[64px] md:ml-[194px]" : "ml-[-250px]"}`}>
        {data ? <ListKeteranganBidang data={data}/> : <KeteranganSitaru/>}
    </div>
  )
}

export default KeteranganContainerLeft