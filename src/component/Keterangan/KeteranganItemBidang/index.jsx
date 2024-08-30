import React from 'react'
import "./KeteranganItemBidang.scss"

function KeteranganItemBidang({judul,isi}){
    return <div className="kode">
    <p><b>{judul}</b></p>
    <p className="isi">{isi}</p>
  </div>
}

export default KeteranganItemBidang