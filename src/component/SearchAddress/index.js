import React,{useState,useEffect} from 'react'
import {AiOutlineSearch} from "react-icons/ai"
import TextField from '@mui/material/TextField';
import axios from "axios";
import configData from "../config.json"

function SearchAddress({setOpen,open,setCenter}) {

    const [listAddress, setListAddress] = useState(false)

    const [on, setOn] = useState(false)
    const [searchTerm, setSearchTerm] = useState("")
    const debouncedSearchTerm = useDebounce(searchTerm,1000)

    function useDebounce(value, delay) {
        const [debouncedValue, setDebouncedValue] = useState(value);
        useEffect(
            () => {
                const handler = setTimeout(() => {
                    setDebouncedValue(value);
                }, delay);
                return () => {
                    clearTimeout(handler);
                };
            },
            [value, delay]
        );
        return debouncedValue;
    }

    useEffect(async() => {
        if(debouncedSearchTerm == ""){
            setListAddress(false)
            return
        }

        const url = configData.SERVER_API+"geocoding/"+debouncedSearchTerm;
        try {
            const response = await axios.get(url);
            if(response.data.length == 0){
                setListAddress([{"display_name":"Alamat tidak ditemukan"}])
            }else{
                setListAddress(response.data)
            }
           
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    }, [debouncedSearchTerm])
    
    const handleToggleAddress = () => {
        setOn(!on)
        setListAddress(false)
    }

    const handleClick = (value) => {
        if(value.display_name == "Alamat tidak ditemukan") return
        const lat = value.lat
        const lon = value.lon
        setCenter([lat,lon])
    }

  return (
    <div className='ml-[60px] mt-2 flex gap-x-1 z-[997] fixed top-0 duration-500'
        style={open ? {marginLeft:"310px"}: {marginLeft:"60px"}}
    >
        <div className='rounded-md flex justify-center items-center bg-white w-9 h-10 cursor-pointer hover:bg-gray-200'
            onClick={handleToggleAddress}
        >
            <AiOutlineSearch color='#1976D2' size={20}/>
        </div>
        {on && <div className='bg-white flex flex-col items-center'>
            <TextField
                label=""
                id="outlined-size-small"
                defaultValue=""
                placeholder='Alamat'
                size="small"
                className='w-[300px] text-sm'
                onChange={(e)=>setSearchTerm(e.target.value)}
            />
            <div className='max-h-[500px] w-[300px] flex flex-col'>
                {listAddress && listAddress.map((value,index)=>{
                    return <div className='p-2 text-sm overflow-hidden cursor-pointer border-gray-200 border-solid border-[1px] hover:bg-sky-100' 
                        key={index}
                        onClick={()=>handleClick(value)}
                    >
                        {value["display_name"]}
                    </div>
                })}
            </div>
           
        </div>
        }
        
    </div>
    
  )
}

export default SearchAddress