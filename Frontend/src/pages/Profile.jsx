import React from 'react'
import MyOrdersPage from './MyOrdersPage'
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";

const Profile = () => {
  const { signOut } = useClerk();
  const { user } = useUser();
  console.log(user)

  return (
    <div className='min-h-screen flex flex-col'>
      <div className='flex-grow container mx-auto p-4 md:p-6'>
        <div className='flex flex-col md:flex-row md:space-x-6 space-y-6 md:space-y-0'>
          {/* Left Section  */}
          <div className='w-full md:w-1/3 lg:w-1/4 shadow-md rounded-lg p-6'>
            <div className='flex gap-4 mb-4'>
              <div className='scale-150 mt-1'>
                <UserButton />
              </div>
              <h1 className='text-2xl md:text-3xl font-bold'>{user && user.firstName}</h1>
            </div>
            <p className='text-lg text-gray-600 mb-4'> {user && user.emailAddresses[0].emailAddress} </p>
            <button onClick={() => signOut()} className='w-full bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600'>Logout</button>
          </div>

          {/* Right Section: Orders table  */}
          <div className='w-full md:w-2/3 lg:w-3/4'>
            <MyOrdersPage />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile