import React, { useEffect } from 'react';
import Team from '../components/Team';
import { Link } from 'react-router-dom';
import { IoIosArrowDown } from 'react-icons/io';
import Aos from 'aos';
import { RxDividerVertical } from 'react-icons/rx';
import Stats from '../components/Stats';
import FAQ from '../components/FAQ';
import { MdCallMade } from 'react-icons/md';

const About = () => {

    useEffect(()=> {
            Aos.init({duration: 800, once: true})
        },[])

    return (
        <div className='min-h-screen'>

            <section
            className="relative 
            banner-height 
            sm:h-[30vh] 
            md:h-[35vh] 
            lg:h-[26rem] 
            xl:h-[29rem] 
            bg-cover bg-center md:bg-top bg-no-repeat 
            px-6 
            py-8 
            sm:py-12 
            md:py-16 
            lg:py-24 
            mb-10 
            md:mb-16 
            lg:mb-24 
            text-white"

            style={{
                backgroundImage: "url('https://i.ibb.co/Vrx2WPL/team.webp')",
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
                <button className="btn btn-sm md:btn-md border-2 border-primary text-primary bg-white/70 shadow hover:bg-primary/40 hover:text-white transition">
                    Get a Free Consultation
                </button>
                </Link>
            </div>
            </section>

            <IoIosArrowDown className="text-2xl md:text-3xl lg:text-4xl mt-14 mx-auto text-base-content/50" data-aos="fade-up"/>

            <section className='mt-16 mb-14 md:mb-12 lg:mt-32 lg:mb-16 xl:mt-14 w-9/12 xl:w-7/12 mx-auto text-center space-y-4' data-aos="fade-up">
                <h2 className='text-4xl font-bold text-primary lg:text-5xl'>Who we are?</h2>
                <p className='lg:text-lg max-w-2xl mx-auto'>We're a team of digital marketing specialists passionate about helping businesses reach more customers online, build trust, and grow steadily.</p>

                <h3 className='text-left -ml-4 md:ml-0 text-xl font-semibold flex justify-start items-center mt-8'> <RxDividerVertical  className='text-5xl md:text-3xl'/>Our Mission, Vision & Values</h3>
                <div className='text-left space-y-2 md:pl-4 lg:text-lg'>
                    <p><span className='font-semibold'>Mission:</span> "Deliver measurable growth for businesses of all sizes."</p>
                    <p><span className='font-semibold'>Vision:</span> "Be the trusted partner for businesses looking to expand online."</p>
                    <p><span className='font-semibold'>Values:</span> "Transparency, Creativity, Dedication, Results."</p>
                </div>
            </section>

            <section>
                <Team></Team>
            </section>

            <section>
                <Stats></Stats>
            </section>

            <section>
                <FAQ></FAQ>
            </section>

            <section className='mt-16 mb-14 md:mb-12 lg:my-20 w-9/12 xl:w-7/12 mx-auto text-center space-y-4' data-aos="fade-up">
                <h2 className='text-xl lg:text-4xl font-bold text-primary'>Still have questions?</h2>

                <Link to="/contact">
                <button className="btn btn-sm md:btn-md border-0 text-primary bg-white/70 shadow-md hover:bg-primary/80 lg:text-base hover:text-white transition">
                    Contact Us <MdCallMade  className='text-xl'/>
                </button>
                </Link>
            </section>
        </div>
    );
};

export default About;