import React,{useState,useEffect} from 'react'

function SyaratHasilSimulasi({syarat}) {
  
    const [syaratSimulasi, setSyaratSimulasi] = useState(false)

    useEffect(() => {
      if(syarat!=""){
        setSyaratSimulasi(syarat.split(";"))
      }
    }, [])
    
    return (
      <div className='syarat-hasil-simulasi'>
        {syaratSimulasi && syaratSimulasi.map((syarat,index)=>{
          return(
            <div className="syarat-hasil-simulasi-list">
              {index+1}. {syarat}
            </div>
          )
        })}
      </div>
    )
}

export default SyaratHasilSimulasi