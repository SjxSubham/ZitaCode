"use client";
import { SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { User } from "lucide-react";

function HeaderProfileBtn() {
  return (
    <>
    <div className="shadow-xl rounded-full ">
    <UserButton >
      <UserButton.MenuItems>
        <UserButton.Link
          label="Profile"
          labelIcon={<User className="size-5" />}
          href="/profile"
        />
      </UserButton.MenuItems>
    </UserButton >
    </div>
    <SignedOut>
      <SignInButton />
    </SignedOut>
  </>
  )
}

export default HeaderProfileBtn