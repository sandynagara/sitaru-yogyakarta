import React from 'react'
import ItemMenu from '../component/LandingPage/ItemMenu'
import Navbar from '../component/LandingPage/Navbar'
import SitaruLaptop from '../images/sitaru_laptop.png'
import {BiBuildingHouse} from 'react-icons/bi'
import { Link, animateScroll as scroll } from "react-scroll";

function LandingPage() {
  return (
    <div className=''>
      <Navbar/>
      <div className="h-[calc(100vh_-_72px)] mt-[71px] p-3 md:pl-10 md:flex ">
        <img 
        className='absolute z-[-1] left-0 top-0'
          src='https://www.fujitsu.com/global/imagesgig5/infographic-bg_tcm100-6800075_tcm100-2750236-32.jpg' 
          style={{width:"100vw",backgroundSize:"cover",height:"100vh"}}
        />
        <div className='md:w-3/5 flex flex-col h-full justify-center'>
          <div className='text-[30px] md:text-[50px] font-bold text-white'>
            GATRA MATRA JOGJA
          </div>
          <div className='text-md md:text-xl text-gray-300'>
          (Gapura Aksesibilitas Terintegrasi 
Pemanfaatan Tata Ruang Kota Yogyakarta)
          </div>
          <div className='text-md mt-3 text-white'>
          Gatra Matra Jogja menjadi satu portal resmi pemerintah daerah yang 
menghadirkan sistem tata ruang dengan kedalaman utuh substansi Perwal RDTR yang 
bersifat operasional untuk layanan publik.
          </div>
          <Link 
            activeClass="active"
            to="fitur"
            spy={true}
            smooth={true}
            offset={-80}
            duration={500}
          >
            <div className='flex mt-5'>
              <div className='bg-white py-3 px-6  text-sky-800 font-medium rounded-md cursor-pointer hover:bg-sky-700 hover:text-white'>
                Daftar Fitur
              </div>
            </div>
          </Link>
        </div>
        <div className='flex justify-center items-center w-2/5'>
          <img src={SitaruLaptop} className="md:w-[300px] w-0  md:h-[170px]"/>
        </div>
        
      </div>
      <div className='mt-10 pb-10  z-[100000]'>
        <div className='flex justify-center text-2xl font-bold' id='fitur'>
          Daftar Fitur
        </div>
        <div className='mt-7 grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4'>
          <ItemMenu judul={"Sitaru"} 
          icon={<BiBuildingHouse size={50}/>}
          link="/dashboard"
          keterangan={"Berisi informasi terkait aturan RDTR dan perizinanannya pada setiap bidang tanah"}
          active={true}
          />
          <ItemMenu judul={"Siperta"} 
          keterangan={"Berisi informasi terkait data data persil yang dimiliki Pemkot Yogyakarta termasuk data sultan ground"}/>
          <ItemMenu judul={"SiLapor"} 
          keterangan={"Digunakan untuk melaporkan pelanggaran tata ruang kota baik dari perizinan jenis bangunan maupun intensitas bangunan"}/>
          <ItemMenu judul={"Simpancang"} 
          keterangan={"Berisi data detil tata ruang, termasuk simulasi GSB, bedanya dengan sitaru, simpancang lebih spesifik ke data tata ruang skala besar"}/>
          <ItemMenu judul={"Panduan"} 
          keterangan={"Berisi panduan penggunaan sitaru"}/>
          <ItemMenu judul={"Joint Studio"} 
          keterangan={"Berisi kumpulan peta peta kota Yogyakarta (Galery Peta) dan peraturan terkait tata ruang"}/>
          <ItemMenu judul={"IKM"} 
          keterangan={"Berisi kepuasan masyarakat terhadao sitaru"}/>
        </div>
      </div>
    </div>
  )
}

export default LandingPage
