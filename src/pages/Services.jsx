// import TestMotion from '../components/TestMotion';
import Aos from "aos";
import 'aos/dist/aos.css'
import { useEffect } from "react";
import { HiRocketLaunch } from "react-icons/hi2";
import { IoIosArrowDown } from "react-icons/io";

const Services = () => {

    useEffect(()=> {
        Aos.init({duration: 800, once: true})
    },[])

    return (
        <div className='min-h-screen'>
            <section
            className='relative bg-cover bg-center bg-no-repeat px-6 py-24 mb-24     text-white'
            style={{backgroundImage: "url('https://i.ibb.co/RG6Ng5VJ/service-cover-bg.jpg')"}}
            data-aos="fade-up"
            >
                <div className='max-w-4xl mx-auto text-center space-y-4 p-8 bg-black/50 rounded-lg'>
                    <h1 className='text-4xl md:text-5xl font-bold'>Grow your business with confidence.</h1>
                    <p className='text-lg text-gray-200'>
                        BrandBoostie helps you dominate online with custom marketing strategies.
                    </p>
                    <button className='btn border-0 bg-primary text-white'>Get a free Consultation</button>
                </div>
            </section>

            <IoIosArrowDown className="text-4xl mx-auto text-base-content/50" data-aos="fade-up"/>

            <section className="w-9/12 mx-auto my-16"
            data-aos="fade-right"
            >
                <div className="relative">
                    <h1 className="text-4xl my-2 font-semibold text-primary">Ads Campaign</h1>
                    <h5 className="text-xl my-2 text-gray-600 flex items-center gap-3 "> <HiRocketLaunch className="text-secondary"/>
                    Targeted advertising to boost your brand's reach and engagement</h5>
                    <p className="text-base-content text-lg my-4">Our Ads Campaign service is designed to connect your business with the right audience through precise targeting on platforms like Google, Facebook, Instagram, and more. We craft compelling ad creatives and strategic messaging that capture attention and drive action. Whether your goal is to increase website traffic, generate leads, or grow sales, we tailor each campaign to match your objectives. With ongoing monitoring and data-driven optimization, we ensure your ad budget delivers the best possible return.</p>
                    <HiRocketLaunch className="absolute top-0 -right-10 text-accent/40 text-7xl"/>
                </div>
            </section>

        </div>
    );
};

export default Services;