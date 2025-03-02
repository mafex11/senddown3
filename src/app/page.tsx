// src/app/page.tsx
'use client';

import { NavigationMenuDemo } from '../components/NavigationMenu';
import { Button } from '../components/ui/button';
import Link from 'next/link';
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


export default function Home() {

  const { setTheme } = useTheme()

  return (
    <div className="min-h-screen flex flex-col">
      
      {/* Navigation Bar */}
      <nav className="fixed  top-4 left-0 right-0 w-3/4 mx-auto max-w-7xl z-50 rounded-xl  shadow-md p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-bold hidden lg:block ">SendDown</h1>
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
      <main className="flex-1 flex flex-col items-center justify-center p-8 pt-20"> {/* pt-20 to offset nav bar height */}
        <h1 className="text-6xl font-bold mb-6 text-center">Welcome to SendDown</h1>
        <blockquote className="border-l-2 pl-6 italic mb-8 text-xl text-center max-w-xl">
          Share files easily with others by creating or joining a room!
        </blockquote>
        
        <Button href="/CreateRoom">Get Started</Button>
       
        
      </main>
    </div>
  );
}