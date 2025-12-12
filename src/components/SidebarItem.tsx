import React from 'react'
export default function SidebarItem({icon,label,open}:{icon:React.ReactNode,label:string,open:boolean}){
  return <div className="flex items-center px-4 py-3 hover:bg-gray-100 rounded-lg mx-2">
    <div className="mr-3">{icon}</div>
    <span className={`transition-all ${open?'opacity-100':'opacity-0 w-0'}`}>{label}</span>
  </div>
}