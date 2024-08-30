import React,{useState,useEffect,useRef} from 'react'

import screenshootContext from '../Context/ScreenshootContext';
import { useContext } from 'react';
function PilihJenisKegiatan({data, setMode,setHasilQuery,setHasil}) {

    const kegiatan = useRef()
    const [listKegiatan, setListKegiatan] = useState(false);
    const [keteranganKegiatan,setKeteranganKegiatan] = useState(false)

    const { takePhoto,setTakePhoto,setScreenshoot } = useContext(screenshootContext);

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
      var url = process.env.REACT_APP_BASE_URL+"jeniskegiatan"
      panggil(hasil=>{
        kegiatan.current.value=hasil.kegiatan[0]["sub kegiatan"]
        setKeteranganKegiatan(hasil.kegiatan[0])
      },url)
    }, []);
  
    const kegiatanChange = (e) => {
      var url = process.env.REACT_APP_BASE_URL+"kegiatan/semua/"+e.target.value
      panggil(hasil=>{
        setListKegiatan(hasil.kegiatan)
      },url)
    }
  
    const simulasiClick = async () => {
      setTakePhoto(!takePhoto);
      setScreenshoot(false)
      const zona = data.namobj
      const subZona=data.nilai_kolo.split("_")[1]
      const swp = data.kodswp
      const kawasan = data.cagbud
      const remark = data.remark
      const tpz = data.tpz_00

      const gsb = data.gsb
      const remarkGsb = data.remarkGsb
      var dataZonasi = {
        swp:swp,
        zona:zona,
        subZona:subZona,
        kawasan:kawasan,
        remark:remark
      }
      var url = process.env.REACT_APP_BASE_URL+"izin/"
      
      fetch(url,{
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },body: JSON.stringify({
          swp: swp,
          subZona: subZona,
          kawasan:kawasan.toLowerCase(),
          kegiatan:kegiatan.current.value,
          remark:remark,
          tpz:tpz
        }),
      })
      .then((respond) => respond.json())
      .then((hasil) =>{
        console.log(hasil);
        if(hasil.zonasi[0]["izin"] === "X"){
          setHasil({simulasi:hasil.zonasi[0],dataZonasi:dataZonasi})
        }else{
          
          setHasilQuery({
          simulasi:hasil,
          dataZonasi:{
            ...dataZonasi,
            gsb:gsb,
            remarkGsb:remarkGsb
          }
         })
         setMode("intensitas")
        }
      })
      .catch((err)=>{
        console.log(err,"err")
      }); 
    }
    
    return(
      <div>
      <form>
        <div className='text-sm'>Pilih <b>Kegiatan</b></div>
        <div className="my-[10px]">
            <div className="flex items-center">
              <input className='px-2 py-2 w-full text-sm rounded-md  border-[2px] border-gray-700' ref={kegiatan} onChange={kegiatanChange}/>
            </div>
            <div className='list-choice'>
                {listKegiatan && listKegiatan.map((e,index)=>{
                  return <div className="choice" 
                    key={index}
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

        {keteranganKegiatan && <div className='mt-2 bg-[#1E2E4A] p-3 rounded-md text-white'>
          <div style={{fontSize:"15px" ,marginBottom:"5px"}}>
            <b>{keteranganKegiatan["sub kegiatan"]}</b>
          </div>
            <p style={{fontSize:"12px"}}>{keteranganKegiatan["keterangan"]}</p>
        </div>}
    </div>
  )
}

export default PilihJenisKegiatan