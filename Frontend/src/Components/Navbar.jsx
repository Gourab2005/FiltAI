import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className="fixed top-9 left-1/2 transform -translate-x-1/2 z-50 w-[95%] md:w-[90%] lg:w-[95%]">
      <nav className="bg-gray-800 bg-opacity-10 backdrop-blur-3xl text-white px-6 py-4 flex justify-between items-center border-b border-b-white border-t border-t-gray-500 rounded-full shadow-3xl transition-all duration-300">
        <div className="text-3xl font-bold mr-[60px]">
          <span>Filt</span><span className="text-teal-400">AI</span>
        </div>

        <ul className="hidden md:flex space-x-6 text-sm">
          <li className="relative group cursor-pointer text-teal-400 underline">Home</li>

          <li className="relative group cursor-pointer">
            <a href="#scroll-element">How It Works</a>
            <span className="absolute left-1/2 bottom-0 w-0 h-[2px] bg-teal-400 transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
          </li>

          <li className="relative group cursor-pointer">
            <a href="#Features">Features</a>
            <span className="absolute left-1/2 bottom-0 w-0 h-[2px] bg-teal-400 transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
          </li>

          <li className="relative group cursor-pointer">
            <a href="#Pricing">Subscribe</a>
            <span className="absolute left-1/2 bottom-0 w-0 h-[2px] bg-teal-400 transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
          </li>
        </ul>

        <div className="flex items-center space-x-4">
          <Link to={"/dashboard"}>
            <button className="text-sm px-4 py-2 border border-teal-400 rounded-full hover:bg-teal-400 hover:text-black transition">
              Log In
            </button>
          </Link>
        </div>
      </nav>
    </div>
  )
}

export default Navbar
