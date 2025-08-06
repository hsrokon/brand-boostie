import React, { useEffect } from 'react';
import MessageSection from '../components/MessageSection';
import Aos from 'aos';
import ConnectSection from '../components/ConnectSection';

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
                        <p><strong>WhatsApp:</strong> +88 01518-989695</p>
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

            <section>
                <ConnectSection></ConnectSection>
            </section>
        </div>
    );
};

export default Contact;