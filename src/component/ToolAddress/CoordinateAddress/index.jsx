import React,{useState} from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

function CoordinateAddress({setCenter}) {

    const [coordinates, setCoordinates] = useState({
        "latitude":0,
        "longitude":0
    })

    const handleInput = () => {
        setCenter([coordinates["latitude"],coordinates["longitude"]])
    }

  return (
    <div className='flex flex-col p-2 bg-white gap-2'>
        <TextField
            label=""
            id="outlined-size-small"
            defaultValue=""
            placeholder='Latitude'
            size="small"
            type={"number"}
            onChange={(e)=>setCoordinates({...coordinates,"latitude":e.target.value})}
            className='w-[250px] text-sm bg-white'
        />
        <TextField
            label=""
            id="outlined-size-small"
            defaultValue=""
            placeholder='Longitude'
            size="small"
            type={"number"}
            onChange={(e)=>setCoordinates({...coordinates,"longitude":e.target.value})}
            className='w-[250px] text-sm bg-white'
        />
        <Button variant="contained" size="small" onClick={handleInput}>Search</Button>
    </div>
  )
}

export default CoordinateAddress