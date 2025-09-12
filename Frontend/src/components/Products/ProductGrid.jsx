import React from 'react'
import { Link } from 'react-router-dom';
import { FaRupeeSign } from "react-icons/fa";

const ProductGrid = ({products, loading, error}) => {
    if (loading) {
        return <p> Loading... </p>
    }

    if (error) {
        return <p> Error: {error} </p>
    }
  return (
    <div className='grid grid-cols-2 lg:grid-cols-4 md:gap-6'>
        
        { 
        products.length > 0 ? (
            products.map((product, index) => (
            <Link key={index} to={`/product/${product._id}`} className='block'>
                <div className='bg-white p-2 md:p-4 rounded-lg'>
                    <div className='w-full h-60 md:h-96 mb-4'>
                        <img src={product.images[0].url} alt="Product Images" 
                        className='w-full h-full object-cover rounded-lg'/>
                    </div>
                    <h3 className='text-sm mb-2'> {product.name} </h3>
                    <p className='text-gray-500 font-medium text-sm tracking-tighter'>
                        <FaRupeeSign className="inline text-gray-700" />{product.price}
                    </p>
                </div>
            </Link>
        ))
        ) : <div className='text-2xl font-bold'> No Product is Available :(</div>
        
        

        }
    </div>
  )
}

export default ProductGrid