import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const teamMembers = [
  {
    name: "Esrat Jahan Mimmi",
    role: "Head of SEO team",
    image: "https://i.ibb.co/SD7NzZRQ/member-1.jpg",
  },
  {
    name: "Md Galib Al Zidan",
    role: "Founder & CEO, Ads & Email Expert",
    image: "https://i.ibb.co/Kp6CPJLC/member-2.jpg",
  },
  {
    name: "Hussain Shahriar Rokon",
    role: "Web Developer",
    image: "https://i.ibb.co/C5Dr1yGz/member-3.png",
  },
];

const Team = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <div className="py-20 px-4 max-w-7xl mx-auto text-center">
      <h2
        className="text-3xl md:text-4xl font-bold text-primary mb-4"
        data-aos="fade-down"
      >
        Meet Our Core Team
      </h2>
      <p
        className="text-base-content max-w-2xl mx-auto mb-12"
        data-aos="fade-up"
      >
        We are thrilled to introduce the core members of our team. Each
        individual brings a wealth of experience, creativity, and passion to our
        organization.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {teamMembers.map((member, index) => (
          <div
            key={index}
            data-aos="zoom-in"
            data-aos-delay={index * 150}
            className="relative overflow-hidden group rounded-xl shadow-md"
          >
            <img
              src={member.image}
              alt={member.name}
              className="w-full h-60 md:h-72 lg:h-80 xl:h-96 object-cover transition-transform duration-500 group-hover:scale-105"
            />

            <div className="absolute bottom-0 left-0 w-full p-5 text-left z-10">
              <div className="relative inline-block">
                <h3 className="relative z-10 text-xl font-bold text-white">
                  {member.name}
                </h3>
                <span className="absolute inset-0 bg-primary transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-in-out z-0 rounded-sm"></span>
              </div>
              <br />
              <div className="relative inline-block mt-1">
                <p className="relative z-10 text-sm text-white">
                  {member.role}
                </p>
                <span className="absolute inset-0 bg-accent transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-in-out z-0 rounded-sm"></span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Team;
