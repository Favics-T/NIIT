import React from 'react'
import Image from 'next/image'

const newsArticles = [
    {
        id: 1,
        title: "Baobab University Doubles Mental Health Support Services",
        description: "The university expands counseling and wellness programs to support student mental health initiatives.",
        image: "/images/NIIT.webp",
        category: "Campus News",
        date: "March 15, 2024"
    },
    {
        id: 2,
        title: "New Research Center Opens for Sustainable Energy Studies",
        description: "A state-of-the-art facility dedicated to renewable energy research and innovation.",
        image: "/images/NIIT.webp",
        category: "Research",
        date: "March 10, 2024"
    },
    {
        id: 3,
        title: "Student Innovation Lab Wins National Competition",
        description: "Baobab students showcase cutting-edge projects in technology and sustainability.",
        image: "/images/NIIT.webp",
        category: "Achievement",
        date: "March 8, 2024"
    }
]

export default function LatestNews() {
    return (
        <section className='w-full py-12 md:py-20 bg-white'>
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                <div className='mb-12'>
                    <h2 className='text-3xl md:text-4xl font-bold text-gray-900'>Campus News</h2>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
                    {newsArticles.map((article) => (
                        <article key={article.id} className='bg-gray-50 rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer'>
                            <div className='relative h-48 w-full'>
                                <Image
                                    src={article.image}
                                    alt={article.title}
                                    fill
                                    className='object-cover'
                                />
                            </div>
                            <div className='p-6'>
                                <div className='flex items-center gap-2 mb-3'>
                                    <span className='inline-block px-3 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full'>
                                        {article.category}
                                    </span>
                                    <span className='text-xs text-gray-500'>{article.date}</span>
                                </div>
                                <h3 className='text-lg font-bold text-gray-900 mb-2 line-clamp-2'>
                                    {article.title}
                                </h3>
                                <p className='text-gray-600 text-sm line-clamp-2'>
                                    {article.description}
                                </p>
                                <button className='mt-4 text-green-600 font-semibold text-sm hover:text-green-700'>
                                    Read More →
                                </button>
                            </div>
                        </article>
                    ))}
                </div>

                <div className='text-center mt-12'>
                    <button className='px-8 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition'>
                        View All News
                    </button>
                </div>
            </div>
        </section>
    )
}
