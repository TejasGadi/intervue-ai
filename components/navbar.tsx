"use client"
import { useUser } from '@/app/provider'
import React from 'react'

const Navbar = () => {
    const user = useUser().user
  return (
    <div>
      Hi {user?.name}
    </div>
  )
}

export default Navbar
