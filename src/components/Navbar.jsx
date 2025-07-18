import React from 'react'

const Navbar = () => {
  return (
    <div>
      <nav className='md:h-15  w-full items-center flex bg-emerald-200 justify-around p-3'>
        <div className="logo mx-6 font-bold">
            Online-TODO
        </div>
        <ul className='flex gap-2 mx-6 hover:cursor-pointer'>
            <li className='hover:cursor-pointer hover:scale-110 '>By</li>
            <li className='hover:cursor-pointer hover:scale-110 '>TanishR</li>
            
        </ul>
      </nav>
    </div>
  )
}

export default Navbar
