import React from 'react'
import {navLinks} from '@/constants/Navlink'

export default function Nav() {
  return (
    <div className='py-6 flex justify-center items-center cursor-pointer shadow hover:bg-black/40 '>
        <ul 
         className='flex gap-4'>
            {navLinks.map(({name})=>(
                <ul key={name}>
                    <li className='hover:bg-white text-xl hover:text-black'>{name}</li>
                    </ul>
            )
        
        )}
        </ul>

      
    </div>
  )
}
