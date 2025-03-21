import React, { useEffect, useState } from "react";
import { IoCodeDownload } from "react-icons/io5";

export default function CardForImage({ imageUrl, hdimageUrl, title, description ,date }) {
  const [url, setUrl] = useState(imageUrl);
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
        <img
          className="md:h-lvh w-full object-cover object-center transition-opacity duration-500 opacity-100 aspect-video"
          src={url}
          alt="blog"
        />
        <div className="p-6">
          <h2 className="tracking-widest text-xs title-font font-medium text-gray-500 mb-1"></h2>
          <h1 className="title-font text-lg font-medium text-white mb-3">{title}</h1>
          <p className="leading-relaxed mb-3">
            {`${description}`.split(".").slice(0, 4).join(".")}.
          </p>
        </div>
      </div>
    </div>
  );
}
