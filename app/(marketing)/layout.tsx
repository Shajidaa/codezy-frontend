import { Toaster } from "react-hot-toast";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";






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
      <Footer/>
      </body>
    </html>
  );
}
