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
        <div className="absolute inset-0 bg-black/15 backdrop-blur-sm z-0" />

        <div className="relative z-10 w-full lg:max-w-4xl mx-auto text-center space-y-4 md:p-8 rounded-lg py-2">
          <h1 className="text-xl md:text-3xl lg:text-5xl font-bold">
            Simple, Transparent Pricing
          </h1>
          <p className="text-sm md:text lg:text-lg text-gray-50">
            Plans designed to grow with your business — no hidden fees, just
            results.
          </p>
          <Link to="/contact">
            <button className="btn btn-sm md:btn-md text-base border-0 bg-primary text-white shadow hover:bg-primary/90 transition">
              Compare Plans
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Pricing;
