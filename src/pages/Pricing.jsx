import React, { useRef } from 'react';
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import PricingCard from '../components/pricing/PricingCard';

const Pricing = () => {

  const [pricingData, setPricingData] = useState([]);
  const comparisonRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
  fetch("https://brand-boostie-server.vercel.app/pricingPlans")
    .then(res => res.json())
    .then(data => setPricingData(data));
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const targetService = params.get("service");

    // console.log("Query service:", targetService);
    // console.log("Available service names:", pricingData.map(d => d.service));

    if (targetService && pricingData.length > 0) {
      const id = `pricing-${targetService.replace(/\s+/g, "-").toLowerCase()}`;
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  }, [location.search, pricingData]);

  const scrollToComparison = ()=> {
    comparisonRef.current?.scrollIntoView({behavior : 'smooth'})
  }

  return (
    <div className="min-h-screen">
      <section
        className="relative 
        banner-height 
        sm:h-[30vh] 
        md:h-[40vh] 
        lg:h-[30rem]  
        bg-cover bg-center bg-no-repeat 
        px-6 
        py-10 sm:py-14 md:py-16 lg:py-24 
        mb-10 md:mb-16 lg:mb-24 
        text-white"

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
            <button 
            onClick={scrollToComparison}
            className="btn btn-sm md:btn-md md:text-base border-0 bg-primary text-white shadow hover:bg-primary/90 transition
            ">
                View Pricing Comparison
            </button>
        </div>
      </section>

      <section>
        <div className="min-h-screen bg-base-100 px-4 md:px-8 pt-12 pb-22">
          <h1 
          ref={comparisonRef}
          className="text-3xl md:text-4xl font-bold text-center text-primary mb-12">
            Compare Our Plans
          </h1>

          <div 
          className="grid gap-10 md:gap-12 xl:gap-16 grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 max-w-6xl mx-auto">
            {pricingData.map((item, idx) => (
              <div
                id={`pricing-${item.service.replace(/\s+/g, "-").toLowerCase()}`} // unique ID
                key={idx}
                className='scroll-mt-24'
              >
                <PricingCard
                  service={item.service}
                  features={item.features}
                  starterPrice={item.starterPrice}
                  professionalPrice={item.professionalPrice}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Pricing;
