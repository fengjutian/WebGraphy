import React, { useState } from 'react'
import { Menu, X, Home, Layers, Settings, BarChart2 } from 'lucide-react'
import SidebarItem from './components/SidebarItem'
import Header from './components/Header'
import Card from './components/Card'
import { api } from './service/api'

export default function App() {
  const [open, setOpen] = useState(true)
  const [url, setUrl] = useState('')
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // 调用后端接口的函数
  const handleScrape = async () => {
    setLoading(true)
    setError('')
    setResult(null)

    try {
      // 调用后端API接口
      const data = await api.scrape.extractPageStructure(url)
      setResult(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

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

        {/* 添加网页抓取功能演示 */}
        <div className="mt-12 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-6">Web Scraper Demo</h2>
          
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <input 
              type="text" 
              placeholder="Enter URL (e.g., https://example.com)" 
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button 
              onClick={handleScrape}
              disabled={loading}
              className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              {loading ? 'Scraping...' : 'Scrape Page'}
            </button>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-6">
              {error}
            </div>
          )}

          {result && (
            <div className="mt-6">
              <h3 className="text-xl font-semibold mb-4">Scraping Results for {result.url}</h3>
              <div className="bg-gray-50 p-4 rounded-md max-h-96 overflow-y-auto">
                <pre className="text-sm">{JSON.stringify(result.structure, null, 2)}</pre>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}