import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { HiBars3BottomRight, HiOutlineShoppingBag, HiOutlineUser } from 'react-icons/hi2';
import SearchBar from './SearchBar';
import CartDrawer from '../Layout/CartDrawer';
import { IoMdClose } from 'react-icons/io';
import {
  SignedOut,
  SignedIn,
  useUser
} from "@clerk/clerk-react";

const Navbar = () => {

  const { user } = useUser();
  console.log("user", user)

  const [cartdrawerOpen, setCartDrawerOpen] = useState(false);
  const [navDrawerOpen, setNavDrawerOpen] = useState(false);

  const toggleNavDrawer = () => {
    setNavDrawerOpen(!navDrawerOpen);
  }

  const toggleCartDrawer = () => {
    setCartDrawerOpen(!cartdrawerOpen);
  }

  return (
    <>
      <nav className='container mx-auto flex items-center justify-between py-4  px-3 md:px-12'>
        {/* Left-logo  */}
        <div>
          <Link to='/' className="text-2xl font-medium"> Rabbit </Link>
        </div>

        {/* Navigation Links  */}
        <div className='hidden md:flex space-x-6'>
          <Link to='collections/all' className="text-gray-700 hover:text-black text-sm font-medium uppercase" >
            Men
          </Link>
          <Link to='#' className="text-gray-700 hover:text-black text-sm font-medium uppercase" >
            Women
          </Link>
          <Link to='#' className="text-gray-700 hover:text-black text-sm font-medium uppercase" >
            Top Wear
          </Link>
          <Link to='#' className="text-gray-700 hover:text-black text-sm font-medium uppercase" >
            Bottom Wear
          </Link>
        </div>

        {/* Right icons  */}
        <div className='flex space-x-6 items-center'>
          <Link to="/admin" className='block bg-black px-2 py-1 rounded text-sm text-white'>
            Admin
          </Link>
          <SignedIn>
            <Link to="/profile">
              {user && (
                user.imageUrl ? (<img src={user.imageUrl} alt="User" className="w-8 h-8 rounded-full" />) : ("")
              )

              }
            </Link>
          </SignedIn>

          <SignedOut>
            <Link to="/login" className='hover:text-black'>
              <HiOutlineUser className="h-6 w-6 text-gray-700" />
            </Link>
          </SignedOut>

          <button onClick={toggleCartDrawer} className='hover:text-black relative'>
            <HiOutlineShoppingBag className="h-6 w-6 text-gray-700" />
            <span className='bg-red-600 text-white text-xs rounded-full px-2 py-0.5 absolute -top-1'>
              4
            </span>
          </button>

          {/* search  */}
          <div className='overflow-hidden'>
            <SearchBar />
          </div>

          <button className='md:hidden' onClick={toggleNavDrawer}>
            <HiBars3BottomRight className='h-6 w-6 text-gray-700' />
          </button>
        </div>
      </nav>
      <CartDrawer drawerOpen={cartdrawerOpen} toggleCartDrawer={toggleCartDrawer} />

      {/* Mobile Navigation  */}
      <div className={`fixed top-0 left-0 w-3/4 sm:w-1/2 h-full bg-white transform 
        transition-transform duration-300 shadow-lg z-50 ${navDrawerOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className='flex justify-end p-4'>
          <button onClick={toggleNavDrawer}>
            <IoMdClose className='h-6 w-6 text-gray-600' />
          </button>
        </div>

        {/* Links  */}
        <div className='p-4'>
          <h2 className='text-xl font-semibold mb-4'> Menu </h2>
          <nav className='space-y-4'>
            <Link
              to='collections/all'
              onClick={toggleNavDrawer}
              className='block text-gray-600 hover:text-black' >
              Men
            </Link>
            <Link
              to="#"
              onClick={toggleNavDrawer}
              className='block text-gray-600 hover:text-black' >
              Women
            </Link>
            <Link
              to="#"
              onClick={toggleNavDrawer}
              className='block text-gray-600 hover:text-black' >
              Top Wear
            </Link>
            <Link
              to="#"
              onClick={toggleNavDrawer}
              className='block text-gray-600 hover:text-black' >
              Bottom Wear
            </Link>
          </nav>
        </div>
      </div>
    </>
  )
}

export default Navbar