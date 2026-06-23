"use client";

import React from 'react'
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay'

const slides = [
    {
        title: 'Welcome to Baobab University.',
        desc: 'Fostering Education Excellence By Empowering Minds'
    },
    {
        title: 'Boost Programming Language with Efficiency',
        desc: 'Embracing coding cultivates an expansive career outlook, fostering adaptability amid the constant evolution of the digital sphere.'
    },
    {
        title: "Bag Your Diploma In any Course that Picks Your Interest",
        desc: 'Diploma degrees have fewer courses than degree courses, enabling working students to pursue part time studies.'
    }
]

export default function HeroComponents() {
    const autoplay = React.useMemo(
        () => Autoplay({ delay: 5000, stopOnInteraction: false }),
        []
    );

    const [emblaRef] = useEmblaCarousel(
        { loop: true },
        [autoplay]
    );

    return (
        <section className='relative w-full h-screen overflow-hidden flex items-center justify-center'>
            <div ref={emblaRef} className='w-full overflow-hidden'>
                <div className='flex w-full h-screen'>
                    {slides.map((slide, index) => (
                        <div key={index} className='min-w-full flex-shrink-0 h-screen flex flex-col items-center justify-center px-6 text-center'>
                            <h1 className='text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6 max-w-4xl'>
                                {slide.title}
                            </h1>
                            <p className='text-lg md:text-2xl text-gray-100 max-w-3xl mb-10'>
                                {slide.desc}
                            </p>
                            <button className='px-8 py-3 bg-white text-gray-900 font-semibold rounded-full hover:bg-gray-100 transition flex items-center gap-2'>
                                <span className='text-xl'>▶</span> Watch Video
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Carousel Indicators */}
            <div className='absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-3'>
                {slides.map((_, index) => (
                    <div
                        key={index}
                        className={`h-2 rounded-full transition ${
                            index === 0 ? 'w-8 bg-white' : 'w-2 bg-white/50'
                        }`}
                    />
                ))}
            </div>
        </section>
    )
}
