import React from 'react'
import Image from 'next/image'

const leadership = [
  {
    id: 1,
    name: 'Prof. A. K. Mensah',
    title: 'Vice Chancellor',
    bio: 'An academic leader with 25+ years of experience in higher education and research.',
    image: '/images/NIIT.webp'
  },
  {
    id: 2,
    name: 'Dr. Y. N. Opoku',
    title: 'Dean, School of Engineering',
    bio: 'Leads engineering programmes focused on AI, software engineering and systems design.',
    image: '/images/NIIT.webp'
  },
  {
    id: 3,
    name: 'Prof. L. D. Boateng',
    title: 'Dean, Faculty of Business',
    bio: 'Drives industry partnerships and practical learning for business students.',
    image: '/images/NIIT.webp'
  }
]

export default function About() {
  return (
    <section className='bg-white text-gray-900'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-12'>
          {/* History */}
          <div className='col-span-2'>
            <h2 className='text-4xl font-bold mb-4'>About Baobab University</h2>
            <p className='text-gray-700 mb-6'>
              Our story began in 1981 with a small group of educators who believed in
              accessible, high-quality education. Since then, Baobab University has
              grown into a vibrant academic community, combining strong research,
              industry partnerships, and student-centered learning.
            </p>

            <div className='mb-8'>
              <h3 className='text-2xl font-semibold mb-2'>History</h3>
              <p className='text-gray-700'>
                Over four decades, we have continually expanded our programs and
                facilities to meet the evolving needs of students and employers.
                Milestones include the establishment of new research centers,
                international collaborations, and the launch of applied degree
                programs across technology, business and health sciences.
              </p>
            </div>

            <div>
              <h3 className='text-2xl font-semibold mb-2'>Vision &amp; Mission</h3>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <div className='p-6 border rounded-lg'>
                  <h4 className='font-bold mb-2'>Vision</h4>
                  <p className='text-gray-700'>
                    To be a leading university that transforms society through
                    innovative education, research and community engagement.
                  </p>
                </div>

                <div className='p-6 border rounded-lg'>
                  <h4 className='font-bold mb-2'>Mission</h4>
                  <ul className='list-disc list-inside text-gray-700 space-y-2'>
                    <li>Deliver industry-relevant, research-led teaching.</li>
                    <li>Foster critical thinking, creativity and ethical leadership.</li>
                    <li>Advance knowledge through interdisciplinary research.</li>
                    <li>Engage with communities and partners for sustainable impact.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Leadership */}
          <aside className='space-y-6'>
            <h3 className='text-2xl font-semibold'>Leadership</h3>
            <div className='space-y-4'>
              {leadership.map((person) => (
                <div key={person.id} className='flex items-start gap-4 bg-gray-50 p-4 rounded-lg'>
                  <div className='w-20 h-20 relative rounded-full overflow-hidden flex-shrink-0'>
                    <Image src={person.image} alt={person.name} fill className='object-cover' />
                  </div>
                  <div>
                    <div className='font-semibold'>{person.name}</div>
                    <div className='text-sm text-green-600'>{person.title}</div>
                    <p className='text-sm text-gray-700 mt-2'>{person.bio}</p>
                  </div>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}
