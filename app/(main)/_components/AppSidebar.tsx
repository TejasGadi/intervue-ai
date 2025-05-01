"use client"
import React from 'react'

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
  } from "@/components/ui/sidebar"
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { SidebarOptions } from '@/services/Constants'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
  

const AppSidebar = () => {

  const path = usePathname()
  const router = useRouter()

  return (
      <Sidebar>
        <SidebarHeader className='flex items-center mt-5'>
          <Image src={'/intervue-ai-logo.png'} alt='App Logo' height={100} width={200} className='w-[200px]'/>
          <Button className='w-full m-5 cursor-pointer' onClick={() => router.push('/dashboard/create-interview')}>
            <Plus/>
            Create New Interview
          </Button>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarMenu>
              {SidebarOptions.map((option, index)=>(
                <SidebarMenuItem key={index} >
                  <SidebarMenuButton asChild className={`p-5 ${path==option.path && 'bg-gray-200'}`}>
                    <Link href={option.path}>
                      <option.icon className={`${path==option.path && 'text-primary'}`}/>
                      <span className={`text-[16px] ${path==option.path && 'text-primary'}`}>
                        {option.name}
                      </span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroup>

        </SidebarContent>
        <SidebarFooter />
      </Sidebar>
    )
}

export default AppSidebar
