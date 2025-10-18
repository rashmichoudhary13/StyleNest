import React from 'react'
import { assets } from '../../assets/assets.js';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className='relative'>
      <img src={assets.heroImg}  alt='Rabbit' className='w-full h-[350px] md:h-[500px] lg:h-[600px] object-cover ' />

      <div className='absolute bg-black bg-opacity-10 inset-0 flex items-center justify-center'>
        <div className='text-center text-white p-6'>
          <h1 className='text-4xl md:text-9xl font-bold tracking-tighter uppercase mb-4'> 
            Vacation <br /> Ready
          </h1>
          <p className='text-sm tracking-tighter md:text-lg mb-6'> 
            Explore our vacation-ready outfits with fast worldwide shipping.
          </p>
          <Link  to="/collections/all?gender=Men" className='bg-white text-gray-950 py-2 rounded-sm text-lg px-6' > 
          Shop Now
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Hero