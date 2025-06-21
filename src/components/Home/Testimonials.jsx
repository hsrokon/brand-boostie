import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";


const testimonials = [
  {
    id: 1,
    name: "Nusrat Karim",
    role: "Small Business Owner",
    message:
      "BrandBoostie helped me grow my online store by 300%! Their team is so responsive and knowledgeable.",
    photo: "https://i.ibb.co/xmSLVFt/testimonial-1.jpg",
  },
  {
    id: 2,
    name: "Omar Hossain",
    role: "Founder, TechEdu",
    message:
      "From SEO to email marketing, they nailed every campaign. Couldn't be happier with the results.",
    photo: "https://i.ibb.co/QdP0Tjv/testimonial-2.jpg",
  },
  {
    id: 3,
    name: "Fatima Rahman",
    role: "Marketing Lead, HalalMart",
    message:
      "Our traffic and conversions improved drastically after working with BrandBoostie. Highly recommended!",
    photo: "https://i.ibb.co/sPSyDhH/testimonial-3.jpg",
  },
  {
    id: 4,
    name: "Imran Ahmed",
    role: "Co-Founder, Zoon IT",
    message:
      "Their web team built us a fast, beautiful site and their strategy helped us scale effectively.",
    photo: "https://i.ibb.co/41LxYx4/testimonial-4.jpg",
  },
];

const getWrappedIndex = (index, length) => {
  return (index + length) % length;
};

const Testimonials = () => {
  const [index, setIndex] = useState(0);

  const handleNext = () => {
    setIndex((prev) => getWrappedIndex(prev + 1, testimonials.length));
  };

  const handlePrev = () => {
    setIndex((prev) => getWrappedIndex(prev - 1, testimonials.length));
  };

  const prevIndex = getWrappedIndex(index - 1, testimonials.length);
  const nextIndex = getWrappedIndex(index + 1, testimonials.length);

  useEffect(() => {
      AOS.init({ duration: 1000, once: true });
    }, []);

  return (
    <section className="bg-base-100 py-20 px-4 text-center overflow-hidden" data-aos="fade-up">
      <h2 className="text-3xl md:text-4xl font-bold text-primary mb-10">
        What Our Clients Say
      </h2>

      <div className="relative max-w-5xl mx-auto h-[22rem] flex items-center justify-center">
        {/* Left Arrow */}
        <button
          onClick={handlePrev}
          className="absolute left-0 z-20 border border-primary md:border-0 md:bg-primary text-white p-2 rounded-full hover:bg-primary/90 transition"
        >
          <ChevronLeft size={24} className="text-primary md:text-inherit" />
        </button>

        {/* Testimonials */}
        <div className="relative w-full flex justify-center items-center">
          <AnimatePresence mode="popLayout">
            {[prevIndex, index, nextIndex].map((i, position) => {
              const isCenter = i === index;
              const offset = position - 1;

              return (
                <motion.div
                  key={testimonials[i].id}
                  initial={{ opacity: 0, scale: 0.8, x: offset * 300 }}
                  animate={{
                    opacity: isCenter ? 1 : 0.6,
                    scale: isCenter ? 1.1 : 0.9,
                    x: offset * 300,
                    zIndex: isCenter ? 10 : 0,
                    filter: isCenter ? "blur(0px)" : "blur(2px)",
                  }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.5 }}
                  className={`absolute w-[90%] md:w-[24rem] bg-white p-6 rounded-xl shadow-lg`}
                >
                  <p className="text-md text-base-content font-semibold leading-relaxed italic mb-4">
                    “{testimonials[i].message}”
                  </p>

                  <div className="flex items-center gap-4 justify-center mt-4">
                    <img
                      src={testimonials[i].photo}
                      alt={testimonials[i].name}
                      className="w-12 h-12 rounded-full object-cover border-2 border-primary"
                    />
                    <div className="text-left">
                      <h4 className="text-base font-semibold text-primary">
                        {testimonials[i].name}
                      </h4>
                      <p className="text-sm text-accent">{testimonials[i].role}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Right Arrow */}
        <button
          onClick={handleNext}
          className="absolute right-0 z-20 border border-primary md:border-0 md:bg-primary text-white p-2 rounded-full hover:bg-primary/90 transition"
        >
          <ChevronRight size={24} className="text-primary md:text-inherit"/>
        </button>
      </div>
    </section>
  );
};

export default Testimonials;
