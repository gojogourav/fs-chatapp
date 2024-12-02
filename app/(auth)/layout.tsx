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
