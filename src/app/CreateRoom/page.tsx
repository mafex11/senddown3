// src/app/createroom/page.tsx
'use client';

import { useState } from 'react';
import axios from 'axios';
import FileRoom from '../../components/FileRoom';
import { NavigationMenuDemo } from '../../components/NavigationMenu';
import { Button } from '../../components/ui/button';
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from 'next/image';

export default function CreateRoom() {
  const [roomId, setRoomId] = useState('');
  const [inputRoomId, setInputRoomId] = useState('');
  const [isHovered, setIsHovered] = useState(false); // Track hover state
  const { setTheme } = useTheme();

  const createRoom = async () => {
    const response = await axios.post('/api/room/create');
    setRoomId(response.data.roomId);
  };

  const joinRoom = () => {
    setRoomId(inputRoomId);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900">
      {/* Navigation Bar */}
      <nav className="fixed top-4 left-0 right-0 w-3/4 mx-auto max-w-4xl z-50 rounded-xl shadow-md p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h1
            className="text-2xl font-bold hidden lg:block cursor-pointer"
            onClick={() => window.location.href = "/"}
          >
            Sh*tup
          </h1>
          <div className="flex items-center space-x-4">
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
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-8 pt-20">
        {!roomId ? (
          <div className="w-full max-w-md space-y-6 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 shadow-lg">
            <h1 className="text-4xl font-bold text-center dark:text-gray-100">
              File Sharing Room
            </h1>
            <div className="relative flex justify-center">
              <h2
                className="scroll-m-20 border-b text-center pb-2 text-md font-semibold tracking-tight text-gray-700 dark:text-gray-300"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                make a private room for your private stuff
              </h2>
              {isHovered && (
                <Image
                  src="/sus.png"
                  alt="Suspicious image"
                  width={100}
                  height={100}
                  className="absolute top-full mt-2 opacity-0 animate-fadeInOut"
                />
              )}
            </div>
            <Button
              onClick={createRoom}
              className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition-colors duration-200"
            >
              Create New Room
            </Button>
            <div className="divider text-gray-500 dark:text-gray-400">OR</div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Enter Room ID
              </label>
              <div className="flex space-x-3">
                <input
                  type="text"
                  value={inputRoomId}
                  onChange={(e) => setInputRoomId(e.target.value)}
                  className="flex-1 px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
                  placeholder="Enter room ID"
                />
                <button
                  onClick={joinRoom}
                  className="px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-lg shadow-md transition-colors duration-200"
                >
                  Join
                </button>
              </div>
            </div>
          </div>
        ) : (
          <FileRoom roomId={roomId} />
        )}
      </main>
    </div>
  );
}