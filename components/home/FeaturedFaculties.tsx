import React from 'react'
import Image from 'next/image'

const faculties = [
    {
        id: 1,
        name: "School of Engineering",
        description: "State-of-the-art programs in software engineering, civil engineering, and AI/ML.",
        icon: "🏗️",
        students: "2,500+",
        programs: "15+"
    },
    {
        id: 2,
        name: "Faculty of Business",
        description: "Leading MBA and business administration programs with industry partnerships.",
        icon: "💼",
        students: "1,800+",
        programs: "12+"
    },
    {
        id: 3,
        name: "School of Health Sciences",
        description: "Comprehensive health, nursing, and medical research programs.",
        icon: "⚕️",
        students: "900+",
        programs: "8+"
    },
    {
        id: 4,
        name: "Department of Humanities",
        description: "Excellence in arts, literature, history, and cultural studies.",
        icon: "📚",
        students: "1,200+",
        programs: "10+"
    },
    {
        id: 5,
        name: "School of Environmental Studies",
        description: "Research and education in sustainability and environmental science.",
        icon: "🌱",
        students: "600+",
        programs: "7+"
    },
    {
        id: 6,
        name: "School of Data Science",
        description: "Cutting-edge programs in data science, analytics, and artificial intelligence.",
        icon: "📊",
        students: "1,100+",
        programs: "9+"
    }
]

export default function FeaturedFaculties() {
    return (
        <section className='w-full py-12 md:py-20 bg-white'>
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                <div className='mb-12'>
                    <h2 className='text-3xl md:text-4xl font-bold text-gray-900'>Featured Faculties & Departments</h2>
                    <p className='text-gray-600 mt-2'>Explore our diverse academic programs and departments</p>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
                    {faculties.map((faculty) => (
                        <div 
                            key={faculty.id}
                            className='bg-gradient-to-br from-green-50 to-blue-50 rounded-lg p-8 border border-green-100 hover:shadow-lg transition-shadow cursor-pointer'
                        >
                            <div className='text-4xl mb-4'>{faculty.icon}</div>
                            <h3 className='text-xl font-bold text-gray-900 mb-3'>
                                {faculty.name}
                            </h3>
                            <p className='text-gray-700 mb-6 text-sm leading-relaxed'>
                                {faculty.description}
                            </p>
                            <div className='space-y-2 mb-6 text-sm'>
                                <div className='flex justify-between'>
                                    <span className='text-gray-600'>Students:</span>
                                    <span className='font-semibold text-green-600'>{faculty.students}</span>
                                </div>
                                <div className='flex justify-between'>
                                    <span className='text-gray-600'>Programs:</span>
                                    <span className='font-semibold text-green-600'>{faculty.programs}</span>
                                </div>
                            </div>
                            <button className='w-full px-4 py-2 bg-green-600 text-white font-semibold rounded hover:bg-green-700 transition'>
                                Learn More
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
