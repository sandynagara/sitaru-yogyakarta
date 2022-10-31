import React,{useEffect,useState} from 'react'
import Logo from "../images/Logo_Kota_Yogyakarta.png"
import configData from "../component/config.json"
import SurveyKepuasan from './SurveyKepuasan'
import Cookies from 'js-cookie'

function Footer() {

    const [jumlahPengunjung, setJumlahPengunjung] = useState(0)
    const [openRating, setOpenRating] = useState(false)

    useEffect(() => {
      const survey = Cookies.get('akses')
      if(survey){
        const url = configData.SERVER_API + "jumlahakses"
        fetch(url,{
          method:"GET",
          credentials:"include"
        }).then(res=>res.json()).then(res=>{
          setJumlahPengunjung(res)
        }).catch((err)=>{
          console.log(err)
        })
      }else{
        const url = configData.SERVER_API + "jumlahakses"
        fetch(url,{
          method:"PATCH",
          credentials:"include"
        }).then(res=>res.json()).then(res=>{
          setJumlahPengunjung(res)
        }).catch((err)=>{
          console.log(err)
        })
      }
     
    }, [])
    

  return (
    <div className=' bg-black py-14 px-20 text-white text-sm flex justify-between mt-5'>
        <div className='w-full relative'>
            <div className='text-center flex flex-col items-center lg:items-start'>
                <img src={Logo} className="w-16 h-20 mb-5"/>
                <p>Dinas Pertanahan dan Tata Ruang Kota Yogyakarta</p>
                <p>Jln. Kenari No.56, Muja Muju, Yogyakarta 55165</p>
                <p>Telp. 0274515865, 0274515866</p>
                <p>No. WA Layanan Online : 0895-2589-8500 </p>
                <p>Email : pertanahantataruang@jogjakota.go.id</p>
            </div>
            <div className='static right-0 bottom-0 mt-5 lg:absolute'>
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