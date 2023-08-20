import React,{useState} from 'react'

const InputLoginRegister = ({tipe,label,logo,onChange}) => {

    const [active, setActive] = useState(false)

    return(<div style={{marginTop:"20px"}} className="flex relative">
        <div className="logo-input top-0 bottom-0 left-2 absolute flex justify-center items-center" style={active ? {color : "#1983ec"} : {color : "grey"}}>
            {logo}
        </div>
        <input name={label} onChange={onChange} placeholder={label} type={tipe} onFocus={()=>setActive(true)} onBlur={()=>setActive(false)}/>
    </div>
    )
}

export default InputLoginRegister