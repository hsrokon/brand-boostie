import React from 'react';
import Team from '../components/Team';
import { Link } from 'react-router-dom';

const About = () => {
    return (
        <div className='min-h-screen'>

            <section
            className="relative bg-cover bg-center md:bg-top bg-no-repeat px-6 py-10 md:py-20 lg:py-36 mb-10 md:mb-16 lg:mb-24 text-white"
            style={{
                backgroundImage: "url('https://i.ibb.co/pB0x8HZC/team.jpg')",
            }}
            >
            <div className="absolute inset-0 bg-black/30 backdrop-blur-sm z-0"></div>

            <div className="relative z-10 w-full max-w-4xl mx-auto text-center px-4 space-y-3 md:space-y-5">
                <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white drop-shadow-xl">
                Empowering Brands to Grow Online
                </h1>
                <p className="text-sm md:text-base lg:text-lg drop-shadow-lg text-white/90">
                BrandBoostie is your dedicated partner for digital growth — with proven results and a friendly team you can trust.
                </p>
                <Link to="/contact">
                <button className="btn btn-sm md:btn-md border-2 border-primary text-primary bg-white/70 shadow hover:bg-primary hover:text-white transition">
                    Get a Free Consultation
                </button>
                </Link>
            </div>
            </section>


            <section>
                <Team></Team>
            </section>
        </div>
    );
};

export default About;