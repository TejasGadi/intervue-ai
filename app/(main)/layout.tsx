import React from 'react'
import DashboardProvider from './provider'


const DashboardLayout = ({children}: any) => {
  return (
    <div>
        <DashboardProvider>
            <div className="p-10">
                {children}
            </div>
        </DashboardProvider>
    </div>
  )
}

export default DashboardLayout
