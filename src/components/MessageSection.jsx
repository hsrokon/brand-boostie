import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import emailjs from "emailjs-com";
import AOS from "aos";
import "aos/dist/aos.css";
import Swal from "sweetalert2";
import { useState } from "react";

const MessageSection = () => {
  const form = useRef();

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const [loading, setLoading] = useState(false);

  const sendEmail = (e) => {
      e.preventDefault();
      setLoading(true);

      emailjs.sendForm(
        'service_70x9e51',
        'template_oc2047k',
        form.current,
        'gW7WrVtHZVykpscjy'
      )
      .then((result) => {
        console.log('Email sent:', result.text);
        Swal.fire({
          title: "Message sent successfully!",
          icon: "success",
        });
        
        form.current.reset();
      })
      .catch((error) => {
        console.error('Email error:', error.text);
        Swal.fire({
          title: "Message failed to send!",
          icon: "error",
        });
      })
      .finally(() => {
        setLoading(false);
      });
    };


  return (
    <section className="bg-base-200 py-14 lg:py-20 px-6 mb-30 text-center" id="contact" data-aos="fade-up">
      <div className="md:max-w-2xl lg:max-w-3xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold text-primary mb-4"
        >
          Send Us a Message
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-base-content text-sm lg:text-base mb-10"
        >
          We'd love to hear from you. Fill out the form below and we'll get back to you.
        </motion.p>

        <motion.form
          ref={form}
          onSubmit={sendEmail}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="space-y-6 text-left"
        >
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              required
              className="w-full px-2 lg:px-4 py-3 rounded-md border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary placeholder:text-sm lg:placeholder:text-base"
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              required
              className="w-full px-2 lg:px-4 py-3 rounded-md border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary placeholder:text-sm lg:placeholder:text-base"
            />
          </div>

          <textarea
            name="message"
            placeholder="Your Message"
            rows="5"
            required
            className="w-full px-2 lg:px-4 py-3 rounded-md border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary placeholder:text-sm lg:placeholder:text-base"
          ></textarea>

          <button
            type="submit"
            disabled={loading}
            className="bg-primary text-white w-full cursor-pointer font-semibold px-6 py-3 rounded-md hover:bg-primary/90 transition"
          >
            {loading ? "Sending..." : "Send Message"}
          </button>

        </motion.form>
      </div>
    </section>
  );
};

export default MessageSection;
