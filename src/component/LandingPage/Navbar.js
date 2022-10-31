import React,{useEffect,useState} from 'react'
import logoYogya from "../../images/Logo_Kota_Yogyakarta.png";

function Navbar() {

  const [stickyClass, setStickyClass] = useState(0);

  useEffect(() => {
    window.addEventListener('scroll', stickNavbar);

    return () => {
      window.removeEventListener('scroll', stickNavbar);
    };
  }, []);

  const stickNavbar = () => {
    if (window !== undefined) {
      var windowHeight = window.scrollY;
      windowHeight > 0 ? setStickyClass(true) : setStickyClass(false)
    }
  };

  const NavbarItem = ({menu}) => {
    return <div className='px-3 cursor-pointer font-semibold hover:text-sky-600'>
      {menu}
    </div>
  }

  return (
    <div className='fixed z-[12] top-0  w-screen  p-2 flex items-center justify-center h-[80px] duration-300' style={stickyClass ? {backgroundColor:"white"}:{}}>
        <div className='md:left-10 absolute flex items-center'>
          <img src={logoYogya} className="md:w-10 md:h-15 h-12"/>
          <div className='ml-3  text-xs transform duration-300' style={stickyClass ? {color:"black"}:{color:"white"}}>
            <div className='font-semibold'>DINAS PERTANAHAN DAN TATA RUANG</div>
            <div className='italic'>(KUNDHA NITI MANDALA SARTA TATA SASANA)</div>
            <div>KOTA YOGYAKARTA</div>
          </div>
        </div>
        <div className='flex'>
          {/* <NavbarItem menu={"Home"}/>
          <NavbarItem menu={"Fitur"}/> */}
        </div>
        <div></div>
    </div>
  )
}

export default Navbar