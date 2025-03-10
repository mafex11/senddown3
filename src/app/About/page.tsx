'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { NavigationMenuDemo } from '../../components/NavigationMenu';
import { Button } from '../../components/ui/button';
import { Moon, Sun, Linkedin, Github } from "lucide-react";
import { useTheme } from "next-themes";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ShootingStars  } from "@/components/ui/shooting-star";
import { StarsBackground } from '@/components/ui/stars-background';

type SpotlightProps = {
  className?: string;
  fill?: string;
};
export default function AboutPage() {
    const { setTheme } = useTheme();

  return (
    <div>
     <ShootingStars />
     <StarsBackground />
        <nav className="fixed top-4 left-0 right-0 w-3/4 mx-auto max-w-4xl z-50 rounded-xl shadow-md p-4 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h1
            className="text-2xl font-bold text-gray-800 dark:text-gray-100 hidden lg:block cursor-pointer"
            onClick={() => window.location.href = "/"}
          >FlowUp</h1>
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
    
    <div className="min-h-screen flex items-center  justify-center p-4 ">
      <Card className="w-full max-w-2xl absolute">
        <CardHeader>
          <CardTitle className="text-2xl">About Sendrn and me</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg  ">
            I'm 20 years old, a third year CSE student, and I made this app because I often found myself needing to share files from my phone to random computers, like those connected to printers. The process was frustrating: I had to open an incognito window, log into web.whatsapp, and wait for it to sync, which could take ages if the network was bad. Then, I had to download the file and print it. It was a hassle to share files across random computers, so I built this app to make the process easier and faster.

          </p>
          <h1 className='text-lg  '>
            although it has some limitations due to free storage api, but it works well for my needs.
          </h1>
          <div className="flex space-x-4 mt-4">
            <a href="https://www.linkedin.com/in/sudhanshu-pandit-17a126240/" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2">
              <Linkedin className="w-5 h-5" />
              <span>LinkedIn</span>
            </a>
            <a href="https://github.com/mafex11/" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2">
              <Github className="w-5 h-5" />
              <span>GitHub</span>
            </a>
          </div>
        </CardContent>
      </Card>
      
    </div>
    
    </div>
  );
}
