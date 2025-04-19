import React from 'react'

const Navbar = () => {
  return (
    <div>
    <nav className="bg-gray-900 text-white px-6 py-4 flex justify-between items-center border border-gray-800">
      <div className="text-3xl font-bold mr-[60px]"><span className="">Filt</span><span className="text-teal-400">AI</span></div>

      <ul className="hidden md:flex space-x-6 text-sm">
        <li className="relative group cursor-pointer text-teal-400 underline">Home</li>
        
        <li className="relative group cursor-pointer"><a href="#scroll-element">How It Works</a><span className="absolute left-1/2 bottom-0 w-0 h-[2px] bg-teal-400 transition-all duration-300 group-hover:w-full group-hover:left-0"></span></li>
        
        <li className="relative group cursor-pointer"><a href="#Features">Features</a><span className="absolute left-1/2 bottom-0 w-0 h-[2px] bg-teal-400 transition-all duration-300 group-hover:w-full group-hover:left-0"></span></li>
        
        <li className="relative group cursor-pointer"><a href="#Pricing">Subscribe</a><span className="absolute left-1/2 bottom-0 w-0 h-[2px] bg-teal-400 transition-all duration-300 group-hover:w-full group-hover:left-0"></span></li>
      </ul>

      <div className="flex items-center space-x-4">
        <button className="text-sm px-4 py-2 border border-teal-400 rounded-md hover:bg-teal-400 hover:text-black transition">
          Log In
        </button>
        <button className="text-sm px-4 py-2 bg-teal-400 text-black rounded-md hover:bg-teal-500 transition">
          Sign Up
        </button>
      </div>
    </nav>
    </div>
  )
}

export default Navbar

