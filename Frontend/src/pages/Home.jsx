import React from 'react'
import Hero from '../components/Layout/Hero'
import GenderCollectionSection from '../components/Products/GenderCollectionSection'
import NewArrivals from '../components/Products/NewArrivals'
import ProductDetails from '../components/Products/ProductDetails'
import ProductGrid from '../components/Products/ProductGrid'
import FeaturedCollection from '../components/Products/FeaturedCollection'
import FeatureSection from '../components/Products/FeatureSection'

const placeholderProducts = [
    {
        _id: 6,
        name: "Product 1",
        price: 100,
        images: [{url: "https://picsum.photos/500/500?random=6"}]
    },
       {
        _id: 7,
        name: "Product 2",
        price: 100,
        images: [{url: "https://picsum.photos/500/500?random=7"}]
    },
       {
        _id: 8,
        name: "Product 3",
        price: 100,
        images: [{url: "https://picsum.photos/500/500?random=8"}]
    },
       {
        _id: 41,
        name: "Product 4",
        price: 100,
        images: [{url: "https://picsum.photos/500/500?random=41"}]
    },
]


const Home = () => {
  return (
    <div>
        <Hero/>
        <GenderCollectionSection />
        <NewArrivals />

        {/* Best Seller  */}
        <h2 className='text-3xl text-center font-bold'> Best Seller </h2>
        <ProductDetails/>

        <div className='container mx-auto px-5 md:px-10'>
          <h2 className='text-3xl text-center font-bold mb-4'>
            Top Wears for Women
          </h2>
          <ProductGrid products={placeholderProducts} />
        </div>

        <FeaturedCollection />
        <FeatureSection />
    </div>
  )
}

export default Home