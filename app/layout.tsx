"use client";

import {  Poppins } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
  import { ToastContainer } from 'react-toastify';
import WhatsAppWidget from "./(marketing)/components/WhatsAppWidget";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  
});




export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col"><SessionProvider>
          {children}
          <WhatsAppWidget />
           <ToastContainer />
        </SessionProvider>
       
        </body>
    </html>
  );
}
