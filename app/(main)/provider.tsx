import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import React from 'react'
import AppSidebar from './_components/AppSidebar'
import WelcomeContainer from './dashboard/_components/WelcomeContainer'

const DashboardProvider = ({children}: any) => {
  return (
    <SidebarProvider>
        <AppSidebar/>
        <div className='w-full bg-gray-100'>
            <SidebarTrigger className='cursor-pointer p-2 bg-gray-200 ml-5 mt-5'/>
            <WelcomeContainer/>        
            {children}
        </div>
    </SidebarProvider>
  )
}

export default DashboardProvider 
