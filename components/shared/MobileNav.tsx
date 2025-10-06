'use client'
import React from 'react'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import Link from 'next/link'
import Image from 'next/image'
import { SignedIn, UserButton, SignedOut } from '@clerk/nextjs'
import { navLinks } from '@/constants' // if you already have this constant
import { Button } from "@/components/ui/button"
const MobileNav = () => {
  return (
    // Header container
    <header className="flex justify-between items-center fixed top-0 left-0 z-50 h-16 w-full border-b border-purple-100 bg-white px-5 lg:hidden">
      
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2">
        <Image 
          src="/assets/images/logo-text.svg"
          alt="logo"
          width={150}
          height={24}
        />
      </Link>

      {/* Right side: User + Menu */}
      <nav className="flex items-center gap-3">
        <SignedIn>
          {/* User avatar */}
          <UserButton afterSignOutUrl="/" />

          {/* Hamburger menu (Sheet) */}
          <Sheet>
            <SheetTrigger>
              <Image 
                src="/assets/icons/menu.svg"
                alt="menu"
                width={28}
                height={28}
                className="cursor-pointer"
              />
            </SheetTrigger>

            {/* Slide-out content */}
            <SheetContent side="right" className="w-[260px] bg-white p-6">
            <SheetHeader>

              <SheetTitle>
                <Link href="/" className="flex items-center gap-2">
                  <Image 
                    src="/assets/images/logo-text.svg"
                    alt="logo"
                    width={130}
                    height={20}
                  />
                </Link>
              </SheetTitle>
              <SheetDescription>
                Navigate through your account and pages.
              </SheetDescription>
            </SheetHeader>

              <div className="flex flex-col gap-6">
                <ul className="flex flex-col gap-3">
                  {navLinks?.map((link) => (
                    <li key={link.route}>
                      <Link
                        href={link.route}
                        className="block rounded-md px-3 py-2 text-gray-700 font-medium hover:bg-purple-50 hover:text-purple-700 transition"
                      >
                   
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </SheetContent>
          </Sheet>
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
    </header>
  )
}

export default MobileNav
