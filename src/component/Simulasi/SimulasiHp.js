import React,{useState,useEffect} from 'react'
import './SimulasiHp.css'
import HasilSimulasi from '../HasilSimulasi/HasilSimulasi';
import PilihJenisKegiatan from './PilihJenisKegiatan';
import HitungIntensitas from './HitungIntensitas';

function Simulasi({open,data}) {

    const [hasil,setHasil] = useState(false)
    const [hasilQuery,setHasilQuery] = useState(false)
    const [intensitas,setIntensitas] = useState(false)

    useEffect(() => {
      setIntensitas(false)
    }, [data])
  
    return (
        <div className='simulasi simulasiHp h-screen' style={ open === "Simulasi" ? {marginLeft:"50px"} :  {marginLeft:"-250px"}}>
          
          {data ? <div>
            {!intensitas ? <PilihJenisKegiatan data={data} setIntensitas={setIntensitas} setHasilQuery={setHasilQuery} setHasil={setHasil}/>
            :
            hasilQuery && <HitungIntensitas setIntensitas={setIntensitas} intensitas={intensitas} setHasil={setHasil} hasilQuery={hasilQuery}/>
            }  
            </div> :
            <div>
              <p >Belum ada bidang persil yang dipilih</p>
            </div>
          }
          {hasil && <HasilSimulasi close={setHasil} hasil={hasil}/>}
        </div>
    )
}

export default Simulasi
