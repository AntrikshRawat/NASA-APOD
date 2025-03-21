import React from 'react'

function Layoat() {
 return (
  <div className="p-4 h-lvh w-full pt-3 animate-pulse">
  <div className="h-full border-2 border-gray-800 rounded-lg overflow-hidden">
    <div className="h-lvh w-full bg-gray-700"></div>
    <div className="p-6">
      <div className="h-4 bg-gray-700 rounded w-1/4 mb-2"></div>
      <div className="h-6 bg-gray-700 rounded w-3/4 mb-3"></div>
      <div className="h-4 bg-gray-700 rounded w-full mb-3"></div>
      <div className="h-4 bg-gray-700 rounded w-5/6 mb-3"></div>
      <div className="flex items-center flex-wrap">
        <div className="h-4 bg-gray-700 rounded w-1/3"></div>
        <div className="h-4 bg-gray-700 rounded w-6 ml-auto"></div>
      </div>
    </div>
  </div>
</div>
 )
}

export default function Loader() {
  return (
<section className="text-gray-400 bg-gray-900 body-font">
  <div className="container px-5 mx-auto">
    <div className="flex flex-wrap"> 
     <Layoat/>
     <Layoat/>
     <Layoat/>
     <Layoat/>
     <Layoat/>
     <Layoat/>
    </div>
  </div>
</section>
  )
}
