'use client';

import { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
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

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function DonatePage() {
    const { setTheme } = useTheme();
  const [amount, setAmount] = useState<string>('5');
  const [isLoading, setIsLoading] = useState(false);

  const handleDonation = async () => {
    setIsLoading(true);
    try {
      // Load Razorpay script
      await loadRazorpayScript();
      
      // Create order on your backend
      const response = await fetch('/api/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: parseFloat(amount) * 100, // Convert to smallest currency unit
        }),
      });
      
      const order = await response.json();
      
      if (!order.id) {
        throw new Error('Failed to create order');
      }

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: parseFloat(amount) * 100,
        currency: "USD",
        name: "Sh*tup",
        description: "Thank you for supporting Sh*tup!",
        order_id: order.id,
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
    <div className="min-h-screen flex items-center justify-center p-4">
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
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Support FlowUp</CardTitle>
          <CardDescription>
            Your donation helps keep our servers running and enables us to provide better service.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="amount">Donation Amount (USD)</Label>
              <div className="flex items-center space-x-2">
                <Input
                  id="amount"
                  type="number"
                  min="1"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Enter amount"
                />
                <span className="text-sm text-gray-500 dark:text-gray-400">USD</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {[5, 10, 20, 50, 100].map((preset) => (
                <Button
                  key={preset}
                  variant="outline"
                  size="sm"
                  onClick={() => setAmount(preset.toString())}
                  className={amount === preset.toString() ? 'bg-blue-100 dark:bg-blue-900' : ''}
                >
                  ${preset}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            className="w-full" 
            onClick={handleDonation}
            disabled={isLoading || !amount || parseFloat(amount) <= 0}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              `Donate $${amount}`
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
} 