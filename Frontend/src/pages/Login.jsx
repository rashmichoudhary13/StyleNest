import { SignIn } from '@clerk/clerk-react'
import React, { useEffect } from 'react'


const Login = () => {
  return (
    <div className='flex justify-center  items-center my-10'>
      <SignIn
        path="/login"
        routing="path"
        signUpUrl="/register"
      />
    </div>
  )
}

export default Login