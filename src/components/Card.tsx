import React from 'react'
export default function Card({title,value}:{title:string,value:string}){
  return <div className="bg-white p-6 rounded-2xl shadow">
    <h3 className="text-gray-600">{title}</h3>
    <p className="text-3xl font-bold mt-2">{value}</p>
  </div>
}