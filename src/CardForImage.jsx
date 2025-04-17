import React, { useEffect, useState } from "react";
import { RiFullscreenLine, RiFullscreenExitFill } from "react-icons/ri";

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
  const handleFullScr=()=>{
    const image = document.getElementById(imageUrl);
      image.requestFullscreen();
  }
  return (
    <div className="p-4 w-full mt-5">
      <div className="h-full border-2 border-gray-800 rounded-lg overflow-hidden">
        {isImage && (
          <div className="w-full flex justify-end">
            <RiFullscreenLine onClick={handleFullScr} className="w-7 h-7 absolute m-2 hover:cursor-pointer"/>
            </div>
        )}
{isImage?(<img
          id={`${imageUrl}`}
          className="md:h-lvh w-full object-cover object-center transition-opacity duration-500 opacity-100 aspect-video"
          src={url}
          alt="blog"
        />):(mediaType!=="other"?
          <iframe
          className="md:h-lvh w-full object-cover object-center transition-opacity duration-500 opacity-100 aspect-video"
          src={imageUrl}
          title="YouTube video player"
          allow="autoplay; encrypted-media"
          allowFullScreen
        />
        :<div className="md:h-dvh my-9 w-full flex justify-center items-center md:text-5xl text-3xl">
          <p className="text-center">No Preview Available</p></div>)}
        <div className="p-6">
          <h2 className="tracking-widest text-right underline text-xs title-font font-medium text-white mb-1">{date}</h2>
          <h1 className="title-font text-lg font-medium text-white mb-3">{title}</h1>
          <p className="leading-relaxed mb-3">
            {desc}{!showFull && <button className="text-blue-600 hover:cursor-pointer" onClick={()=>{canShowFull(prev=>!prev)}}>Show More</button>}
          </p>
        </div>
      </div>
    </div>
  );
}
