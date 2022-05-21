import React,{useState,useEffect} from 'react'

function KetentuanHasilSimulasi({ketentuan}) {
  
    const [ketentuanSimulasi, setKetentuanSimulasi] = useState(false)

    useEffect(() => {
      if(ketentuan!=""){
        setKetentuanSimulasi(ketentuan.split(";"))
      }
    }, [])
  
    return <div>
      {ketentuanSimulasi && ketentuanSimulasi.map((ketentuan,index)=>{
          return(
            <div className="syarat-hasil-simulasi-list">
              {index+1}. {ketentuan}
            </div>
          )
        })}
    </div>
}

export default KetentuanHasilSimulasi