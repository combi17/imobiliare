import React from 'react'
import logo from '../assets/logo_east8.png';

const Header = () => {
  return (
    <>
    <header className="bg-gray-700 shadow-md">
        <div className="container mx-auto flex items-center justify-between py-4 px-6">
            <img src={logo} alt="east8" className='h-16' />
            <nav className="hidden md:flex space-x-8 text-white font-medium">
                <a href="#" className="hover:text-blue-300 transition duration-300 ease-out">Acasă</a>
                <a href="#" className="hover:text-blue-300 transition duration-300 ease-out">Proprietăți</a>
                <a href="#" className="hover:text-blue-300 transition duration-300 ease-out">Despre noi</a>
                <a href="#" className="hover:text-blue-300 transition duration-300 ease-out">Contact</a>
            </nav>
        </div>
    </header>
    </>
  )
}

export default Header