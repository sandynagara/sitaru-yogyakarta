import React from 'react'
import FormPermohonan from '../component/Permohonan/FormPermohonan'
import { useState } from 'react'
import BackHome from '../component/Permohonan/BackHome'
import ListPermohonanButton from '../component/Permohonan/ListPermohoanButton'
import ListPermohonan from '../component/Permohonan/ListPermohonan'

export default function Permohonan() {

  const [mode, setMode] = useState("form")

  return (
    <div className=' h-screen p-2 flex flex-col gap-4 bg-[#F9FAFE] overflow-scroll'>
      <div className='mx-4 lg:mx-20 flex items-center justify-between'>
        <BackHome/>
        <ListPermohonanButton setMode={setMode} mode={mode}/>
      </div>
      {mode === "form" && <FormPermohonan/>}
      {mode === "listform" && <ListPermohonan/>}
    </div>
  )
}
