// import TestMotion from '../components/TestMotion';
import Aos from "aos";
import 'aos/dist/aos.css'
import { useEffect, useState } from "react";
import { HiRocketLaunch } from "react-icons/hi2";
import { IoIosArrowDown } from "react-icons/io";
import { MdOutlineContentPasteSearch, MdWeb, MdOutlineMarkEmailRead } from "react-icons/md";
import { Link } from "react-router-dom";
import FAQ from "../components/FAQ";
import { useLocation } from "react-router-dom";
import TrustedClients from "../components/services/TrustedClients";

const Services = () => {

  const location = useLocation();

  useEffect(() => {
    Aos.init({ duration: 800, once: true });

    // scroll to matching service section
    const pathParts = location.pathname.split("/");
    const slug = pathParts[pathParts.length - 1]; // 'ads-campaign', etc.
    const target = document.getElementById(slug);
    if (target) {
        setTimeout(() => {
            target.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 300); // slight delay to wait for DOM
        }
    }, [location]);


    useEffect(()=> {
        Aos.init({duration: 800, once: true})
    },[])

    // const services = [
    //     {
    //         id: 1,
    //         title: "Ads Campaign",
    //         icon: <HiRocketLaunch />,
    //         short: "Targeted advertising to boost your brand’s reach and engagement",
    //         description:
    //         "Our Ads Campaign service helps you reach the right people through targeted ads on platforms like Google, Facebook, and Instagram. We create eye-catching visuals, engaging messages, and optimize campaigns to meet your business goals — whether that’s increasing traffic, generating leads, or boosting sales. With regular monitoring and data-driven improvements, we make sure your investment performs at its best.",
    //     },
    //     {
    //         id: 2,
    //         title: "Full Local SEO",
    //         icon: <MdOutlineContentPasteSearch />,
    //         short: "Improve your local search ranking and drive nearby traffic",
    //         description:
    //         "Our Full Local SEO service is built to increase your visibility in local searches. We optimize your Google Business Profile, manage local listings, and target location-specific keywords to help nearby customers find your business. Whether you're a shop, restaurant, or service provider, we ensure you show up when it matters most — in front of people searching near you.",
    //     },
    //     {
    //         id: 3,
    //         title: "Website",
    //         icon: <MdWeb />,
    //         short: "Modern, responsive websites tailored to your brand",
    //         description:
    //         "We design and build websites that reflect your brand, work on all devices, and convert visitors into customers. From clean layouts to fast loading and mobile optimization, every detail is crafted to give users a smooth experience. Whether you need a business landing page or a full e-commerce site, we create digital spaces that support your growth.",
    //     },
    //     {
    //         id: 4,
    //         title: "Email Marketing",
    //         icon: <MdOutlineMarkEmailRead />,
    //         short: "Convert leads through strategic and automated email flows",
    //         description:
    //         "Our Email Marketing service helps you stay connected with your audience through smart, automated campaigns. From welcome sequences to product promotions, we design personalized emails that drive engagement and increase conversions. Using tools like Mailchimp or Klaviyo, we build flows that nurture leads and bring customers back — all while saving you time.",
    //     },
    //     ];

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

    const [ expanded1, setExpanded1 ] = useState(false);
    const [ expanded2, setExpanded2 ] = useState(false);
    const [ expanded3, setExpanded3 ] = useState(false);
    const [ expanded4, setExpanded4 ] = useState(false);
    const text1 = `Our Ads Campaign service helps you reach the right people through targeted ads on platforms like Google, Facebook, and Instagram. We create eye-catching visuals, engaging messages, and optimize campaigns to meet your business goals — whether that's increasing traffic, generating leads, or boosting sales. With regular monitoring and data-driven improvements, we make sure your investment performs at its best.`;
    const text2 = `Our Full Local SEO service is built to increase your visibility in local searches. We optimize your Google Business Profile, manage local listings, and target location-specific keywords to help nearby customers find your business. Whether you're a shop, restaurant, or service provider, we ensure you show up when it matters most — in front of people searching near you.`;
    const text3 = `Our Email Marketing service helps you stay connected with your audience through smart, automated campaigns. From welcome sequences to product promotions, we design personalized emails that drive engagement and increase conversions. Using tools like Mailchimp or Klaviyo, we build flows that nurture leads and bring customers back — all while saving you time.`;
    const text4 = `We design and build websites that reflect your brand, work on all devices, and convert visitors into customers. From clean layouts to fast loading and mobile optimization, every detail is crafted to give users a smooth experience. Whether you need a business landing page or a full e-commerce site, we create digital spaces that support your growth.`;
    
    const previewLimit = 250;

    return (
        <div className='min-h-screen '>
            <section
            className="relative 
            banner-height 
            sm:h-[30vh] 
            md:h-[32vh] 
            lg:h-[30rem] 
            xl:h-[30rem] 
            bg-cover bg-center bg-no-repeat 
            px-6 
            py-10 sm:py-12 md:py-16 lg:py-24 
            mb-10 md:mb-16 lg:mb-24 
            text-white"

            style={{ backgroundImage: "url('https://i.ibb.co/5XKMbGKr/service-cover-bg.webp')" }}
            >
                <div className="absolute inset-0 bg-black/15 backdrop-blur-sm z-0"></div>

                <div className="relative z-10 w-full lg:max-w-4xl mx-auto text-center space-y-2 lg:space-y-8 md:p-8 rounded-lg py-2">
                    <h1 className="text-2xl md:text-3xl lg:text-5xl font-bold text-primary drop-shadow-xl">
                    Grow your business with confidence.
                    </h1>
                    <p className=" lg:text-lg drop-shadow-lg">
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

            <section 
                id="facebook-ads-campaign"
                className="w-11/12 md:w-10/12 lg:w-8/12 mx-auto my-14 lg:my-24 scroll-mt-24"
                data-aos='fade-right'
            >
                <div className="relative">
                    <h1 className={ `text-2xl lg:text-4xl my-2 font-semibold text-primary`}>
                       Facebook Ads Campaign
                    </h1>

                    <h5 className={`text-sm md:text-base lg:text-xl my-2 text-gray-600 flex items-center gap-3
                    `}> 
                        <div className="text-secondary">
                            <HiRocketLaunch />
                        </div>
                        Targeted advertising to boost your brand's reach and engagement
                    </h5>

                    <p className={`text-base-content text-sm lg:text-lg my-4`}
                    >
                        {expanded1 ? text1 : text1.slice(0, previewLimit) + (text1.length > previewLimit ? "..." : "")}
                        {" "}
                        {
                            text1.length > previewLimit && (
                                <button
                                onClick={()=> setExpanded1(!expanded1)}
                                className="text-primary font-medium underline cursor-pointer"
                                >
                                    {expanded1 ? "Show Less ▲" : "Read More ▼"}
                                </button>
                            )
                        }
                    </p>

                    <div className={`absolute -top-3 md:top-0 text-accent/40 text-5xl md:text-7xl right-0 md:right-10`}>
                        <HiRocketLaunch />
                    </div>

                    <div className={``}>
                       <Link to={`/pricing?service=Facebook%20Ads%20Campaign`}>
                            <button className={`px-6 py-2 font-medium bg-primary text-white w-fit transition-all 
                                shadow-[3px_3px_0px_black] hover:shadow-none 
                                hover:translate-x-[3px] hover:translate-y-[3px]
                                cursor-pointer`}>Visit Plan
                            </button>
                        </Link>
                    </div>
                    
                </div>
            </section>
            
            <section 
                id="full-local-seo"
                className="w-11/12 md:w-10/12 lg:w-8/12 mx-auto my-14 lg:my-24 scroll-mt-24"
                data-aos='fade-left'
            >
                <div className="relative">
                    <h1 className={ `text-2xl lg:text-4xl my-2 font-semibold text-primary text-right`}>
                        Full Local SEO
                    </h1>

                    <h5 className={`text-sm md:text-base lg:text-xl my-2 text-gray-600 flex items-center gap-3 flex-row-reverse text-right md:text-inherit`}> 
                        <div className="text-secondary">
                            <MdOutlineContentPasteSearch />
                        </div>
                        Improve your local search ranking and drive nearby traffic"
                    </h5>

                    <p className={`text-base-content text-sm lg:text-lg my-4 text-right`}
                    >
                        {expanded2 ? text2 : text2.slice(0, previewLimit) + (text2.length > previewLimit ? "..." : "")}
                        {" "}
                        {
                            text2.length > previewLimit && (
                                <button
                                onClick={()=> setExpanded2(!expanded2)}
                                className="text-primary font-medium underline cursor-pointer"
                                >
                                    {expanded2 ? "Show Less ▲" : "Read More ▼"}
                                </button>
                            )
                        }
                    </p>

                    <div className={`absolute -top-3 md:top-0 text-accent/40 text-5xl md:text-7xl left-0 md:left-10`}>
                        <MdOutlineContentPasteSearch />
                    </div>

                    <div className={`flex justify-end`}>
                        <Link to={`/pricing?service=Full%20Local%20SEO`}>
                            <button className={`px-6 py-2 font-medium bg-primary text-white w-fit transition-all 
                                shadow-[3px_3px_0px_black] hover:shadow-none 
                                hover:translate-x-[3px] hover:translate-y-[3px]
                                cursor-pointer`}>Visit Plan
                            </button>
                        </Link>
                    </div>
                    
                </div>
            </section>

            <section 
                id="email-marketing"
                className="w-11/12 md:w-10/12 lg:w-8/12 mx-auto my-14  lg:my-24 scroll-mt-24"
                data-aos='fade-right'
            >
                <div className="relative">
                    <h1 className={ `text-2xl lg:text-4xl my-2 font-semibold text-primary`}>
                        Email Marketing
                    </h1>

                    <h5 className={`text-sm md:text-base lg:text-xl my-2 text-gray-600 flex items-center gap-3
                    `}> 
                        <div className="text-secondary">
                            <MdOutlineMarkEmailRead />
                        </div>
                        Convert leads through strategic and automated email flows
                    </h5>

                    <p className={`text-base-content text-sm lg:text-lg my-4`}
                    >
                        {expanded3 ? text3 : text3.slice(0, previewLimit) + (text3.length > previewLimit ? "..." : "")}
                        {" "}
                        {
                            text3.length > previewLimit && (
                                <button
                                onClick={()=> setExpanded3(!expanded3)}
                                className="text-primary font-medium underline cursor-pointer"
                                >
                                    {expanded3 ? "Show Less ▲" : "Read More ▼"}
                                </button>
                            )
                        }
                    </p>

                    <div className={`absolute -top-3 md:top-0 text-accent/40 text-5xl md:text-7xl right-0 md:right-10`}>
                       <MdOutlineMarkEmailRead />
                    </div>

                    <div className={``}>
                        <Link to={`/pricing?service=Email%20Marketing`}>
                            <button className={`px-6 py-2 font-medium bg-primary text-white w-fit transition-all 
                                shadow-[3px_3px_0px_black] hover:shadow-none 
                                hover:translate-x-[3px] hover:translate-y-[3px]
                                cursor-pointer`}>Visit Plan
                            </button>
                        </Link>
                    </div>
                    
                </div>
            </section>

            <section 
                id="website-design-and-development"
                className="w-11/12 md:w-10/12 lg:w-8/12 mx-auto my-14  lg:my-24 scroll-mt-24"
                data-aos='fade-left'
            >
                <div className="relative">
                    <h1 className={ `text-2xl lg:text-4xl my-2 font-semibold text-primary text-right`}>
                        Website Design and Development
                    </h1>

                    <h5 className={`text-sm md:text-base lg:text-xl my-2 text-gray-600 flex items-center gap-3 flex-row-reverse text-right md:text-inherit`}> 
                        <div className="text-secondary">
                            <MdWeb />
                        </div>
                        Modern, responsive websites tailored to your brand
                    </h5>

                    <p className={`text-base-content text-sm lg:text-lg my-4 text-right`}
                    >
                        {expanded4 ? text4 : text4.slice(0, previewLimit) + (text4.length > previewLimit ? "..." : "")}
                        {" "}
                        {
                            text4.length > previewLimit && (
                                <button
                                onClick={()=> setExpanded4(!expanded4)}
                                className="text-primary font-medium underline cursor-pointer"
                                >
                                    {expanded4 ? "Show Less ▲" : "Read More ▼"}
                                </button>
                            )
                        }
                    </p>

                    <div className={`absolute -top-3 md:top-0 text-accent/40 text-5xl md:text-7xl left-0 md:left-10`}>
                        <MdWeb />
                    </div>

                    <div className={`flex justify-end`}>
                        <Link to={`/pricing?service=Website%20Design%20and%20Development`}>
                            <button className={`px-6 py-2 font-medium bg-primary text-white w-fit transition-all 
                                shadow-[3px_3px_0px_black] hover:shadow-none 
                                hover:translate-x-[3px] hover:translate-y-[3px]
                                cursor-pointer`}>Visit Plan
                            </button>
                        </Link>
                    </div>
                    
                </div>
            </section>

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
            
            <section>
                <FAQ></FAQ>
            </section>

            <section>
                <TrustedClients></TrustedClients>
            </section>
        </div>
    );
};

export default Services;