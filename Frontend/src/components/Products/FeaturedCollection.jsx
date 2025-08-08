import React from "react";
import {assets} from "../../assets/assets.js"; 
import { Link  } from "react-router-dom";

const FeaturedCollection = () => {
  return (
    <section className="py-16 px-4 lg:px-16">
      <div className="container mx-auto flex flex-col-reverse lg:flex-row items-center bg-green-50 rounded-3xl">
        {/* Left Text Section */}
      <div className="lg:w-1/2 p-8 text-center lg:text-left">
        <p className="text-gray-600 font-semibold mb-2 text-lg">Comfort and Style</p>
        <h2 className="text-2xl lg:text-5xl font-bold text-gray-900 mb-4">
          Apparel made for your <br /> everyday life
        </h2>
        <p className="text-gray-700 mb-6 text-lg">
          Discover high-quality, comfortable clothing that effortlessly blends fashion and function. Designed to make you look and feel great every day.
        </p>
        <Link 
        to="/collections/all"
        className="bg-black text-white px-6 py-3 rounded-lg text-lg hover:bg-gray-800">
          Shop Now
        </Link>
      </div>

      {/* Right Image Section */}
      <div className="md:w-1/2">
        <img
          src={assets.featured}
          alt="Featured Collection"
          className="w-full h-auto object-cover rounded-xl"
        />
      </div>
      </div>
    </section>
  );
};

export default FeaturedCollection;
