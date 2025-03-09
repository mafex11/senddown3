// src/app/page.tsx
'use client';

import { NavigationMenuDemo } from '../components/NavigationMenu';
import { Button } from '../components/ui/button';
import Link from 'next/link';
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { BackgroundLines } from "@/components/ui/background-lines";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Home() {
  const { setTheme } = useTheme();

  return (
    <div className="min-h-screen flex flex-col">
      <BackgroundLines className="absolute inset-0 -z-10 opacity-20">
        <></>
      </BackgroundLines>
      {/* Navigation Bar */}
      <nav className="fixed top-4 left-0 right-0 w-3/4 mx-auto max-w-4xl z-50 rounded-xl shadow-md p-4 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h1
            className="text-2xl font-bold text-gray-800 dark:text-gray-100 hidden lg:block cursor-pointer"
            onClick={() => window.location.href = "/"}
          >Flowsup</h1>
          <NavigationMenuDemo />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTheme("light")}>
                Light
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>
                Dark
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("system")}>
                System
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center p-8 pt-20">
        <h1 className="text-6xl font-bold mb-6 text-center">
          <span className="italic font-bold">*NOT*</span> welcome to Flowsup
        </h1>
        <blockquote className="border-l-2 pl-6 italic mb-8 text-xl text-center max-w-xl">
          i know you want to share files to the computer but it's a long process, but don't worry.
        </blockquote>
      
        <blockquote className="border-l-2 pl-6 italic mb-8 text-xl text-center max-w-xl">
          Use this and thank me later 
        </blockquote>
        <Link href="/CreateRoom">
          <Button>Get Started</Button>
        </Link>
      </main>

      <footer className="mt-8 text-center text-gray-600 dark:text-gray-400">
        Made by <a href="https://github.com/mafex11" className="underline" target="_blank" rel="noopener noreferrer">@mafex11</a> in a day. &lt;3
      </footer>

      <h1 className='text center flex-col mx-auto mb-6 mt-2 text-gray-500'>
      ©2025, Mafex Inc.
      </h1>
    </div>
  );
}