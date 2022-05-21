import React from 'react'

function ItemBasemap({item,setInputBasemap,inputBasemap}){
    return(
      <div className="item-basemap" onClick={()=>setInputBasemap(item.url)}>
        <div className="judul">
          <div className="radio" style={inputBasemap===item.url ? {backgroundColor:"#1976D2"} : {}}></div>
          <p>{item.nama}</p>
        </div>
        <img src={item.gambar} alt=""/>
        
      </div>
    )
}

export default ItemBasemap