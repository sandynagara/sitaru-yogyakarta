import React,{useState,useEffect,useRef} from 'react'
import configData from "../config.json"

function PilihJenisKegiatan({data,setIntensitas,setHasilQuery,setHasil}) {
    const jenisKegiatan = useRef()
    const kegiatan = useRef()
  
    const [listJenisKegiatan, setListJenisKegiatan] = useState(false);
    const [listKegiatan, setListKegiatan] = useState(false);
    const [daftar, setDaftar] = useState(false);
    const [keteranganKegiatan,setKeteranganKegiatan] = useState(false)
  
    var panggil = (cb, url) => {
    fetch(url,{
        method: 'GET',
        credentials: 'include'
      })
      .then((respond) => respond.json())
      .then((json) => cb(json))
      .catch((err)=>{
        console.log(err,"err")
      });
    };
  
    useEffect(() => {
      var url = configData.SERVER_API+"Jeniskegiatan"
      panggil(hasil=>{
        kegiatan.current.value=hasil.kegiatan[0]["sub kegiatan"]
        setKeteranganKegiatan(hasil.kegiatan[0])
        hasil.JenisKegiatan.push("Semua")
        setDaftar(hasil)
      },url)
      jenisKegiatan.current.value="Semua"
    }, []);
  
    const kegiatanChange = (e) => {
      var url = configData.SERVER_API+"kegiatan/"+jenisKegiatan.current.value+"/"+e.target.value
      panggil(hasil=>{
        setListKegiatan(hasil.kegiatan)
      },url)
    }
  
    const changeListJenisKegiatan = (e) => {
      var input = e.target.value.toLowerCase()
      setListJenisKegiatan(daftar.JenisKegiatan.filter(el => el.toLowerCase().indexOf(input) !== -1))
      setListKegiatan(false)
    }
  
    const simulasiClick = (e) => {
      e.preventDefault()
      const zona = data.namobj
      const subZona=data.nilai_kolo.split("_")[1]
      const swp = data.kodswp
      const kawasan = data.cagbud
      const remark = data.remark
      var dataZonasi = {
        swp:swp,
        zona:zona,
        subZona:subZona,
        kawasan:kawasan,
        remark:remark
      }
      var url = configData.SERVER_API+"izin/"
      fetch(url,{
        method: 'POST',
        credentials: 'include',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },body: JSON.stringify({
          swp: swp,
          subZona: subZona,
          kawasan:kawasan.toLowerCase(),
          kegiatan:kegiatan.current.value,
          remark:remark
        }),
      })
      .then((respond) => respond.json())
      .then((hasil) =>{
        if(hasil.zonasi[0]["izin"] === "X"){
          setHasil({simulasi:hasil.zonasi[0],dataZonasi:dataZonasi})
        }else{
          setIntensitas(true)
          setHasilQuery({simulasi:hasil,dataZonasi:dataZonasi})
        }
      })
      .catch((err)=>{
        console.log(err,"err")
      }); 
    }
    
    return(
      <div className='text-md'>
      <form>
      <p>Pilih <b>Jenis Kegiatan</b></p>
      <div style={{marginTop:"10px",marginBottom:"10px"}} className="text-md">
      <input className='px-2 py-2 text-sm w-full rounded-md focus:bg-gray-700 focus:text-white border-2 border-gray-700' placeholder='Jenis Kegiatan' ref={jenisKegiatan} onChange={changeListJenisKegiatan}/>
      <div className='list-choice'>
      {listJenisKegiatan && 
        listJenisKegiatan.map((e)=>{
            return <div className="choice" 
              onClick={()=>{setListJenisKegiatan(false);
              jenisKegiatan.current.value=e
              var url = configData.SERVER_API_Develop+"kegiatan/"+jenisKegiatan.current.value+"/"+"a"
              panggil(hasil=>{
                kegiatan.current.value = hasil.kegiatan[0]['sub kegiatan']
                setKeteranganKegiatan(hasil.kegiatan[0])
              },url)
              }}>
              <p>{e}</p>
            </div>
      })}
         
      </div>
  </div>
  <p>Pilih <b>Kegiatan</b></p>
  <div style={{marginTop:"10px",marginBottom:"10px"}}>
      <div style={{display:'flex',alignItems:"center"}}>
        <input className='px-2 py-2 w-full text-sm rounded-md focus:bg-gray-700 focus:text-white border-[2px] border-gray-700' ref={kegiatan} onChange={kegiatanChange}/>
      </div>
      <div className='list-choice'>
          {listKegiatan && 
          listKegiatan.map((e)=>{
                return <div className="choice" 
                  onClick={()=>{setListKegiatan(false);
                  kegiatan.current.value=e['sub kegiatan']
                  setKeteranganKegiatan(e)
                  }}>
                  <p ><b>{e['sub kegiatan']}</b></p>
                  <p style={{fontSize:"10px",marginTop:"5px",maxHeight:"40px",  overflow: "hidden"}}>{e['keterangan']}</p>
                </div>
          })}
        </div>
  </div>
  
  <div className='bg-sky-600 hover:bg-sky-700 mt-3 w-full mx-2 ml-[-1px] text-center py-2 rounded-md text-sm text-white cursor-pointer' onClick={simulasiClick}>
    Simulasi
  </div>
  </form>

  {keteranganKegiatan && <div className='mt-2 bg-sky-300 p-3 rounded-md'>
    <div style={{fontSize:"15px" ,marginBottom:"5px"}}>
      <b>{keteranganKegiatan["sub kegiatan"]}</b>
    </div>
      <p style={{fontSize:"12px"}}>{keteranganKegiatan["keterangan"]}</p>
  </div>}
    </div>
    )
}

export default PilihJenisKegiatan