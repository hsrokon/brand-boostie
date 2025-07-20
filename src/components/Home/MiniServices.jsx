import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import MiniServicesCards from './MiniServicesCards';

const MiniServices = () => {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  return (
    <div className="my-24 flex flex-col justify-center items-center gap-8 px-4 md:px-0">
      
      {/* Text section */}
      <div className="" data-aos="fade-up">
        <h2 className="text-2xl lg:text-4xl font-semibold text-primary">
          Our Services
        </h2>
      </div>

      {/* cards section */}
      <div className="w-full" data-aos="fade-up">
        <MiniServicesCards></MiniServicesCards>
      </div>
    </div>
  );
};

export default MiniServices;
