import React from 'react'
import { assets } from '../../assets/assets.js';
import { Link } from 'react-router-dom';

const GenderCollectionSection = () => {
    return (
        <section className='py-12 mx-6 md:mx-12 lg:px-0'>
            <div className='grid md:grid-cols-2 gap-8'>
                {/* Women's Collection  */}
                <div className='relative'>
                    <img src={assets.womensCollectionImage}
                        alt="women's collection"
                        className='w-full h-[600px] object-cover ' />

                    <div className='absolute bottom-8 left-8 bg-white p-4 bg-opacity-90'>
                        <h2 className='text-2xl font-bold text-gray-900 mb-3'>
                            Women's Collection
                        </h2>
                        <Link
                        to="/collections/all?gender=Women"
                        className='text-gray-900 underline'>
                        Shop Now 
                        </Link>
                    </div>
                </div>

                {/* Men's Collection  */}
                <div className='relative'>
                    <img src={assets.mensCollectionImage}
                        alt="Men's collection"
                        className='w-full h-[600px] object-cover ' />

                    <div className='absolute bottom-8 left-8 bg-white p-4 bg-opacity-90'>
                        <h2 className='text-2xl font-bold text-gray-900 mb-3'>
                            Men's Collection
                        </h2>
                        <Link
                        to="/collections/all?gender=Men"
                        className='text-gray-900 underline'>
                        Shop Now 
                        </Link>
                    </div>
                </div>
            </div>


        </section>
    )
}

export default GenderCollectionSection