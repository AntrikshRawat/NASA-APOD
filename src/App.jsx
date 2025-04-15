import React, { useEffect, useState } from 'react'
import CardForImage from './CardForImage'
import Loader from './Loader';
import axios from 'axios';
import { LuArrowDownUp } from "react-icons/lu";

export default function App() {
  const[Data,setData] = useState([]);
  const[loading,setLoading]= useState(true);
  const[error,setError] = useState(false);
  const[arrange,setArrange] = useState(true);
  const today = new Date().toISOString().split("T")[0];
  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(today);
  const api = import.meta.env.VITE_API_KEY;
  function setDate(days){
    let currentDate = new Date();
    currentDate.setDate(currentDate.getDate() - days);
    currentDate = currentDate.toISOString().split("T")[0];
    setStartDate(currentDate);
  }
  useEffect(()=>{
    async function getImages() {
      try{
        setError(false);
        setLoading(true);
        const {data} = await axios.get(`https://api.nasa.gov/planetary/apod?api_key=${api}&start_date=${startDate}&end_date=${endDate}`);
      setData(arrange?data:data.reverse());
    }catch(e){
      setError(true);
      console.log(e);
    }finally{
      setLoading(false);
    }
    }
    getImages();
  },[startDate,endDate,arrange,api])
  return (
    <div className='min-h-lvh text-gray-400 bg-gray-900 body-font'>
      <h1 className='text-3xl text-center p-4 text-white'>NASA -  Astronomy Picture of the Day</h1>
      <div className="p-6 w-full bg-gray-900 text-white rounded-lg shadow-md mx-auto">
      <h2 className="text-lg font-semibold mb-4">Select Date Range</h2>
      <div className="space-y-4 md:flex  flex-none">
        {/* Start Date Input */}
        <div className='w-full md:w-1/2 mx-1'>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Start Date
          </label>
          <input
            type="date"
            value={startDate}
            max={today}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full p-2 border border-gray-700 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* End Date Input */}
        <div className='w-full md:w-1/2 mx-1'>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            End Date
          </label>
          <input
            type="date"
            value={endDate}
            max={today}
            min={startDate}
            disabled = {startDate?false:true}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-full p-2 border border-gray-700 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
      <span className='p-2 space-x-3 flex flex-wrap'>
      <button className='bg-gray-600 mt-5 p-2 rounded-md hover:bg-gray-700 active:scale-105 transition-transform' onClick={()=>{window.location.reload()}}>APOT</button>
        <button className='bg-gray-600 mt-5 p-2 rounded-md hover:bg-gray-700 active:scale-105 transition-transform' onClick={()=>{setDate(10)}}>Last 10 Days</button>
        <button className='bg-gray-600 mt-5 p-2 rounded-md hover:bg-gray-700 active:scale-105 transition-transform' onClick={()=>{setDate(15)}}>Last 15 Days</button>
        <button className='bg-gray-600 mt-5 p-2 rounded-md hover:bg-gray-700 active:scale-105 transition-transform' onClick={()=>{setDate(30)}}>Last 30 Days</button>
      </span>
      <p className='flex items-center my-2'>Arrange By Date <LuArrowDownUp onClick={()=>{setArrange(!arrange)}} className='mx-2'/></p> 
    </div>
      {error && <h1 className='text-xl text-center'>Some Error Found</h1>}
      {loading && <Loader/>}
      <div className="container px-5 mx-auto">
    <div className="flex flex-wrap -m-4"> 
    {!loading && Data.map((item)=>(
        <CardForImage
        key= {Math.random()}
        date={item.date}
        imageUrl = {item.url}
        hdimageUrl={item.hdurl}
        mediaType={item.media_type}
        title= {item.title}
        description = {item.explanation}
        />
      ))}
    </div>
  </div>
    </div>
  )
}
