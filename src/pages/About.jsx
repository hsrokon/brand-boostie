import React from 'react';
import Team from '../components/Team';

const About = () => {
    return (
        <div className='min-h-screen'>

            <section
            className='relative bg-cover bg-top h-[25rem] bg-no-repeat px-6 lg:py-32 mb-10 md:mb-16 lg:mb-24 text-white'
            style={{backgroundImage:"url('https://i.ibb.co/pB0x8HZC/team.jpg')"}}
            >

                <div className='absolute inset-0 bg-black/15 backdrop-blur-sm z-0'></div>
                <div className='relative z-10 w-full lg:max-w-4xl mx-auto text-center space-y-4'>
                    <h1 className='text-xl md:text-3xl lg:text-5xl font-bold text-white drop-shadow-xl'>Empowering Brands to Grow Online</h1>
                    <p className='text-sm lg:text-lg drop-shadow-lg'>BrandBoostie is your dedicated partner for digital growth — with proven results and a friendly team you can trust</p>
                </div>
            </section>

            <section>
                <Team></Team>
            </section>
        </div>
    );
};

export default About;