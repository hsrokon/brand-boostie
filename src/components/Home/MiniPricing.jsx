import { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import MiniPricingCard from './MiniPricingCard';

const MiniPricing = () => {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const [starterPlans, setStarterPlans] = useState([]);
  const [professionalPlans, setProfessionalPlans] = useState([]);

  useEffect(() => {
    fetch('https://brand-boostie-server.vercel.app/pricingCards')
      .then(res => res.json())
      .then(data => {
        const starter = data.filter(plan => plan.planCategory === 'Starter');
        const professional = data.filter(plan => plan.planCategory === 'Professional');
        setStarterPlans(starter);
        setProfessionalPlans(professional);
      })
      .catch(error => console.error("Failed to fetch pricing cards:", error));
  }, []);

  return (
    <div className="my-24 flex flex-col justify-center items-center gap-8 px-4 md:px-0">
      {/* Heading */}
      <div data-aos="fade-up">
        <h2 className="text-2xl lg:text-4xl font-semibold text-primary">
          Pricing
        </h2>
      </div>

      {/* Starter Pricing Card Section */}
      <div className="w-full" data-aos="fade-up">
        <h2 className="text-xl ml-4 text-center my-6 lg:text-3xl font-semibold text-primary">
          &#10095; Starter Plans
        </h2>
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-4">
          {starterPlans.map(plan => (
            <MiniPricingCard key={plan._id} plan={plan} />
          ))}
        </div>
      </div>

      {/* Professional Pricing Card Section */}
      <div className="w-full mt-20" data-aos="fade-up">
        <h2 className="text-xl ml-4 text-center my-6 lg:text-3xl font-semibold text-accent">
          &#10095; Professional Plans
        </h2>
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-4">
          {professionalPlans.map(plan => (
            <MiniPricingCard key={plan._id} plan={plan} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MiniPricing;
