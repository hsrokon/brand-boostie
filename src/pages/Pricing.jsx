import React from 'react';
import { useEffect, useState } from "react";
import { IoMdCheckmark } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { Link } from "react-router-dom";
import PricingTable from '../components/PricingTable';

const Pricing = () => {

    // const [ pricingData, setPricingData ] = useState([])

    // useEffect(()=> {
    //     fetch('pricing.json')
    //     .then(res => res.json())
    //     .then(data => setPricingData(data))
    // },[])

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

        <h1 className='text-center text-2xl md:text-3xl lg:text-4xl font-semibold'>Pricing Comparison table</h1>

    {/* Pricing Comparison table */}
      <section className="w-full md:w-11/12 mx-auto relative my-28">
        
        <div className="absolute -top-2 lg:-top-6 bottom-0 right-1 md:right-4 w-[7.7rem] sm:w-[6.5rem] md:w-[10.5rem] lg:w-[14rem] xl:w-80 border border-secondary md:border-2 rounded-lg md:rounded-3xl"></div>

        <div className='grid grid-cols-3 md:grid-cols-4 font-serif px-4 text-center text-[0.95rem] md:text-2xl lg:text-3xl z-10'>
          <h2 className='hidden md:inline-block'>Service <span className='hidden md:inline-block'>Name</span> </h2>
          <h2 className='text-xl underline md:no-underline'>Feature</h2>
          <h2 className='text-primary font-semibold text-xl underline md:no-underline'>Starter</h2>
          <h2 className='text-xl md:text-3xl lg:text-4xl font-semibold md:font-bold text-secondary pb-3 md:pb-6 ml-5.5 md:ml-0 underline md:no-underline'>Premium</h2>
        </div>

        <PricingTable></PricingTable>
      </section>
    </div>
  );
};

export default Pricing;
