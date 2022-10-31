import React,{useState,forwardRef} from 'react'

const InputLoginRegister = forwardRef(({tipe,label,logo,ganti},ref) => {

    const [active, setActive] = useState(false)

    return(<div style={{marginTop:"20px"}} className="flex ">
        <div className="logo-input flex justify-center items-center" style={active ? {color : "#1983ec"} : {color : "grey"}}>
            {logo}
        </div>
        <input name={label} onChange={ganti} ref={ref} placeholder={label} type={tipe} onFocus={()=>setActive(true)} onBlur={()=>setActive(false)}/>
    </div>
    )
})

export default InputLoginRegister