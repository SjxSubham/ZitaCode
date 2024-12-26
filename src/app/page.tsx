import { SignedIn, SignedOut, SignInButton, SignOutButton, SignUpButton, UserButton } from "@clerk/nextjs";


export default function Home() {
  return (
    <div>
      <SignInButton>
        <button>
          Sign in
        </button>
      </SignInButton>
    </div>
  );
}
