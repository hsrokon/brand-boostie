// import TestMotion from '../components/TestMotion';
import Aos from "aos";
import 'aos/dist/aos.css'
import { useEffect } from "react";

const Services = () => {

    useEffect(()=> {
        Aos.init({duration: 800, once: true})
    },[])

    return (
        <div className='min-h-screen'>
            <section
            className='relative bg-cover bg-center bg-no-repeat px-6 py-24 text-white'
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
            

        </div>
    );
};

export default Services;