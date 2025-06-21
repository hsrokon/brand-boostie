import { useEffect } from 'react';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import AOS from 'aos';
import "aos/dist/aos.css";

const Stats = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const stats = [
    { label: 'Years of Experience', value: 4 },
    { label: 'Projects Delivered', value: 127 },
    { label: 'Happy Clients', value: 40 },
  ];

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.5, // start animation when 50% visible
  });

  return (
    <section
      ref={ref}
      className="bg-base-100 py-6 md:py-12 lg:py-16 px-4 md:px-0"
      data-aos="fade-up"
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="p-8 rounded-lg bg-gradient-to-r from-base-100 via-amber-100 to-base-100 bg-white hover:scale-105 transition-all duration-300"
          >
            <h3 className="text-4xl md:text-6xl font-bold text-primary">
              {inView ? <CountUp end={stat.value} duration={2} /> : '0'}+
            </h3>
            <p className="text-base-content mt-2 font-medium">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Stats;
