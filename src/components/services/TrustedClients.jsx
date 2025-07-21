import { useEffect, useState } from "react";

const TrustedClients = () => {
  const [testimonials, setTestimonials] = useState([]);

  const VISIBLE_LIMIT = 6; // how many avatars to show before +X more
  useEffect(() => {
    fetch("https://brand-boostie-server.vercel.app/testimonials")
      .then(res => res.json())
      .then(data => setTestimonials(data))
      .catch(err => console.error("Failed to fetch testimonials:", err));
  }, []);

  const visibleTestimonials = testimonials.slice(0, VISIBLE_LIMIT);
  const extraCount = testimonials.length - VISIBLE_LIMIT;

  return (
    <section className="py-32 px-6 bg-base-100 text-center" data-aos="fade-up">
      <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">
        Trusted by Businesses Like Yours
      </h2>
      <p className="text-sm md:text-lg mb-6 max-w-2xl mx-auto text-base-content">
        From startups to local shops, our clients love the results we deliver.
      </p>

      <div className="flex justify-center flex-wrap gap-6">
        {visibleTestimonials.map((user, index) => (
          <div key={index} className="relative group">
            <img
              src={user.photo}
              alt={user.name}
              className="h-10 md:h-12 w-10 md:w-12 rounded-full object-cover cursor-pointer border border-primary"
            />
            <div className="absolute bottom-[-1.8rem] left-1/2 -translate-x-1/2 bg-primary text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition">
              {user.name}
            </div>
          </div>
        ))}

        {extraCount > 0 && (
          <div className="h-10 md:h-12 w-10 md:w-12 rounded-full bg-accent text-white font-semibold flex items-center justify-center text-sm">
            +{extraCount}
          </div>
        )}
      </div>
    </section>
  );
};

export default TrustedClients;
