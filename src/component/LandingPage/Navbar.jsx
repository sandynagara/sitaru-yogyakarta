import React, { useEffect, useState } from 'react'
import logoYogya from "../../images/Logo_Kota_Yogyakarta.png";
import { Link } from 'react-router-dom';
import { AuthService } from '../../service/login';

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

  const logout = async () => {
    try{
      const data = await AuthService.logout()
      localStorage.removeItem("authToken")
      localStorage.removeItem('refreshToken');
      window.location.reload();
    }catch{
      console.log("error failed");
    }
  };

  const login = () => {
    AuthService.ssoLogin()
  }

  return (
    <div className='fixed z-[12] top-0  w-screen  p-3 flex items-center justify-center duration-300' style={stickyClass ? { backgroundColor: "white" } : {}}>
      <div className='md:left-10 flex items-center w-full'>
        <img src={logoYogya} className="md:w-10 md:h-15 h-12" alt='logo kota yogyakarta' />
        <div className='ml-3  text-xs transform duration-300' style={stickyClass ? { color: "black" } : { color: "white" }}>
          <div className='font-semibold'>DINAS PERTANAHAN DAN TATA RUANG</div>
          <div className='italic'>(KUNDHA NITI MANDALA SARTA TATA SASANA)</div>
          <div>KOTA YOGYAKARTA</div>
        </div>
      </div>
      <div className='flex justify-end w-full'>
        {localStorage.getItem("authToken") ?
          <div className='flex gap-2'>
            {localStorage.getItem("role") !== "user" &&
              <Link
                to="management-user"
                className="flex h-full text-sm items-center cursor-pointer rounded-md bg-slate-800 hover:bg-slate-900 px-5 py-1 mr-2 text-white"
              >
                Management User
              </Link>
            }

            <div
              onClick={logout}
              className="flex h-full text-sm items-center cursor-pointer rounded-md bg-red-600 hover:bg-red-700 px-5 py-1 mr-2 text-white"
            >
              Logout
            </div>
          </div>

          :
          <div
            onClick={login}
            className="flex h-full text-sm items-center cursor-pointer rounded-md bg-slate-800 hover:bg-slate-900 px-5 py-1 mr-2 text-white"
          >
            Login
          </div>}
      </div>
    </div>
  )
}

export default Navbar