"use client";

import {  Poppins } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import WhatsAppWidget from "./(marketing)/components/WhatsAppWidget";
import { Toaster } from "react-hot-toast";
import { ToastContainer } from "react-toastify";

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
               <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </SessionProvider>
       
        </body>
    </html>
  );
}
