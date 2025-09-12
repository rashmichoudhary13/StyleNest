import React, { useEffect, useState } from 'react';
import { FiChevronRight, FiChevronLeft } from 'react-icons/fi';
import { FaRupeeSign } from "react-icons/fa";
import {Link} from 'react-router-dom';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import { EffectCoverflow, Pagination } from 'swiper/modules';
import axios from 'axios';

const NewArrivals = () => {
   const [newArrivals, setNewArrivals] = useState([]);

   useEffect(() => {
    const fetchNewArrivals = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products/new-arrivals`);
            setNewArrivals(response.data);
        } catch (error) {
            console.log("Error fetching new arrivals:", error);
        }
    };

    fetchNewArrivals();
   }, [])

    return (
        <section className='mb-8'>
            <div className='container mx-auto text-center mb-10 relative'>
                <h2 className='text-3xl font-bold mb-4'> Explore New Arrivals </h2>
                <p className='text-sm md:text-lg text-gray-600 mb-8 px-3'> Discover the latest styles straight off the runway, freshly added to keep your wardrobe on the cutting edge of fashion. </p>
            </div>

            <div className=" mx-6 md:mx-12">
                <Swiper
                    effect={'coverflow'}
                    grabCursor={true}
                    centeredSlides={true}
                    slidesPerView={'auto'}
                    loop={newArrivals.length > 2}
                    coverflowEffect={{
                        rotate: 50,
                        stretch: 0,
                        depth: 200,
                        modifier: 1,
                        slideShadows: true,
                    }}
                    modules={[EffectCoverflow, Pagination]}
                    className="swiper-3d swiper-coverflow w-full py-10"
                >
                    {newArrivals.map((product) => (

                        <SwiperSlide key={product._id} className=" md:!w-[400px] !h-[500px] shrink-0">
                            <img src={product.images[0]?.url} alt={product.images[0]?.altText} className="w-full h-full object-cover rounded-lg" />

                            <div className='absolute bottom-0 left-0 right-0 bg-opacity-50 backdrop-blur-md text-white p-5'>
                                <Link to={`/product/${product._id}`} className="block">
                                <h4 className='font-medium'> {product.name} </h4>
                                <p className='mt-1'> <FaRupeeSign className="inline text-white" />{product.price} </p>
                                </Link>
                            </div>
                        </SwiperSlide>

                    ))}
                </Swiper>

            </div>
        </section>
    )
}

export default NewArrivals