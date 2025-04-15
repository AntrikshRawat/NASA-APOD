import React, { useEffect, useState } from "react";

export default function CardForImage({ imageUrl, hdimageUrl,mediaType, title, description ,date }) {
  const [url, setUrl] = useState(imageUrl);
  const [desc,setDesc] = useState(`${description}`);
  const[isImage,setIsImage] = useState(false);
  const[showFull,canShowFull] = useState(false);
  useEffect(()=>{
    if(mediaType === "image") setIsImage(true);
    else setIsImage(false);
  },[mediaType])
  useEffect(()=>{
    if(desc.length >500 && !showFull) {
       setDesc(prev=>(prev.slice(0,500) + '...'));
    }else{
      setDesc(description);
    }
  },[desc,showFull,description])
  useEffect(() => {
    let isMounted = true;
    const HDimage = new Image();
    HDimage.src = hdimageUrl;
    HDimage.onload = () => {
      if (isMounted) setUrl(hdimageUrl);
    };
    return () => {
      isMounted = false;
    };
  }, [hdimageUrl]);
  return (
    <div className="p-4 w-full mt-5">
      <div className="absolute right-6 -mt-3 bg-[#72383d] text-[#efe9e1] w-28 rounded-sm text-center font-bold">{date}</div>
      <div className="h-full border-2 border-gray-800 rounded-lg overflow-hidden">
{isImage?(<img
          className="md:h-lvh w-full object-cover object-center transition-opacity duration-500 opacity-100 aspect-video"
          src={url}
          alt="blog"
        />):(mediaType!=="other"?
        <iframe
  className="md:h-lvh w-full object-cover object-center transition-opacity duration-500 opacity-100 aspect-video"
  src={imageUrl}
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
/>:<div className="md:h-lvh my-9 w-full flex justify-center items-center md:text-5xl text-3xl">No Preview Available</div>)}
        <div className="p-6">
          <h2 className="tracking-widest text-xs title-font font-medium text-gray-500 mb-1"></h2>
          <h1 className="title-font text-lg font-medium text-white mb-3">{title}</h1>
          <p className="leading-relaxed mb-3">
            {desc}{!showFull && <button className="text-blue-600 hover:cursor-pointer" onClick={()=>{canShowFull(prev=>!prev)}}>Show More</button>}
          </p>
        </div>
      </div>
    </div>
  );
}
