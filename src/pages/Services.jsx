// import TestMotion from '../components/TestMotion';
import Aos from "aos";
import 'aos/dist/aos.css'
import { useEffect } from "react";
import { HiRocketLaunch } from "react-icons/hi2";
import { IoIosArrowDown } from "react-icons/io";
import { MdOutlineContentPasteSearch, MdWeb, MdOutlineMarkEmailRead } from "react-icons/md";
import { Link } from "react-router-dom";


const Services = () => {

    useEffect(()=> {
        Aos.init({duration: 800, once: true})
    },[])

    const services = [
        {
            id: 1,
            title: "Ads Campaign",
            icon: <HiRocketLaunch />,
            short: "Targeted advertising to boost your brand’s reach and engagement",
            description:
            "Our Ads Campaign service helps you reach the right people through targeted ads on platforms like Google, Facebook, and Instagram. We create eye-catching visuals, engaging messages, and optimize campaigns to meet your business goals — whether that’s increasing traffic, generating leads, or boosting sales. With regular monitoring and data-driven improvements, we make sure your investment performs at its best.",
        },
        {
            id: 2,
            title: "Full Local SEO",
            icon: <MdOutlineContentPasteSearch />,
            short: "Improve your local search ranking and drive nearby traffic",
            description:
            "Our Full Local SEO service is built to increase your visibility in local searches. We optimize your Google Business Profile, manage local listings, and target location-specific keywords to help nearby customers find your business. Whether you're a shop, restaurant, or service provider, we ensure you show up when it matters most — in front of people searching near you.",
        },
        {
            id: 3,
            title: "Website",
            icon: <MdWeb />,
            short: "Modern, responsive websites tailored to your brand",
            description:
            "We design and build websites that reflect your brand, work on all devices, and convert visitors into customers. From clean layouts to fast loading and mobile optimization, every detail is crafted to give users a smooth experience. Whether you need a business landing page or a full e-commerce site, we create digital spaces that support your growth.",
        },
        {
            id: 4,
            title: "Email Marketing",
            icon: <MdOutlineMarkEmailRead />,
            short: "Convert leads through strategic and automated email flows",
            description:
            "Our Email Marketing service helps you stay connected with your audience through smart, automated campaigns. From welcome sequences to product promotions, we design personalized emails that drive engagement and increase conversions. Using tools like Mailchimp or Klaviyo, we build flows that nurture leads and bring customers back — all while saving you time.",
        },
        ];

    const bulletPoints = [
        {
            id: 1,
            point: "Data-driven results"
        },
        {
            id: 2,
            point: "Dedicated support"
        },
        {
            id: 3,
            point: "Transparent reporting"
        },
        {
            id: 4,
            point: "Scalable solutions"
        },
        {
            id: 5,
            point: "SEO & mobile-ready"
        },
        {
            id: 6,
            point: "Proven success"
        },
        {
            id: 7,
            point: "Multi-channel strategy"
        },
        {
            id: 8,
            point: "Ongoing optimization"
        },
        {
            id: 9,
            point: "Local & global targeting "
        },
    ]

    return (
        <div className='min-h-screen '>
            {/* <div className="bg-primary/5 w-full h-0.5"></div> */}
            <section
            className="relative bg-cover bg-center bg-no-repeat px-6 py-8 md:py-16 lg:py-24 mb-10 md:mb-16 lg:mb-24 text-white"
            style={{ backgroundImage: "url('https://i.ibb.co/RG6Ng5VJ/service-cover-bg.jpg')" }}
            >
                <div className="absolute inset-0 bg-black/15 backdrop-blur-sm z-0"></div>

                <div className="relative z-10 w-full lg:max-w-4xl mx-auto text-center space-y-4 md:p-8 rounded-lg py-2">
                    <h1 className="text-xl md:text-3xl lg:text-5xl font-bold text-white drop-shadow-xl [text-shadow:_2px_2px_0_black,_-2px_-2px_0_black]">
                    Grow your business with confidence.
                    </h1>
                    <p className="text-sm lg:text-lg drop-shadow-lg">
                    BrandBoostie helps you dominate online with custom marketing strategies.
                    </p>
                    <Link to="/contact">
                    <button className="btn btn-sm md:btn-md border-0 bg-primary text-white shadow hover:bg-primary/90 transition">
                        Get a free Consultation
                    </button>
                    </Link>
                </div>
            </section>


            <IoIosArrowDown className="text-2xl md:text-3xl lg:text-4xl mx-auto text-base-content/50" data-aos="fade-up"/>

            {/* Services */}
            <h1 className="text-center text-2xl md:text-3xl lg:text-5xl text-accent my-6 md:my-8 lg:my-10" data-aos="fade-left">Explore Services</h1>

            {
            services.map(service =>
                <section 
                key={service.id}
                className="w-11/12 md:w-10/12 lg:w-8/12 mx-auto my-14  lg:my-24"
                data-aos={`${service.id%2===0 ? 'fade-left' : 'fade-right'}`}
                >
                    <div className="relative">
                        <h1 className={ `text-2xl lg:text-4xl my-2 font-semibold text-primary ${service.id%2===0 ? 'text-right' : ''}`}>
                            {service.title}
                        </h1>

                        <h5 className={`text-sm md:text-base lg:text-xl my-2 text-gray-600 flex items-center gap-3
                        ${service.id%2===0 ? 'flex-row-reverse text-right md:text-inherit' : ''}`}> 
                            <div className="text-secondary">
                                {service.icon}
                            </div>
                        {service.short}
                        </h5>

                        <p className={`text-base-content text-sm lg:text-lg my-4 ${service.id%2===0 ? 'text-right' : ''}`}
                        >
                            {service.description}
                        </p>

                        <div className={`absolute -top-3 md:top-0 text-accent/40 text-5xl md:text-7xl ${service.id%2===0 ? 'left-0 md:left-10' : 'right-0 md:right-10'}`}>
                        {service.icon}
                        </div>

                        <div className={`flex ${service.id%2===0 ? 'justify-end' : ''}`}>
                            <button className={`px-6 py-2 font-medium bg-primary text-white w-fit transition-all 
                                shadow-[3px_3px_0px_black] hover:shadow-none 
                                hover:translate-x-[3px] hover:translate-y-[3px]
                                cursor-pointer`}>Visit Plan
                            </button>
                        </div>
                        
                    </div>
                </section>
            )
            }

            <section 
            className="w-7/12 mx-auto flex flex-col items-center"
            data-aos="fade-down">
                <h1 className="text-2xl md:text-4xl text-accent font-semibold my-2 md:my-4">Why choose us?</h1>
                <h5 className="my-2 font-semibold text-primary italic">We focus on:</h5>
                <div className="grid gap-3 md:grid-cols-3">
                    {
                        bulletPoints.map(point => 
                        <button key={point.id} className="px-6 py-2 font-medium 
                            border-2 border-primary text-xs md:text-sm lg:text-base text-primary w-fit transition-all 
                            shadow-[3px_3px_0px_black] hover:shadow-none 
                            hover:translate-x-[3px] hover:translate-y-[3px]
                            cursor-pointer">
                        {point.point}
                        </button>)
                    }
                </div>
                <Link to={'/caseStudies'}>
                    <button 
                    className={`px-6 py-2 font-medium bg-primary my-8
                        text-white w-fit transition-all 
                        shadow-[3px_3px_0px_black] hover:shadow-none 
                        hover:translate-x-[3px] hover:translate-y-[3px]
                        cursor-pointer`}>Learn More...
                    </button>
                </Link>
            </section>
            
            <section className="w-7/12 mx-auto text-white py-2 lg:py-16 mt-14 md:mt-16 lg:mt-28 text-center" data-aos="zoom-in">
                <h2 className="text-2xl text-accent md:text-4xl font-bold mb-4">
                    Ready to Boost Your Brand?
                </h2>
                <p className="text-sm text-base-content md:text-lg  max-w-2xl mx-auto mb-6">
                    Let us help you grow with powerful digital marketing strategies tailored just for your business.
                </p>
                <Link to="/contact">
                    <button className="btn btn-md bg-white text-primary font-semibold hover:bg-gray-200 transition">
                    Get a Free Consultation
                    </button>
                </Link>
            </section>

            <section className="w-10/12 md:w-8/12 lg:w-6/12 mx-auto mt-28 text-center" data-aos="fade-up">
                <h2 className="text-2xl md:text-3xl font-bold text-primary mb-6">Frequently Asked Questions</h2>
                <div className="space-y-4 text-left">
                    <div>
                    <h4 className="font-semibold xl:text-lg text-accent">How long before I see results?</h4>
                    <p className="text-base-content text-sm xl:text-base">Results depend on your service, but many clients begin to notice improvements within the first month.</p>
                    </div>
                    <div>
                    <h4 className="font-semibold xl:text-lg text-accent">Do you work with small businesses?</h4>
                    <p className="text-base-content text-sm xl:text-base">Yes! We specialize in helping small to mid-sized businesses scale effectively.</p>
                    </div>
                    <div>
                    <h4 className="font-semibold xl:text-lg text-accent">Can I customize my service package?</h4>
                    <p className="text-base-content text-sm xl:text-base">Absolutely. We offer flexible packages to meet your unique business needs.</p>
                    </div>
                </div>
            </section>

            <section className="py-32 px-6 bg-base-100 text-center" data-aos="fade-up">
                <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">Trusted by Businesses Like Yours</h2>
                <p className="text-sm md:text-lg mb-6 max-w-2xl mx-auto text-base-content">
                    From startups to local shops, our clients love the results we deliver.
                </p>
                <div className="flex justify-center flex-wrap gap-6">
                    <img src="https://i.ibb.co/fYqK9psP/omar.jpg" alt="Client 1" className="h-8 md:h-10 rounded-full cursor-pointer" />
                    <img src="https://i.ibb.co/D0XrWnc/Imran.jpg" alt="Client 2" className="h-8 md:h-10 rounded-full cursor-pointer" />
                    <img src="https://i.ibb.co/whk3qJ3j/nusrat.jpg" alt="Client 3" className="h-8 md:h-10 rounded-full cursor-pointer" />
                    {/* Replace with your real client logos */}
                </div>
            </section>
        </div>
    );
};

export default Services;