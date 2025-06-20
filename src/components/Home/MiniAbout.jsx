import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const MiniAbout = () => {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  return (
    <div className="my-24 flex flex-col md:flex-row justify-between items-center gap-8 px-4 md:px-0">
      
      {/* Text section */}
      <div className="w-full md:w-1/2" data-aos="fade-right">
        <h2 className="text-2xl lg:text-4xl font-semibold mb-4 text-primary">
          What we do?
        </h2>
        <p className="text-base lg:text-xl leading-relaxed text-base-content">
          At <span className="text-accent font-semibold">BrandBoostie</span>, we specialize in <span className="underline decoration-2 decoration-secondary font-medium">modern, data-driven digital marketing</span> solutions designed to 
          <span className="font-medium"> launch your brand</span> into the spotlight and convert clicks into customers. 
          <br />
          Whether you're just starting or scaling up, <span className="text-accent font-medium">BrandBoostie</span> empowers you with 
          <span className="underline decoration-2 decoration-secondary font-medium"> smart tools</span>, 
          <span className="font-medium"> expert support</span>, and 
          <span className="text-secondary font-medium"> impactful campaigns</span> — all in one place.
        </p>
      </div>

      {/* Image section */}
      <div className="relative w-full md:w-1/2" data-aos="fade-left">
        <img
          src="https://i.ibb.co/8Lz6fRr1/mini-about-reduced.png"
          alt="digital marketing representational image"
          className="w-full h-auto object-cover rounded-lg"
        />
        
        {/* Gradient fade on left */}
        <div className="absolute top-0 md:bottom-0 md:left-0 h-3/5 md:h-full w-full md:w-2/3 bg-gradient-to-b md:bg-gradient-to-r from-base-100 to-transparent pointer-events-none rounded-lg" />
      </div>
    </div>
  );
};

export default MiniAbout;
