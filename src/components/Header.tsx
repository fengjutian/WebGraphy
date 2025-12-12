import React from 'react'
export default function Header(){
  return <header className="flex items-center justify-between">
    <h2 className="text-2xl font-bold text-gray-800">Dashboard Overview</h2>
    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow">New Report</button>
  </header>
}