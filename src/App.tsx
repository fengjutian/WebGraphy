import React,{useState} from 'react'
import { Menu, X, Home, Layers, Settings, BarChart2 } from 'lucide-react'
import SidebarItem from './components/SidebarItem'
import Header from './components/Header'
import Card from './components/Card'

export default function App(){
  const [open,setOpen]=useState(true)
  return (
    <div className="h-screen w-screen flex bg-gray-50">
      <aside className={`transition-all duration-300 bg-white shadow-md h-full ${open?'w-64':'w-20'}`}>
        <div className="flex items-center justify-between p-4 border-b">
          <h1 className={`font-bold text-xl transition-all ${open?'opacity-100':'opacity-0 w-0'}`}>PageWeaver</h1>
          <button onClick={()=>setOpen(!open)}>{open?<X size={20}/>:<Menu size={20}/>}</button>
        </div>
        <nav className="mt-4">
          <SidebarItem icon={<Home/>} label="Home" open={open}/>
          <SidebarItem icon={<Layers/>} label="Projects" open={open}/>
          <SidebarItem icon={<BarChart2/>} label="Analytics" open={open}/>
          <SidebarItem icon={<Settings/>} label="Settings" open={open}/>
        </nav>
      </aside>
      <main className="flex-1 p-6 overflow-auto">
        <Header/>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <Card title="Users" value="12,450"/>
          <Card title="Sales" value="$87,520"/>
          <Card title="Growth" value="+14.8%"/>
        </div>
      </main>
    </div>
  )
}