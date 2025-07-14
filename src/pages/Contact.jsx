import React from 'react';
import MessageSection from '../components/MessageSection';

const Contact = () => {
    return (
        <div className='min-h-screen'>

            <section className="w-full py-16 px-6 bg-base-200">
                <div className=" md:max-w-2xl lg:max-w-3xl xl:max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6 self-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-primary">Get in touch</h2>
                    <p className="text-base-content">
                        We'd love to hear about your project or questions.
                    </p>
                    <div className="space-y-2">
                        <p><strong>Email:</strong> hello@yourbrand.com</p>
                        <p><strong>Phone:</strong> +123 456 789</p>
                        <p><strong>Location:</strong> 123 Business St, City, Country</p>
                        <p className='italic font-thin text-sm'>
                        <span className='text-red-600'>Things you should know:</span>
                        &nbsp;We don't spam & we reply within 24 hours!
                        </p>
                    </div>
                    </div>

                    <div>
                        <img
                            className="w-full rounded-md"
                            src="https://i.ibb.co/DgDWQmtq/edited-contact-reduced.png"
                            alt="Contact"
                        />
                    </div>
                </div>
            </section>

            <section>
                <MessageSection></MessageSection>
            </section>
        </div>
    );
};

export default Contact;