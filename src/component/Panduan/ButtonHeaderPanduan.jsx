import React from 'react'

function ButtonHeaderPanduan({judul,pilih,setPilih}) {
  return (
    <div style={judul === pilih ? {
        padding:"10px 20px",
        borderBottom:"solid #0075eb 3px",
        cursor:"pointer",
        width:"100%",
        textAlign:"center",
        fontWeight:"600",
        color:"#0075eb",
        whiteSpace: "nowrap"
    }:
    {
        padding:"10px 20px",
        borderBottom:"solid black 3px",
        cursor:"pointer",
        width:"100%",
        textAlign:"center",
        whiteSpace: "nowrap"
    }
    }
    onClick={()=>setPilih(judul)}
    >{judul}</div>
  )
}

export default ButtonHeaderPanduan