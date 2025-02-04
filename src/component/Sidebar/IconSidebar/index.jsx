import React from 'react'


function Icon({ icon ,judul ,open, setOpen}) {

    const gantiTombol = () =>{
      if(open === judul){
        setOpen(false)
      }else{
        if(judul==="Login"){
          const url = `${process.env.REACT_APP_BASE_URL}/` + "user/check"
          fetch(url,{
            method:"GET",
            credentials:"include"
          })
          .then(res=>res.json())
          .then(res=>{
            if(res !== "unauthorized"){
              setOpen("Profile")
            }else{
              setOpen("Login")
            }
          })
        }else{
          setOpen(judul)
        }
      }
    }

  return (
    <div 
      onClick={gantiTombol} 
      style={{display:"flex" ,alignItems:"center",borderRadius:"1rem 0 0 1rem"}} 
      className={`pl-3 font-semibold pr-6 md:pr-[60px] py-3 gap-4 ${open === judul ? "bg-white text-[#1E2E4A]" : "text-white hover:bg-[#263247]"}`
    }>
      <div>{icon}</div>
      <div className={`text-sm w-20 hidden md:flex ${open === judul && ' font-semibold'}`}>{judul}</div>
    </div>
  );
}

export default Icon