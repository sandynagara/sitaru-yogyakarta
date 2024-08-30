import React,{useState,useEffect} from 'react'
import StarRatings from 'react-star-ratings';
import Loading from "../images/Loading.svg"
import {AiOutlineClose} from "react-icons/ai"

// import Cookies from 'js-cookie'
import Swal from "sweetalert2"
import { useCookies } from 'react-cookie';

function SurveyKepuasan({setOpenRating}) {

    const [rating, setRating] = useState(0)
    const [totalUserSurvey, setTotalUserSurvey] = useState(0)
    const [isLoading, setIsLoading] = useState(false)
    const [survey, setSurvey] = useState(false)

    const [cookies, setCookie] = useCookies(['survey']);

    useEffect(() => {
        const survey = cookies["survey"]
        if(!survey) return setSurvey(true)
        const url =  process.env.REACT_APP_BASE_URL + "rating"
        fetch(url,{
            method:"GET",
            credentials: 'same-origin',
        }).then(res=>res.json()).then((res)=>{
            if(res["RTN"]){
                setRating(res["rating"])
                setTotalUserSurvey(res["total"])
            }
        }).catch(err=>{
            setRating(0)
        })
    }, [])

    const beriRating = () => {
        setIsLoading(true)
        setCookie("survey",true)
        const url =  process.env.REACT_APP_BASE_URL + "rating"
        fetch(url,{
            method:"PATCH", 
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
            credentials: 'same-origin',
            body:JSON.stringify({
                rating: rating
            })
        }).then(res=>res.json()).then((res)=>{
            setSurvey(true)
            setIsLoading(false)
            setOpenRating(false)
            Swal.fire({
                icon: 'success',
                title:'Rating berhasil diinput',
                timer: 2000,
                }
            )
        }).catch(err=>{
            setIsLoading(false)
        })
    }
    

  return (
    <div className='w-screen h-screen fixed bg-black top-0 left-0 bg-opacity-60 flex justify-center items-center z-50 text-black'>
        <div className='bg-white relative w-3/4 lg:w-1/4 p-5 rounded-md flex flex-col items-center gap-2'>
            <AiOutlineClose className='absolute right-4 top-5 w-5 h-6 cursor-pointer text-red-400' onClick={()=>setOpenRating(false)}/>
            <div className='font-bold text-center'>
                Survey Kepuasan
            </div>
            <div className='flex flex-col gap-2'>
                <div className={`flex justify-center w-full font-semibold ${survey && "hidden" }`}>
                    {rating.toFixed(2)} / 5   
                </div>
                <StarRatings
                    rating={rating}
                    starRatedColor="red"
                    numberOfStars={5}
                    changeRating={(rating)=>{
                        !cookies["survey"] && setRating(rating)
                    }}
                    name='rating'
                    isSelectable={false}
                    starDimension='30px'
                />
                <div className='flex justify-between w-full text-xs'>
                    <div className='ml-[-18px]'>
                        Tidak Puas
                    </div>
                    <div className='mr-[-18px]'>
                        Sangat Puas
                    </div>
                </div>
                <div className='flex justify-between w-full font-semibold text-xs'>
                    <div className='ml-[-18px]'>
                        Total Survey : {totalUserSurvey} Orang
                    </div>
                    
                </div>
            </div>
           
            {survey &&
                <div 
                className={` p-2 mt-3 w-full rounded-md flex justify-center text-white text-center ${rating !== 0 ? "bg-sky-600 hover:bg-sky-700  cursor-pointer" : "bg-gray-500 "}`}
                onClick={()=>beriRating()}
                >
                    {isLoading ? <img src={Loading} className="w-5 h-5" alt='loading'/> : "Beri Rating"}
                </div>
            }         
        </div>
    </div>
  )
}

export default SurveyKepuasan