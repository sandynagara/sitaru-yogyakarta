import React,{useRef} from 'react'
import "./Pelaporan.css"

import Swal from "sweetalert2"

function Pelaporan({setOpen,data}) {

    const jenisPelaporan = ["Bangunan tidak sesuai aturan zonasi","Intensitas bangunan tidak sesuai aturan","Lainnya"]

    const jenisLaporan = useRef()
    const keterangan = useRef()

    const submitLaporan = (e) => {
        e.preventDefault()
        const url = process.env.REACT_APP_BASE_URL + "laporan"
        const jenisLaporanInput = jenisLaporan.current.value
        const keteranganInput = keterangan.current.value
        const kelurahan = data["wadmkd"]
        const kecamatan = data["wadmkc"]
        const zona = data["namobj"]
        const kawasan = data["cagbud"]
        const swp = data["kodswp"]
        const geometry = data["geometry"]
        fetch(url,{
            method: 'POST',
            credentials: 'include',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },body: JSON.stringify({
                jenisLaporan:jenisLaporanInput,
                keterangan:keteranganInput,
                kelurahan:kelurahan,
                kecamatan:kecamatan,
                zona:zona,
                kawasan:kawasan,
                swp:swp,
                geometry:geometry,
            }),
          })
          .then((respond) => respond.json())
          .then((hasil) =>{
            if(hasil.RTN){
                Swal.fire({
                    icon: 'success',
                    title:"Laporan berhasi dibuat",
                    timer: 2000,
                    }
                )
                setOpen(false)
            }else{
                Swal.fire({
                    icon: 'error',
                    title: 'Maaf',
                    text: 'Laporan gagal dibuat',
                })
            }
            
          })
          .catch((err)=>{
            Swal.fire({
                icon: 'error',
                title: 'Maaf',
                text: 'Laporan gagal dibuat',
            })
          });
    }

    return (
    <div className='pop-up'>
        <div className='pelaporan'>
            <h2>Laporan</h2>
                <div className='jenis-laporan'>
                    <p>Jenis Laporan</p>
                    <select ref={jenisLaporan}>
                        {jenisPelaporan.map((hasil,index)=>{
                            return <option value={hasil} key={index}></option>
                        })}
                    </select>
                </div>
                <div className='keterangan'>
                <p>Keterangan</p>
                    <textarea placeholder='Keterangan' ref={keterangan} type={"text"}/>
                </div>
                <div className='tombol'>
                <button className='batal' onClick={()=>setOpen(false)}>
                    Batal
                </button>
                <button className='submit' onClick={submitLaporan}>
                    Submit
                </button>
            </div>

        </div>
        <div className='black-layer' onClick={()=>setOpen(false)}></div>
    </div>
  )
}

export default Pelaporan