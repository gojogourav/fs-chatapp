import {
    ClerkProvider,
    SignInButton,
    SignedIn,
    SignedOut,
    UserButton
  } from '@clerk/nextjs'

  
export const metadata = {
  title: "Next Social",
  description: "Nextjs social media app",
};


function Header() {
  return (
    <header style={{ display: 'flex', justifyContent: 'space-between', padding: 20 }}>
      <h1>My App</h1>
      <SignedIn>
        {/* Mount the UserButton component */}
        <UserButton />
      </SignedIn>
      <SignedOut>
        {/* Signed out users get sign in button */}
        <SignInButton />
      </SignedOut>
    </header>
  )
}


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (<ClerkProvider>
        <html lang="en">
            <body className="bg-black">
                {children}
            </body>
        </html>
    </ClerkProvider>)
}
