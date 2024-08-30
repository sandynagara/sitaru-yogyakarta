import React,{useState,useEffect} from 'react'
import "./SyaratSimulasi.scss"

function SyaratHasilSimulasi({syarat}) {
  
    const [syaratSimulasi, setSyaratSimulasi] = useState(false)

    useEffect(() => {
      if(syarat!=""){
        setSyaratSimulasi(syarat.split(";"))
      }
    }, [])
    
    return (
      <>
        {syaratSimulasi && syaratSimulasi.map((syarat,index)=>{
          return(
            <div className="syarat-hasil-simulasi-list" key={index}>
              {index+1}. {syarat}
            </div>
          )
        })}
      </>
    )
}

export default SyaratHasilSimulasi