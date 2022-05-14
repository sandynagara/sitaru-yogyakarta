import React,{useState,useEffect,useRef} from 'react'
import './Simulasi.css'
import configData from "./config.json";
import './SimulasiHp.css'
import HasilSimulasi from './HasilSimulasi';
import {AiOutlineCheck,AiOutlineClose} from "react-icons/ai"

function HitungIntenstias({setIntensitas,setHasil,hasilQuery}){

  const [intensitas, setIntensitasData] = useState()

  const [checkKdb, setCheckKdb] = useState(false)
  const [checkKlb, setCheckKlb] = useState(false)
  const [checkKdh, setCheckKdh] = useState(false)
  const [checkTinggi, setCheckTinggi] = useState(false)
  const [hasilIntensitas, setHasilIntensitas] = useState(false)

  const luasBangunan = useRef()
  const luasLantai = useRef()
  const luasBidang = useRef()
  const luasHijau = useRef()
  const tinggiBangunan = useRef()
  // const buttonIzin = useRef()

  useEffect(() => {

    console.log(hasilQuery,"tes")
    setIntensitasData(hasilQuery.simulasi.intensitasBangunan[0])
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
    // hitungKdb()
    // hitungKlb()
    // hitungTinggi()
    // hitungKdh()
  }

  const hitungKdb = () => {
    var luasBangunanInput = luasBangunan.current.value
    var luasBidangInput = luasBidang.current.value
    var nilaiKdb = Number(hasilIntensitas.kdb)*0.01*luasBidangInput
    if(luasBangunanInput <= nilaiKdb){
      setCheckKdb(true)
    }else{
      setCheckKdb(false)
    }
  }

  // useEffect(() => {
  //   if(checkKdb && checkKdh && checkKlb && checkTinggi){
  //     buttonIzin.current.disabled=false
  //     buttonIzin.current.style.backgroundColor = "#1983ec"
  //     return true
  //   }else{  
  //     buttonIzin.current.disabled=true
  //     buttonIzin.current.style.backgroundColor = "rgb(180, 210, 248)"
  //     buttonIzin.current.style.cursor = "pointer"
  //     return false
  //   }
  // }, [checkKdb,checkKdh,checkKlb,checkTinggi])
  

  const hitungKlb = () => {
    var luasLantaiInput = luasLantai.current.value
    var luasBidangInput = luasBidang.current.value
    try{
      var nilaiKlb = Number(hasilIntensitas.klb.replace(/,/g, '.'))*luasBidangInput
    }catch{}
    if(luasLantaiInput <= nilaiKlb){
      setCheckKlb(true)
    }else{
      setCheckKlb(false)
    }
  }

  const hitungKdh = () => {
    var luasHijauInput = luasHijau.current.value
    var luasBidangInput = luasBidang.current.value
    var nilaiKdh = Number(hasilIntensitas.kdh)*0.01*luasBidangInput
    if(luasHijauInput >= nilaiKdh){
      setCheckKdh(true)
    }else{
      setCheckKdh(false)
    }
  }

  const hitungTinggi = () => {
    var tinggiBangunanInput = tinggiBangunan.current.value
    var nilaiTinggi = Number(hasilIntensitas.tinggi)
    if(tinggiBangunanInput <= nilaiTinggi){
      setCheckTinggi(true)
    }else{
      setCheckTinggi(false)
    }
  }

  const simulasiClick =(e)=>{
    e.preventDefault()
    try{
      var HasilSimulasi = {simulasi:hasilQuery.simulasi.zonasi[0],ketentuan:hasilQuery.simulasi.ketentuan[0],dataZonasi:hasilQuery.dataZonasi,intensitas:hasilIntensitas}
    }catch(err){
      var HasilSimulasi = {simulasi:hasilQuery.simulasi.zonasi[0],ketentuan:"",dataZonasi:hasilQuery.dataZonasi,intensitas:hasilIntensitas}
    }

    console.log(HasilSimulasi)
    setHasil(HasilSimulasi)
    console.log("tes")
  }

  return (
    <div style={{marginTop:"10px",marginBottom:"10px"}} className="hitung-intensitas">
     
      <p>Masukkan <b>Luas Bidang (m<sup>2</sup>)</b> </p>
      <div className="izin-hitung" >
          <input className='input-simulasi'  type="number" ref={luasBidang} onChange={gantiLuasBidangTanah}/>
      </div>

      {/* <p>Masukkan <b>Luas Bangunan (m<sup>2</sup>)</b></p>
      <div className="izin-hitung">
          <input className='input-simulasi' type="number" ref={luasBangunan} onChange={hitungKdb}/>
          <div  style={{color:"#2a8ff3",marginLeft:"-30px",display:"flex",alignItems:"center"}}>
            {checkKdb ? <AiOutlineCheck style={{color:"#2a8ff3",width:"17px",height:"17px"}}/> : <AiOutlineClose style={{color:"red",width:"17px",height:"17px"}}/>}
          </div>
      </div>

      <p>Masukkan <b>Total Luas Lantai (m<sup>2</sup>)</b></p>
      <div className="izin-hitung">
          <input className='input-simulasi' type="number" ref={luasLantai} onChange={hitungKlb}/>
          <div  style={{color:"#2a8ff3",marginLeft:"-30px",display:"flex",alignItems:"center"}}>
            {checkKlb ? <AiOutlineCheck style={{color:"#2a8ff3",width:"17px",height:"17px"}}/> : <AiOutlineClose style={{color:"red",width:"17px",height:"17px"}}/>}
          </div>
      </div>

      <p>Masukkan <b>Total Lahan Hijau (m<sup>2</sup>)</b></p>
      <div className="izin-hitung">
          <input className='input-simulasi' type="number" ref={luasHijau} onChange={hitungKdh}/>
          <div  style={{color:"#2a8ff3",marginLeft:"-30px",display:"flex",alignItems:"center"}}>
            {checkKdh ? <AiOutlineCheck style={{color:"#2a8ff3",width:"17px",height:"17px"}}/> : <AiOutlineClose style={{color:"red",width:"17px",height:"17px"}}/>}
          </div>
      </div>

      <p>Masukkan <b>Tinggi Bangunan (m)</b></p>
      <div className="izin-hitung"  onChange={hitungTinggi}>
          <input className='input-simulasi'  type="number" ref={tinggiBangunan}/>
          <div  style={{color:"#2a8ff3",marginLeft:"-30px",display:"flex",alignItems:"center"}}>
            {checkTinggi ? <AiOutlineCheck style={{color:"#2a8ff3",width:"17px",height:"17px"}}/> : <AiOutlineClose style={{color:"red",width:"17px",height:"17px"}}/>}
          </div>
      </div> */}
      <button className='simulasi' onClick={simulasiClick}>
            Cek Perizinan
      </button>
      <button className='simulasi batal' onClick={()=>setIntensitas(false)}>
            Batal
      </button>
      {hasilIntensitas && <div className='keterangan-intensitas'>
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

function PilihJenisKegiatan({data,setIntensitas,setHasilQuery,setHasil}){
  const jenisKegiatan = useRef()
  const kegiatan = useRef()

  const [listJenisKegiatan, setListJenisKegiatan] = useState(false);
  const [listKegiatan, setListKegiatan] = useState(false);
  const [daftar, setDaftar] = useState(false);
  const [keteranganKegiatan,setKeteranganKegiatan] = useState(false)

  useEffect(() => {
    console.log("tes")
  }, [data])
  

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
    console.log(url)
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
    const zona = data.NAMOBJ
    const subZona=data.nilai_kolo.split("_")[1]
    const swp = data.KODSWP
    const kawasan = data.CAGBUD
    var dataZonasi = {
      swp:swp,
      zona:zona,
      subZona:subZona,
      kawasan:kawasan
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
        kegiatan:kegiatan.current.value
      }),
    })
    .then((respond) => respond.json())
    .then((hasil) =>{
      if(hasil.zonasi[0]["izin"] == "X"){
        setHasil({simulasi:hasil.zonasi[0],dataZonasi:dataZonasi})
      }else{
        console.log({simulasi:hasil,dataZonasi:dataZonasi})
        setIntensitas(true)
        
        setHasilQuery({simulasi:hasil,dataZonasi:dataZonasi})
      }
    })
    .catch((err)=>{
      console.log(err,"err")
    }); 
  }
  
  return(
    <div>
    <form>
<p>Pilih <b>Jenis Kegiatan</b></p>
<div style={{marginTop:"10px",marginBottom:"10px"}}>
    <input className='input-simulasi' placeholder='Jenis Kegiatan' ref={jenisKegiatan} onChange={changeListJenisKegiatan}/>
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
      <input className='input-simulasi' ref={kegiatan} onChange={kegiatanChange}/>
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

<button className='simulasi' onClick={simulasiClick}>
  Simulasi
</button>
    </form>
{keteranganKegiatan && <div className='keterangan-intensitas'>
  <div style={{fontSize:"15px" ,marginBottom:"5px"}}>
    <b>{keteranganKegiatan["sub kegiatan"]}</b>
  </div>
    <p style={{fontSize:"12px"}}>{keteranganKegiatan["keterangan"]}</p>
</div>}
  </div>
  )
}

function SimulasiHp({open,data}) {

    const [hasil,setHasil] = useState(false)
    const [hasilQuery,setHasilQuery] = useState(false)
    const [intensitas,setIntensitas] = useState(false)
    const [user,setUser] = useState(false)

    useEffect(() => {
      setIntensitas(false)
    }, [data])
  
    return (
        <div className='simulasi simulasiHp' style={ open === "Simulasi" ? {marginLeft:"50px"} :  {marginLeft:"-250px"}}>
          
          {data ? <div>
            {!intensitas ? <PilihJenisKegiatan data={data} setIntensitas={setIntensitas} setHasilQuery={setHasilQuery} setHasil={setHasil}/>
            :
            hasilQuery && <HitungIntenstias setIntensitas={setIntensitas} intensitas={intensitas} setHasil={setHasil} hasilQuery={hasilQuery}/>
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

export default SimulasiHp
