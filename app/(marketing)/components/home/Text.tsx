"use client";


import dynamic from 'next/dynamic';

const Typewriter = dynamic(() => import('typewriter-effect'), { ssr: false });

export default function Text() {
  return (
    <div className="flex  mt-4 mb-4 items-center justify-center font-mono text-xl font-bold md:text-3xl">
      <Typewriter
        options={{
          strings: [
            'Write Code, Save the World.',
            'Build the Future, One Line at a Time.',
            'Unleash Your Inner Creator.',
          ],
          autoStart: true,
          loop: true,
          wrapperClassName: "text-brand-gold",
          cursorClassName: "text-brand-white animate-pulse"
        }}
      />
    </div>
  );
}