import React from 'react'
import { Button } from './ui/button'

const Navbar = () => {
  return (
    <nav>
      <div className='grid grid-cols-3 items-center h-16 px-4 border-b'>
        <div className='flex justify-center font-extrabold text-5xl font-mono text-[#F24423]'><img src='main.png' width={50} height={50} className='-mr-2'/><span className='text-black mr-10 '>ymie</span></div>
        <div className='grid grid-cols-4 gap-5 tracking-widest justify-center'>
          <div className='hover:text-[#F24423] cursor-pointer'>Home</div>
          <div className='hover:text-[#F24423] cursor-pointer'>Memberships</div>
          <div className='ml-10 hover:text-[#F24423] cursor-pointer'>Trainers</div>
          <div className='ml-5 hover:text-[#F24423] cursor-pointer'>About Us</div>
        </div>
        <div className='flex justify-center'>
          <Button variant='outline' className='mr-2 cursor-pointer'>Login</Button>
          <Button className="bg-[#F24423] cursor-pointer">Sign Up</Button>
        </div>
      </div>
      {/* Logo */}
      {/* Navigation Menu */}
      {/* authentication buttons */}
    </nav>
  )
}

export default Navbar
