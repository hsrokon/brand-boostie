import { Link } from "react-router-dom";

const Pricing = () => {
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
                Compare Plans
            </button>
        </div>
      </section>
    </div>
  );
};

export default Pricing;
