'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
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
import { ShootingStars  } from "@/components/ui/shooting-star";
import { StarsBackground } from '@/components/ui/stars-background';

const donationItems = [
  { name: 'Rent Due', amount: 50 },
  { name: 'Buy Me Food', amount: 20 },
  { name: 'Buy Me Coffee', amount: 2 },
  { name: 'Support My Project', amount: 100 },
  { name: 'Help with Bills', amount: 30 },
];

export default function ClickHerePage() {
const { setTheme } = useTheme();
  const [sortedItems, setSortedItems] = useState(donationItems);
  const [isLoading, setIsLoading] = useState(false);

  const handleSort = (order: string) => {
    const sorted = [...donationItems].sort((a, b) => {
      return order === 'asc' ? a.amount - b.amount : b.amount - a.amount;
    });
    setSortedItems(sorted);
  };

  const handleDonation = async (amount: number) => {
    setIsLoading(true);
    try {
      // Load Razorpay script
      await loadRazorpayScript();

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: amount * 100,
        currency: "USD",
        name: "Sh*tup",
        description: "Thank you for supporting Sh*tup!",
        handler: function (response: any) {
          toast.success("Thank you for your donation! Your support helps keep Sh*tup running.");
        },
        prefill: {
          name: "",
          email: "",
        },
        theme: {
          color: "#3B82F6",
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error('Payment error:', error);
      toast.error("Payment failed. Something went wrong with the payment. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const loadRazorpayScript = () => {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = resolve;
      script.onerror = reject;
      document.body.appendChild(script);
    });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center  p-4">
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

      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle>Choose a Donation Item</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <Select onValueChange={handleSort} defaultValue="asc">
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Sort by Price" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="asc">Price: Low to High</SelectItem>
                <SelectItem value="desc">Price: High to Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <ul className="space-y-4">
            {sortedItems.map((item) => (
              <li key={item.name} className="flex justify-between items-center">
                <span>{item.name}</span>
                <Button
                  onClick={() => handleDonation(item.amount)}
                  disabled={isLoading}
                  className="bg-blue-500 hover:bg-blue-600 text-white min-w-28"
                >
                  Donate ${item.amount}
                </Button>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
      <footer className="mt-8 text-center text-gray-600 dark:text-gray-400">
        Made by <a href="https://github.com/mafex11" className="underline" target="_blank" rel="noopener noreferrer">@mafex11</a> in a day. &lt;3
      </footer>

      <h1 className='text center flex-col mx-auto mb-6 mt-2 text-gray-500'>
      ©2025, Mafex Inc.
      </h1>
    </div>
  );
}
