import React from 'react'

function ListKeterangan({judul,isi}){
    return <div className="kode">
    <p><b>{judul}</b></p>
    <p className="isi">{isi}</p>
  </div>
}

export default ListKeterangan