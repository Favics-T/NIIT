import About from '@/components/home/About';
import Hero from '@/components/home/Hero';
import LatestNews from '@/components/home/LatestNews';
import UpcomingEvents from '@/components/home/UpcomingEvents';
import FeaturedFaculties from '@/components/home/FeaturedFaculties';
import React from 'react'

export default function Home() {
  return (
    <div>
      <Hero />
      <LatestNews />
      <UpcomingEvents />
      <FeaturedFaculties />
      <div className='p-20'>
        <About />
      </div>
    </div>
  )
}
