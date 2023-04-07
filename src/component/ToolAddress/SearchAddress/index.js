import React,{useEffect,useState} from 'react'
import configData from "../../config.json"
import TextField from '@mui/material/TextField';
import axios from "axios";

function SearchAddress({setCenter,setListAddress,listAddress}) {
    
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

    const handleClick = (value) => {
        if(value.display_name == "Alamat tidak ditemukan") return
        const lat = value.lat
        const lon = value.lon
        setCenter([lat,lon])
        setSearchTerm(value["display_name"])
    }

  return (
    <div className='flex flex-col items-center'>
        <TextField
            label=""
            id="outlined-size-small"
            defaultValue=""
            placeholder='Alamat'
            size="small"
            inputProps={{style: {fontSize: "0.875rem"}}}
            value={searchTerm}
            className='w-[260px] text-xs p-0 bg-white'
            onChange={(e)=>setSearchTerm(e.target.value)}
        />
        <div className='bg-white max-h-[500px] w-[260px] flex flex-col'>
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
  )
}

export default SearchAddress