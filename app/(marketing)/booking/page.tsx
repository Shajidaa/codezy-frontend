import React from 'react'
import ProfessionalBookingForm from '../components/DemoBookingForm'


export default function bookingPage() {
  return (
    <section className='relative min-h-screen bg-[#FDFDFD] dark:bg-[#1e1b1c] flex items-center justify-center p-4 md:pb-28 md:pt-28 font-sans transition-colors duration-300'>
      {/* Bottom curve SVG */}
        <div className="absolute bottom-0 left-0 
        w-full overflow-hidden leading-[0]">
          <svg className="relative block w-full h-[150px] md:h-[80px]" xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none">
            <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" className="fill-[#EEB30D] opacity-20"></path>
          </svg>
        </div><ProfessionalBookingForm /></section>
  )
}
