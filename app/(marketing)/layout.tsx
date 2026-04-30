import { Toaster } from "react-hot-toast";
import Navbar from "./components/Navbar";






export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"

    >
      
      <body className="min-h-full flex flex-col">
         <Toaster position="top-center" /> 
          <Navbar/>
      {children}
      </body>
    </html>
  );
}
