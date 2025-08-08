import { SignUp } from '@clerk/clerk-react'
import React from 'react'

const Register = () => {
  return (
    <div className='flex justify-center  items-center my-10'>
       <SignUp
      path="/register"
      routing="path"
      signInUrl="/login" 
    />
    </div>
    
  )
}

export default Register