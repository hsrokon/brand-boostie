import React, { useEffect } from 'react';
import MessageSection from '../components/MessageSection';
import Aos from 'aos';

const Contact = () => {

    useEffect(()=> {
                Aos.init({duration: 800, once: true})
            },[])

    return (
        <div className='min-h-screen'>

            <section className="w-full py-16 px-6 bg-base-200">
                <div className="md:max-w-2xl lg:max-w-3xl xl:max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6 self-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-primary">Get in touch</h2>
                    <p className="text-base-content">
                        We'd love to hear about your project or questions.
                    </p>
                    <div className="space-y-2">
                        <p><strong>Email:</strong> contact@brandboostie.com</p>
                        <p><strong>Phone:</strong> +88 01518-989695</p>
                        <p><strong>Location:</strong> Vatara, Dhaka 1212, Bangladesh.</p>
                        <p className='italic font-thin text-sm'>
                        <span className='text-red-600'>Things you should know:</span>
                        &nbsp;We don't spam & we reply within 24 hours!
                        </p>
                    </div>
                    </div>

                    <div>
                        <img
                            className="w-full rounded-md"
                            src="https://i.ibb.co/prhsWjVJ/edited-contact.webp"
                            alt="Contact"
                        />
                    </div>
                </div>
            </section>

            <section>
                <MessageSection></MessageSection>
            </section>

            <section className='md:max-w-2xl -mt-10 mb-40 flex flex-col justify-center items-center space-y-6 mx-auto' data-aos="fade-up">
                <h3 className='text-2xl md:text-3xl font-mono text-primary font-semibold'>Connect with us</h3>
                <div className="flex gap-4">
                    {["facebook", "twitter", "youtube", "linkedin"].map((platform) => (
                    <a
                        key={platform}
                        href="#"
                        className="w-9 h-9 rounded-sm bg-secondary/20 shadow flex items-center justify-center hover:bg-accent/40 transition"
                    >
                        <img
                        src={`https://cdn.jsdelivr.net/npm/simple-icons/icons/${platform}.svg`}
                        alt={platform}
                        className="w-4 h-4 opacity-70"
                        />
                    </a>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Contact;