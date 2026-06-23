import React from 'react'
import Image from 'next/image'

const events = [
    {
        id: 1,
        title: "Annual Tech Conference 2024",
        description: "Join industry leaders and innovators for a day of inspiring talks and networking.",
        date: "April 5, 2024",
        time: "9:00 AM - 5:00 PM",
        location: "Main Auditorium",
        image: "/images/NIIT.webp",
        attendees: "500+"
    },
    {
        id: 2,
        title: "Career Fair & Recruitment Drive",
        description: "Connect with top companies recruiting from Baobab University.",
        date: "April 12, 2024",
        time: "10:00 AM - 4:00 PM",
        location: "Convention Center",
        image: "/images/NIIT.webp",
        attendees: "80+ Companies"
    },
    {
        id: 3,
        title: "Student Research Symposium",
        description: "Showcase student research projects and innovations in various fields.",
        date: "April 20, 2024",
        time: "2:00 PM - 6:00 PM",
        location: "Science Building",
        image: "/images/NIIT.webp",
        attendees: "Unlimited"
    },
    {
        id: 4,
        title: "Graduate Orientation Program",
        description: "Welcome session for new graduate students with campus tours.",
        date: "May 1, 2024",
        time: "8:00 AM - 12:00 PM",
        location: "Student Center",
        image: "/images/NIIT.webp",
        attendees: "300+"
    }
]

export default function UpcomingEvents() {
    return (
        <section className='w-full py-12 md:py-20 bg-gray-50'>
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                <div className='mb-12'>
                    <h2 className='text-3xl md:text-4xl font-bold text-gray-900'>Upcoming Events</h2>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
                    {events.map((event) => (
                        <div key={event.id} className='bg-white rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow'>
                            <div className='md:flex'>
                                <div className='relative h-48 md:h-40 md:w-40 flex-shrink-0'>
                                    <Image
                                        src={event.image}
                                        alt={event.title}
                                        fill
                                        className='object-cover'
                                    />
                                </div>
                                <div className='p-6 flex-1'>
                                    <h3 className='text-lg font-bold text-gray-900 mb-2'>
                                        {event.title}
                                    </h3>
                                    <p className='text-gray-600 text-sm mb-4'>
                                        {event.description}
                                    </p>
                                    <div className='space-y-2 text-sm text-gray-700'>
                                        <p>
                                            <span className='font-semibold'>Date:</span> {event.date}
                                        </p>
                                        <p>
                                            <span className='font-semibold'>Time:</span> {event.time}
                                        </p>
                                        <p>
                                            <span className='font-semibold'>Location:</span> {event.location}
                                        </p>
                                    </div>
                                    <button className='mt-4 px-4 py-2 bg-green-600 text-white text-sm font-semibold rounded hover:bg-green-700 transition'>
                                        Register Now
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className='text-center mt-12'>
                    <button className='px-8 py-3 border-2 border-green-600 text-green-600 font-semibold rounded-lg hover:bg-green-50 transition'>
                        View All Events
                    </button>
                </div>
            </div>
        </section>
    )
}
