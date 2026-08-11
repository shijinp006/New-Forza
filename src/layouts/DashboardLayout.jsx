import Sidebar from '../components/shared/Sidebar'
import Header from '../components/shared/Header'
import { Outlet } from 'react-router'
import { useState } from 'react'

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <div className='w-full h-screen overflow-hidden flex flex-row bg-[#F7F9FB]'>
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />
      <div
        className={`min-w-0 flex-1 h-screen overflow-hidden flex flex-col transition-[margin] duration-300 relative z-30 ${
          sidebarOpen ? "ml-0 lg:ml-64" : "ml-0 lg:ml-20"
        }`}
      >
        <div className="shrink-0 z-40">
          <Header onMobileMenuToggle={() => setMobileOpen(true)} />
        </div>
        <div className="flex-1 min-h-0 overflow-hidden flex flex-col">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default DashboardLayout