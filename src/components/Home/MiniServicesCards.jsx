import { RiAdvertisementFill } from "react-icons/ri";
import { PiRankingFill } from "react-icons/pi";
import { FiGlobe, FiMail } from "react-icons/fi";

const MiniServicesCards = () => {
  return (
    <div className="p-4 w-11/12 md:w-9/12 mx-auto">
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
        <Card
          title="Ads Campaign"
          subtitle="Targeted ads to boost brand visibility and engagement."
          href="#"
          Icon={RiAdvertisementFill}
        />
        <Card
          title="Full Local SEO"
          subtitle="Improve your local search ranking and drive nearby traffic."
          href="#"
          Icon={PiRankingFill}
        />
        <Card
          title="Website"
          subtitle="Modern, responsive websites tailored to your brand."
          href="#"
          Icon={FiGlobe}
        />
        <Card
          title="Email Marketing"
          subtitle="Convert leads through strategic and automated email flows."
          href="#"
          Icon={FiMail}
        />
      </div>
    </div>
  );
};

const Card = ({ title, subtitle, Icon, href }) => {
  return (
    <a
      href={href}
      className="w-full p-6 h-56 rounded-2xl text-center border border-primary relative overflow-hidden group bg-gradient-to-tr from-base-100 via-base-100 to-base-300 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
    >
      {/* Hover gradient slide-up */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out z-0" />

      {/* Faint background icon */}
      <Icon
        className="absolute z-0 -top-12 -right-12 text-[7rem] text-base-300 group-hover:text-accent group-hover:rotate-12 transition-transform duration-300"
        style={{ opacity: 0.3 }}
      />

      {/* Foreground icon */}
      <Icon
        className="mb-3 text-4xl relative z-10 transition-colors duration-300 text-secondary"
      />

      {/* Title */}
      <h3 className="font-semibold text-lg lg:text-2xl text-accent group-hover:text-white relative z-10 transition-colors duration-300">
        {title}
      </h3>

      {/* Subtitle */}
      <p className="text-sm lg:text-base text-primary group-hover:text-base-100 relative z-10 transition-colors duration-300 px-2">
        {subtitle}
      </p>
    </a>
  );
};

export default MiniServicesCards;
