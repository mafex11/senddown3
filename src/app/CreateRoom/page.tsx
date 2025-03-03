// src/app/components/CreateRoom.tsx
'use client';

import { useState } from 'react';
import axios from 'axios';
import FileRoom from '../../components/FileRoom';

import { NavigationMenuDemo } from '../../components/NavigationMenu';
import { Button } from '../../components/ui/button';
import Link from 'next/link';
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"



export default function CreateRoom() {
  const [roomId, setRoomId] = useState('');
  const [inputRoomId, setInputRoomId] = useState('');

  const createRoom = async () => {
    const response = await axios.post('/api/room/create');
    setRoomId(response.data.roomId);
  };

  const joinRoom = () => {
    setRoomId(inputRoomId);
  };

  return (
    <div className="min-h-screen p-8">
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
      </div>
      {!roomId ? (
        <div className="max-w-md mx-auto space-y-4">
          <h1 className="text-3xl font-bold text-center">
            File Sharing Room
          </h1>
          <button onClick={createRoom} className="btn btn-primary w-full">
            Create New Room
          </button>
          <div className="divider">OR</div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Enter Room ID</span>
            </label>
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputRoomId}
                onChange={(e) => setInputRoomId(e.target.value)}
                className="input input-bordered w-full"
                placeholder="Enter room ID"
              />
              <button onClick={joinRoom} className="btn btn-secondary">
                Join
              </button>
            </div>
          </div>
        </div>
      ) : (
        <FileRoom roomId={roomId} />
      )}
    </div>
  );
}