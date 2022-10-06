import React from 'react'
import layer from "../../images/Panduan/Layer/layer.png"

function PanduanLayer() {
  return (
    <div style={{
        padding:"20px 20px",
        lineHeight:"26px",
        textAlign:"justify",
        maxHeight:"500px",
        overflowY:"scroll",
        display:"flex",
        flexDirection:"column",
        alignItems:'center'
        }}
    >   
      Menu layer berfungsi untuk menampilkan lapisan-lapisan yang digunakan dalam lembar kerja dalam hal ini adalah peta digital. Dalam menu layer, dapat ditentukan tingkat opacity atau kegelapan untuk masing-masing layer. Secara sederhananya, setiap komponen atau lapisan yang ada pada peta digital dapat diatur tingkat transparansinya
        <img src={layer}/>
    </div>
  )
}

export default PanduanLayer