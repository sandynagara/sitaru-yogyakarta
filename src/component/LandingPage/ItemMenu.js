import React from 'react'
import icon from '../../images/Menu/icon_sitaru.svg'


function ItemMenu({icon,judul,color="rgb(207,216,220)"}) {
  return (
    <div style={{
      backgroundColor:"white",
      padding:"1.5rem 2rem",
      borderRadius:"15px",
      display:"flex",
      alignItems:"center",
      flexDirection:"column",
      cursor:"pointer",
      margin:"10px"
    }}>
      <div style={{
        backgroundColor:color,
        padding:"15px",
        borderRadius:9999,
        display:"flex",
        alignItems:"center",
        margin:"1px",
        justifyContent:"center"
      }}>
        {icon}
      </div>
      
      <div style={{
        marginTop:"20px",
        fontWeight:500,
        fontSize:"12px",
        color:"black"
      }}>
        {judul}
      </div>
    </div>
  )
}

export default ItemMenu