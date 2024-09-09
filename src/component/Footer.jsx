import React,{useEffect,useState} from 'react'
import Logo from "../images/Logo_Kota_Yogyakarta.png"

import SurveyKepuasan from './SurveyKepuasan'
// import Cookies from 'js-cookie'
import { useCookies } from 'react-cookie';

function Footer() {

    const [jumlahPengunjung, setJumlahPengunjung] = useState(0)
    const [openRating, setOpenRating] = useState(false)

    const [cookies, setCookie] = useCookies(['akses']);

    useEffect(() => {
      const survey = cookies["akses"]
      if(survey){
        const url = process.env.REACT_APP_BASE_URL + "jumlahakses"
        fetch(url,{
          method:"GET",
          credentials: 'same-origin',
        }).then(res=>res.json()).then(res=>{
          setJumlahPengunjung(res)
        })
      }else{
        const url = process.env.REACT_APP_BASE_URL + "jumlahakses"
        fetch(url,{
          method:"PATCH",
          credentials: 'same-origin',
        }).then(res=>res.json()).then(res=>{
          setJumlahPengunjung(res)
        })
        setCookie("akses",true,{secure:true,httpOnly:true})
      }
      
    }, [])
    

  return (
    <div className='flex flex-col'>
        <div className=' bg-black py-10 px-20 text-white text-sm flex flex-col'>
          <div className='w-full relative flex flex-col'>
            <div className='grid lg:grid-cols-10'>
              <div className='text-center col-span-4 flex flex-col items-center lg:items-start '>
                    <img src={Logo} className="w-12 mb-5" alt='logo kota yogyakarta'/>
                    <p className='font-semibold'>Dinas Pertanahan dan Tata Ruang Kota Yogyakarta</p>
                    <p className='italic'>(Kundha Niti Mandala Sarta Tata Sasana)</p>
                    <p>Komplek Balaikota Yogyakarta, Kota Yogyakarta</p>
                    <p>Jl. Kenari No 56, Mujamuju, Umbulharjo, Yogyakarta 55165</p>
                    <p>Telp. (0274) 515865, 562682</p>
                    <p>WA pelayanan : 08112735100</p>
                    <p>Email : dinpertaru@jogjakota.go.id</p>
                    <p>pertanahan.tataruang@gmail.com</p>
                    <p>Email pelayanan : online.dinpertaru@gmail.com</p>
                </div>
                <div className=' col-span-3'>
                  <div className='font-semibold   text-xl mt-5 lg:mt-0'> Apa itu Gatra Matra Jogja?</div>
                  <div className='mt-2 text-justify text-sm'>Gatra Matra Jogja adalah media informasi yang utuh dan mudah diakses oleh masyarakat terkait ketentuan tata ruang 
  berdasarkan Peraturan Walikota Nomor 118 Tahun 2021 tentang Rencana Detail Tata Ruang (RDTR) 
  Kota Yogyakarta Tahun 2021-2041.</div>
                </div>
            </div>
              <div className='static right-0 top-0 mt-5 lg:absolute'>
                  <div  className=' bg-white text-slate-900 px-4 py-1 font-medium rounded-sm mb-2 text-center cursor-pointer'
                      onClick={()=>setOpenRating(true)}
                  >
                      Survey Kepuasan
                  </div>
                  <div className=' bg-white text-slate-900 px-4 py-1 rounded-t-md  text-center'>
                      Jumlah Kunjungan
                  </div>
                  <div className='text-center py-2  border-2 border-solid'>
                      {jumlahPengunjung}
                  </div>
              </div>
          
          </div>
        {openRating && <SurveyKepuasan setOpenRating={setOpenRating}/>}
      </div>
      <div className="bg-gray-900 text-white text-sm px-20 py-3">
          Gatra Matra v.4.0 © 2018-2023
        </div>
    </div>
 
  )
}

export default Footer