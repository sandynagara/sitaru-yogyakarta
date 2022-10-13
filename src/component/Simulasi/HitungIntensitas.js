import React,{useState,useEffect,useRef} from 'react'

function HitungIntensitas({setIntensitas,setHasil,hasilQuery}) {
  
    const [intensitas, setIntensitasData] = useState()
    const [hasilIntensitas, setHasilIntensitas] = useState(false)
    const luasBidang = useRef()
    const buttonIntensitas = useRef()
  
    useEffect(() => {
      setIntensitasData(hasilQuery.simulasi.intensitasBangunan[0])
      buttonIntensitas.current.disabled=true
      buttonIntensitas.current.style.backgroundColor = "rgb(180, 210, 248)"
      buttonIntensitas.current.style.cursor = "auto"
    }, [])
    
    const cekLuasBidangTanah = (luas) => {
      var intensitasLuas = {}
      if(luas<101){
        intensitasLuas.kdb = intensitas.kdb40
        intensitasLuas.kdh = intensitas.kdh40
        intensitasLuas.klb = intensitas.klb40
        intensitasLuas.tinggi = intensitas.t40
      }else if(luas<201){
        intensitasLuas.kdb = intensitas.kdb101
        intensitasLuas.kdh = intensitas.kdh101
        intensitasLuas.klb = intensitas.klb101
        intensitasLuas.tinggi = intensitas.t101
      }else if(luas<401){
        intensitasLuas.kdb = intensitas.kdb201
        intensitasLuas.kdh = intensitas.kdh201
        intensitasLuas.klb = intensitas.klb201
        intensitasLuas.tinggi = intensitas.t201
      }else if(luas<1001){
        intensitasLuas.kdb = intensitas.kdb401
        intensitasLuas.kdh = intensitas.kdh401
        intensitasLuas.klb = intensitas.klb401
        intensitasLuas.tinggi = intensitas.t401
      }else{
        intensitasLuas.kdb = intensitas.kdb1001
        intensitasLuas.kdh = intensitas.kdh1001
        intensitasLuas.klb = intensitas.klb1001
        intensitasLuas.tinggi = intensitas.t1001
      }
  
      return intensitasLuas
    }
  
    const gantiLuasBidangTanah = () => {
      const luasBidangTanah = luasBidang.current.value
      var intensitasLuas = cekLuasBidangTanah(luasBidangTanah)
      intensitasLuas.luas = luasBidangTanah
      setHasilIntensitas(intensitasLuas)
      if(luasBidangTanah !== ""){
            buttonIntensitas.current.disabled=false
            buttonIntensitas.current.style.backgroundColor = "#1983ec"
            buttonIntensitas.current.style.cursor = "pointer"
        }else{
            buttonIntensitas.current.disabled=true
            buttonIntensitas.current.style.backgroundColor = "rgb(180, 210, 248)"
            buttonIntensitas.current.style.cursor = "auto"
        }
    }
  
    const simulasiClick =(e)=>{
      e.preventDefault()
      try{
        var HasilSimulasi = {simulasi:hasilQuery.simulasi.zonasi[0],ketentuan:hasilQuery.simulasi.ketentuan[0],dataZonasi:hasilQuery.dataZonasi,intensitas:hasilIntensitas}
      }catch(err){
        var HasilSimulasi = {simulasi:hasilQuery.simulasi.zonasi[0],ketentuan:"",dataZonasi:hasilQuery.dataZonasi,intensitas:hasilIntensitas}
      }
      setHasil(HasilSimulasi)
    }
  
    return (
      <div style={{marginTop:"5px",marginBottom:"10px"}} className="">
       
        <p>Masukkan <b>Luas Bidang (m<sup>2</sup>)</b> </p>
        <div className="w-full" >
            <input className='px-2 py-2 mt-2 w-full rounded-md focus:bg-gray-700 focus:text-white border-2 border-gray-700'  type="number" ref={luasBidang} onChange={gantiLuasBidangTanah}/>
        </div>
  
        <div className='bg-sky-600 hover:bg-sky-700 mt-3 w-full mx-2 ml-[-1px] text-center py-2 rounded-md text-sm text-white cursor-pointer' onClick={simulasiClick} ref={buttonIntensitas}>
              Cek Perizinan
        </div>
        <div className='bg-red-600 hover:bg-red-700 mt-2 w-full mx-2 ml-[-1px] text-center py-2 rounded-md text-sm text-white cursor-pointer' onClick={()=>setIntensitas(false)}>
              Batal
        </div>
        {hasilIntensitas && <div className='mt-2 bg-sky-300 p-3 rounded-md'>
          <div >
            <b>Informasi Intensitas :</b>
          </div>
          <div style={{fontSize:"14px",margin:"7px 0px"}}>
            <p>Koefisien Dasar Bangunan Max : </p>
            <p>{hasilIntensitas.kdb}% </p>
          </div>
          <div style={{fontSize:"14px",margin:"7px 0px"}}>
            <p>Koefisien Lantai Bangunan Max : </p>
            <p>{hasilIntensitas.klb}</p>
          </div>
          <div style={{fontSize:"14px",margin:"7px 0px"}}>
            <p>Koefisien Daerah Hijau Min : </p>
            <p>{hasilIntensitas.kdh}% </p>
          </div>
          <div style={{fontSize:"14px",margin:"7px 0px"}}>
            <p>Tinggi Bangunan Max : </p>
            <p>{hasilIntensitas.tinggi} m</p>
          </div>
        </div>}
      </div>
  
    )
}

export default HitungIntensitas