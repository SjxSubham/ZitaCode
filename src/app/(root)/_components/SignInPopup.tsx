"use client";

import { useState, useEffect } from "react";
import { SignedOut, SignInButton } from "@clerk/nextjs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Code2, X } from "lucide-react";

function SignInPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    // Check if popup has been shown before
    const popupShown = localStorage.getItem("zitacode-signin-popup-shown");
    
    if (!popupShown && !hasShown) {
      // Show popup after a brief delay to allow page to load
      const timer = setTimeout(() => {
        setIsOpen(true);
        setHasShown(true);
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [hasShown]);

  const handleClose = () => {
    setIsOpen(false);
    // Mark popup as shown so it doesn't appear again in this session
    localStorage.setItem("zitacode-signin-popup-shown", "true");
  };

  const handleRemindLater = () => {
    setIsOpen(false);
    // Don't set localStorage so it can show again in future sessions
  };

  return (
    <SignedOut>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-md bg-gradient-to-br from-gray-900 to-gray-950 border-gray-700">
          <DialogHeader className="text-center space-y-3">
{/*             <div className="mx-auto w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center"> */}
              <div className="size-8 text-blue-400 transform dark:-rotate-2 group-hover:rotate-0 transition-transform duration-500" >
                  <img
                src="/Image...webp"
                alt="ZitaCode"
                className='rounded-md animate-pulse '
                
              />
              </div>
{/*             </div> */}
            <DialogTitle className="text-2xl font-bold text-white">
              Welcome to ZitaCode!
            </DialogTitle>
            <DialogDescription className="text-gray-300 text-base">
              Sign in to unlock the full power of our code editor. Get access to advanced features, save your projects, and join our community of developers.
            </DialogDescription>
          </DialogHeader>
          
          <div className="flex flex-col gap-3 mt-6">
            <SignInButton mode="modal">
              <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 rounded-lg transition-all duration-200">
                Sign In to Get Started
              </Button>
            </SignInButton>
            
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                onClick={handleRemindLater}
                className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white"
              >
                Maybe Later
              </Button>
              <Button 
                variant="outline" 
                onClick={handleClose}
                className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white"
              >
                Don&apos;t Show Again
              </Button>
            </div>
          </div>
          
          <button
            onClick={handleClose}
            className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-gray-400 hover:text-white"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </button>
        </DialogContent>
      </Dialog>
    </SignedOut>
  );
}

export default SignInPopup;
