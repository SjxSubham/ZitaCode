"use client";
import { SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { User } from "lucide-react";

function HeaderProfileBtn() {
  return (
    <>
    <div className="shadow-xl flex rounded-full ">
    <UserButton 
      appearance={{
        elements: {
          avatarBox: "w-9 h-9", 
              // user Icon width and hight adjustment
        },
      }}
    >
      <UserButton.MenuItems>
        {/* <UserButton.Link
          label="Profile"
          labelIcon={<User className="size-5" />}     // haven't created profile icon yet
          href="/profile"
        /> */}
      </UserButton.MenuItems>
    </UserButton >
    </div>
    <SignedOut>
      <SignInButton>
        <button className="bg-gradient-to-r from-blue-600 to-blue-400  text-white hover:bg-blue-800 rounded-md px-4 py-2">
          Sign In
        </button>
      </SignInButton>
    </SignedOut>
  </>
  )
}

export default HeaderProfileBtn