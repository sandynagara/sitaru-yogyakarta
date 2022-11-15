import React,{useEffect,useState} from 'react'
import Logo from "../images/Logo_Kota_Yogyakarta.png"
import configData from "../component/config.json"
import SurveyKepuasan from './SurveyKepuasan'
// import Cookies from 'js-cookie'
import { useCookies } from 'react-cookie';

function Footer() {

    const [jumlahPengunjung, setJumlahPengunjung] = useState(0)
    const [openRating, setOpenRating] = useState(false)

    const [cookies, setCookie, removeCookie] = useCookies(['akses']);

    useEffect(() => {
      const survey = cookies["akses"]
      if(survey){
        const url = configData.SERVER_API + "jumlahakses"
        fetch(url,{
          method:"GET",
          credentials: 'same-origin',
        }).then(res=>res.json()).then(res=>{
          setJumlahPengunjung(res)
        }).catch((err)=>{
          console.log(err)
        })
      }else{
        const url = configData.SERVER_API + "jumlahakses"
        fetch(url,{
          method:"PATCH",
          credentials: 'same-origin',
        }).then(res=>res.json()).then(res=>{
          setJumlahPengunjung(res)
        }).catch((err)=>{
          console.log(err)
        })
        setCookie("akses",true,{secure:true,httpOnly:true})
      }
      
    }, [])
    

  return (
    <div className=' bg-black py-12 px-20 text-white text-sm flex justify-between mt-5'>
        <div className='w-full relative flex flex-col'>
          <div className='grid lg:grid-cols-10'>
            <div className='text-center col-span-4 flex flex-col items-center lg:items-start '>
                  <img src={Logo} className="w-16 h-20 mb-5" alt='logo kota yogyakarta'/>
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
                <div className='mt-2 text-justify text-s'>Gatra Matra Jogja adalah media informasi yang utuh dan mudah diakses oleh masyarakat terkait ketentuan tata ruang 
berdasarkan Peraturan Walikota Nomor 118 Tahun 2021 tentang Rencana Detail Tata Ruang (RDTR) 
Kota Yogyakarta Tahun 2021-2041.</div>
              </div>
          </div>
              <div>

              </div>
            <div className='static right-0 top-0 mt-5 lg:absolute'>
                <div  className=' bg-white text-slate-900 px-4 py-1 font-medium rounded-sm mb-2 text-center cursor-pointer'
                    onClick={()=>setOpenRating(true)}
                >
                    Survey Kepuasan
                </div>
                <div className=' bg-white text-slate-900 px-4 py-1 rounded-t-md  text-center'>
                    Jumlah Pengguna
                </div>
                <div className='text-center py-2  border-2 border-solid'>
                    {jumlahPengunjung}
                </div>
            </div>
        </div>
        {openRating && <SurveyKepuasan setOpenRating={setOpenRating}/>}
    </div>
  )
}

export default Footer