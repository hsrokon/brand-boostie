import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";
import { Link } from "react-router-dom";

const getWrappedIndex = (index, length) => {
  return (index + length) % length;
};

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
    fetch("https://brand-boostie-server.vercel.app/testimonials")
      .then((res) => res.json())
      .then((data) => {
        //setTestimonials(data.reverse()); // latest first
        setTestimonials(data); // latest first
      });
  }, []);

  const handleNext = () => {
    setIndex((prev) => getWrappedIndex(prev + 1, testimonials.length));
  };

  const handlePrev = () => {
    setIndex((prev) => getWrappedIndex(prev - 1, testimonials.length));
  };

  const prevIndex = getWrappedIndex(index - 1, testimonials.length);
  const nextIndex = getWrappedIndex(index + 1, testimonials.length);

  return (
    <section className="bg-base-100 py-20 px-4 text-center overflow-hidden" data-aos="fade-up">
      <h2 className="text-3xl md:text-4xl font-bold text-primary mb-10">
        What Our Clients Say
      </h2>

      {testimonials.length === 0 ? (
        <>
          <p className="text-accent mb-6">No testimonials available yet.</p>
        </>
      ) : (
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
                    key={testimonials[i]._id}
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
            <ChevronRight size={24} className="text-primary md:text-inherit" />
          </button>
        </div>
      )}

      {/* Always show Add Testimony button */}
      <Link
        to={"/user/addTestimony"}
        title="Click to add a testimony if you've taken our service before."
        className="mt-10 inline-block px-6 py-2 rounded-xl bg-primary text-white hover:bg-primary/90 transition"
      >
        Add Testimony
      </Link>
    </section>
  );
};

export default Testimonials;
