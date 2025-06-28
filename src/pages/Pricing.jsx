import React from 'react';
import { useEffect, useState } from "react";
import { IoMdCheckmark } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { Link } from "react-router-dom";
import PricingTable from '../components/PricingTable';

const Pricing = () => {

    const [ pricingData, setPricingData ] = useState([])

    useEffect(()=> {
        fetch('pricing.json')
        .then(res => res.json())
        .then(data => setPricingData(data))
    },[])

  return (
    <div className="min-h-screen">
      <section
        className="relative bg-cover bg-center bg-no-repeat px-6 lg:py-24 mb-10 md:mb-16 lg:mb-24 text-white"
        style={{
          backgroundImage: "url('https://i.ibb.co/vxMB0hHk/pricing.jpg')",
        }}
      >
        <div className="absolute inset-0 backdrop-blur-xs z-0" />

        <div className="relative z-10 w-full lg:max-w-4xl mx-auto text-center space-y-4 md:p-8 rounded-lg py-2">
            <h1 className="text-2xl text-primary md:text-white md:text-3xl lg:text-5xl font-bold lg:[text-shadow:_2px_2px_0_black,_-2px_-2px_0_black]">
            Simple, Transparent Pricing
            </h1>
            <p className="text-sm md:text lg:text-lg text-base-content">
            Plans designed to grow with your business — no hidden fees, just
            results.
            </p>
            <button className="btn btn-sm md:btn-md md:text-base border-0 bg-primary text-white shadow hover:bg-primary/90 transition">
                Customize Plan
            </button>
        </div>
      </section>

        <h1 className='text-center text-4xl font-semibold'>Pricing Comparison table</h1>

    {/* Pricing Comparison table */}
      <section className="w-11/12 mx-auto relative my-28">
        

        <div className='absolute h-[110rem] w-80 border-2 border-secondary -top-10 rounded-3xl right-5'></div>

        <div className='grid grid-cols-4 font-serif px-4 text-center text-3xl z-10'>
          <h2 className=''>Service Name</h2>
          <h2 className=''>Feature</h2>
          <h2 className='text-primary font-semibold'>Starter</h2>
          <h2 className='text-4xl font-bold text-secondary pb-6'>Premium</h2>
        </div>

        <PricingTable></PricingTable>
      </section>
    </div>
  );
};

export default Pricing;
