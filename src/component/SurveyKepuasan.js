import React,{useState,useEffect} from 'react'
import StarRatings from 'react-star-ratings';
import Loading from "../images/Loading.svg"
import {AiOutlineClose} from "react-icons/ai"
import configData from "../component/config.json"
import Cookies from 'js-cookie'

function SurveyKepuasan({setOpenRating}) {

    const [rating, setRating] = useState(0)
    const [isLoading, setIsLoading] = useState(false)
    const [survey, setSurvey] = useState(false)

    useEffect(() => {
        const survey = Cookies.get('survey')
        if(!survey){
            setSurvey(true)
        }else{
            const url =  configData.SERVER_API + "rating"
            fetch(url,{
                method:"GET"
            }).then(res=>res.json()).then((res)=>{
                if(res["RTN"]){
                    setRating(res["rating"])
                }
            }).catch(err=>{
                setRating(0)
            })
        }
    }, [])

    const beriRating = () => {
        setIsLoading(true)
        const url =  configData.SERVER_API + "rating"
        fetch(url,{
            method:"PATCH", 
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
            credentials: 'include',
            body:JSON.stringify({
                rating: rating
            })
        }).then(res=>res.json()).then((res)=>{
            setSurvey(true)
            setIsLoading(false)
        }).catch(err=>{
            setIsLoading(false)
        })
    }
    

  return (
    <div className='w-screen h-screen fixed bg-black top-0 left-0 bg-opacity-60 flex justify-center items-center z-50 text-black'>
        <div className='bg-white relative w-3/4 lg:w-1/4 p-5 rounded-md flex flex-col items-center'>
            <AiOutlineClose className='absolute right-4 top-5 w-5 h-6 cursor-pointer text-red-400' onClick={()=>setOpenRating(false)}/>
            <div className='font-bold text-center mb-5'>
                Survey Kepuasan
            </div>
            <div>
                <StarRatings
                    rating={rating}
                    starRatedColor="red"
                    numberOfStars={5}
                    changeRating={(rating)=>setRating(rating)}
                    name='rating'
                    starDimension='30px'
                />
                <div className='flex justify-between w-full font-semibold text-xs mt-2'>
                    <div className='ml-[-18px]'>
                        Tidak Puas
                    </div>
                    <div className='mr-[-18px]'>
                        Sangat Puas
                    </div>
                </div>  
            </div>
           
            {survey &&
                <div 
                className={` p-2 mt-3 w-full rounded-md flex justify-center text-white text-center ${rating !== 0 ? "bg-sky-600 hover:bg-sky-700  cursor-pointer" : "bg-gray-500 "}`}
                onClick={()=>{
                    beriRating()
                }}
                >
                    {isLoading ? <img src={Loading} className="w-5 h-5"/> : "Beri Rating"}
                </div>
            }
            
                
        </div>
        
    </div>
  )
}

export default SurveyKepuasan