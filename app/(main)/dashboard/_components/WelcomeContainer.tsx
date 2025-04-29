"use client"
import { useUser } from '@/app/provider'
import React from 'react'

const WelcomeContainer = () => {
    const {user} = useUser()
  return (
    <div className='w-full'>
      <div className="bg-white p-5 rounded-2xl">
        <h2 className='text-lg font-bold'>Welcome back, {user?.name}</h2>
        <h2 className='text-gray-500'>AI-Driven Interviews, Hassel-Free Hiring</h2>
      </div>
    </div>
  )
}

export default WelcomeContainer
