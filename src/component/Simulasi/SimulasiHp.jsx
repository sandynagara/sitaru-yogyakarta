import React, { useState, useEffect } from 'react'
import './SimulasiHp.css'
import HasilSimulasi from '../HasilSimulasi/HasilSimulasiContainer';
import PilihJenisKegiatan from './PilihJenisKegiatan';
import HitungIntensitas from './HitungIntensitas';

function Simulasi({ open, data }) {

  const [hasil, setHasil] = useState(false)
  const [openModal, setOpenModal] = useState(false)
  const [hasilQuery, setHasilQuery] = useState(false)
  const [intensitas, setIntensitas] = useState(false)
  const [mode, setMode] = useState("kegiatan")

  useEffect(() => {
    setIntensitas(false)
    setMode("kegiatan")
  }, [data])

  return (
    <div className={`simulasi simulasiHp h-screen ${open === "Simulasi" ? "ml-[64px] md:ml-[194px]" : "ml-[-250px]"} `}>
      {hasil && <HasilSimulasi close={setHasil} hasil={hasil} openModal={openModal} setOpenModal={setOpenModal} />}
      {data ? <div>
        {mode == "kegiatan" && <PilihJenisKegiatan data={data} setMode={setMode} setIntensitas={setIntensitas} setHasilQuery={setHasilQuery} setHasil={setHasil} />}
        {mode == "intensitas" && hasilQuery && <HitungIntensitas data={data} setMode={setMode} setIntensitas={setIntensitas} intensitas={intensitas} setHasil={setHasil} hasilQuery={hasilQuery} />}
      </div> :
        <div className='text-center'>
          <p >Belum ada bidang persil yang dipilih</p>
        </div>
      }
    </div>
  )
}

export default Simulasi
