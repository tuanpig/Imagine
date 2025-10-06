'use client'
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import { usePathname } from "next/navigation"
import { navLinks } from '@/constants'
import { Button } from "@/components/ui/button"
const Sidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="hidden h-screen w-72 bg-white p-5 shadow-md shadow-purple-200/50 lg:flex">
      <div className="flex size-full flex-col gap-4">
        <Link href="/" className="flex items-center gap-2 md:py-2">
          <Image src="/assets/images/logo-text.svg" alt="logo" width={180} height={28}/>
        </Link>
        <nav className="h-full flex-col justify-between md:flex md:gap-4">
          <SignedIn>
            <ul className="hidden w-full flex-col items-start gap-2 md:flex">
              {navLinks.map((link) => {
                const isActive = link.route === pathname

                return (
                  <li
                    key={link.route}
                    className={`flex items-center justify-center p-16-semibold w-full 
                      whitespace-nowrap rounded-full bg-cover 
                      transition-all hover:bg-purple-100 hover:shadow-inner group 
                      ${isActive 
                                ? 'bg-purple-100 text-purple-700 font-semibold shadow-sm' 
                                : 'text-gray-600 hover:bg-purple-50 hover:text-purple-700'}
                              `}
                  >
                    <Link className="p-16-semibold flex size-full gap-4 p-4" href={link.route}>
                      <Image 
                      src={link.icon}
                      alt="logo"
                      width={24}
                      height={24}
                      className={`${isActive && 'brightness-200'}`}
                      />
                      {link.label}
                    </Link>
                  </li>
                )
              })}
              <li className="flex justify-center items-center cursor-pointer gap-2 p-4">
                <UserButton afterSignOutUrl='/' showName/>
              </li>
            </ul>
          </SignedIn>
          <SignedOut>
          <Button
            asChild
            className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-semibold rounded-xl px-6 py-2 transition-all hover:shadow-lg hover:scale-105"
          >
            <Link href="/sign-in">Login</Link>
          </Button>
          </SignedOut>
        </nav>
      </div>
    </aside>
  )
}

export default Sidebar