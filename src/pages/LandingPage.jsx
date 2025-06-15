import { useState } from 'react'
import ItemMenu from '../component/LandingPage/ItemMenu'
import Navbar from '../component/LandingPage/Navbar'
import SitaruLaptop from '../images/sitaru_laptop.png'
import { BiMapAlt } from 'react-icons/bi'
import { AiOutlineSetting, AiOutlineWhatsApp } from 'react-icons/ai'
import { GrDocumentText } from "react-icons/gr"
import { Link as LinkTo } from 'react-router-dom'
import Footer from '../component/Footer'
import Layanan from '../component/Layanan'
import logoGatraMatra from "../images/logo_gatra.png"

function LandingPage() {

  const [layananOpen, setLayananOpen] = useState(false)

  return (
    <div className=''>
      <Navbar />
      <div className="h-max sm:h-[calc(100vh_-_72px)] mt-[71px] flex flex-col justify-evenly bg-black">
        <div className='p-3 md:pl-10 md:flex'>
          <img
            className='absolute z-[-1] left-0 top-0'
            src='https://wallpaperaccess.com/full/1129027.jpg'
            style={{ width: "100vw", backgroundSize: "cover", height: "100%" }}
            alt='background'
          />
          <div className='md:w-3/5 flex flex-col h-full justify-center'>
            <img src={logoGatraMatra} className='h-[130px] sm:h-[180px] sm:w-[570px] bg-cover' alt='logo gatra matra' />
            <div className='text-sm md:text-md md:text-xl text-yellow-600 mt-[-15px] font-semibold'>
              (Gapura Aksesibilitas Terintegrasi
              Pemanfaatan Tata Ruang Kota Yogyakarta)
            </div>
            <div className='text-sm md:text-md mt-3 text-white'>
              Media informasi yang utuh dan mudah diakses oleh masyarakat terkait ketentuan tata ruang
              berdasarkan Peraturan Walikota Nomor 118 Tahun 2021 tentang Rencana Detail Tata Ruang (RDTR)
              Kota Yogyakarta Tahun 2021-2041.
            </div>
            <div className='flex mt-5'>
              <LinkTo to={"dashboard"}>
                <div className='bg-white py-3 px-6  text-black font-medium rounded-md cursor-pointer hover:bg-gray-700 hover:text-white'>
                  Masuk
                </div>
              </LinkTo>
            </div>

          </div>
          <div className='flex justify-center items-center w-2/5'>
            <img src={SitaruLaptop} className="md:w-[300px] w-0  md:h-[170px]" alt='gatra matra laptop' />
          </div>
        </div>

        <div className='grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-5'>
          <ItemMenu judul={"Peta"}
            keterangan={"Peta Tematik Tata Ruang"}
            link="/peta"
            active={true}
            icon={<BiMapAlt color="white" size={50} />}
          />
          <ItemMenu judul={"Regulasi"}
            keterangan={"Informasi Regulasi Tata Ruang"}
            link="/regulasi"
            active={true}
            icon={<AiOutlineSetting color="white" size={50} />}
          />

          <ItemMenu judul={"SiReklame"}
            keterangan={"Pengendalian Pemanfaatan Ruang Reklame Berbasis Sistem Informasi Kota Yogyakarta"}
            customAction={() => { window.open("https://pepadhang-resik.ppids-ugm.com/", '_blank', 'noopener,noreferrer'); }}
            active={true}
            icon={<GrDocumentText color="white" size={50} />}
          />

          <ItemMenu judul={"Layanan"}
            keterangan={"Akses layanan IKTR dan KKPR"}
            customAction={() => { setLayananOpen(true) }}
            active={true}
            icon={<GrDocumentText color="white" size={50} />}
          />

          <ItemMenu judul={"Hubungi Kami"}
            keterangan={"Konsultasi dan Aduan"}
            customAction={() => { window.open("https://api.whatsapp.com/send/?phone=%2B628112735100&text&type=phone_number&app_absent=0", '_blank', 'noopener,noreferrer'); }}
            active={true}
            icon={<AiOutlineWhatsApp color="white" size={50} />}
          />

        </div>
      </div>

      <div className='z-[100000]'>
        <Footer />
      </div>
      {layananOpen && <Layanan setLayananOpen={setLayananOpen} />}
    </div>
  )
}

export default LandingPage
