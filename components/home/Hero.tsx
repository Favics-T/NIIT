import React from 'react'
import Image from "next/image";
import Nav from '../layout/Nav';
import HeroComponents from './HeroComponents';

export default function Hero() {
  return (
    <div className="relative h-screen w-full">
      <Image
        src="/images/NIIT.webp"
        alt="Hero"
        fill
        priority
        className="object-cover"
      />

      <div className="absolute inset-0 bg-black/30">
        <Nav />
        <HeroComponents />
      </div>
    </div>
  )
}