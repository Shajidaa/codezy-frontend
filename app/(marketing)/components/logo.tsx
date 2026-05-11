import Image from 'next/image'
import Link from 'next/link'

export default function Logo() {
  return (
    <Link 
      href="/" 
      className="group flex items-center gap-3 hover:opacity-90 transition-opacity"
    >
      {/* Logo Icon Container */}
      <div className="relative flex items-center justify-center">
        <Image 
          width={40} 
          height={40} 
          src="/logo.jpg" 
          alt="Codezy Logo" 
          className="rounded-lg object-cover border border-brand-gray/20 shadow-sm"
          priority
        />
        {/* Subtle glow effect on hover for a premium feel */}
        <div className="absolute inset-0 bg-brand-gold/10 blur-md opacity-0 group-hover:opacity-100 transition-opacity rounded-lg" />
      </div>

      {/* Text Stack */}
      <div className="flex flex-col leading-none">
        <span className="text-2xl font-black tracking-tighter text-brand-white uppercase italic">
          Codezy<span className="text-brand-gold">.</span>
        </span>
        <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-brand-gray mt-0.5 pl-0.5">
          Academy
        </span>
      </div>
    </Link>
  )
}