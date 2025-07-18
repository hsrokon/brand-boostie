import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const MiniPricingCard = ({ plan }) => {
  return (
    <section className="bg-base-100 w-full h-full">
        <Card plan={plan} />
    </section>
  );
};

const Card = ({ plan }) => {
  const {
    id,
    slug,
    category,
    title,
    tagline,
    price,
    originalPrice,
    currency,
    frequency,
    highlighted,
    planCategory,
    features,
    cta,
  } = plan;

  return (
    <motion.div
      whileHover="hover"
      transition={{ duration: 1, ease: "backInOut" }}
      variants={{ hover: { scale: 1.05 } }}
      className={`relative w-full h-full min-h-[22.5rem] lg:h-[25rem] max-w-[16rem] md:max-w-[18rem] lg:md:max-w-[19.5rem] xl:max-w-sm mx-auto 
        overflow-hidden rounded-xl 
        ${planCategory === 'Professional' ? 'bg-accent min-h-[24rem]' : 'bg-primary '} 
        ${id.split('-')[1]%2==0 ? 'md:mt-8 lg:mt-0 xl:mt-12' : ''}
        p-6 sm:p-8 shadow-lg`}

    >
      <div className="relative z-10 text-base-100">
        <div className="flex justify-between">
          <span className="mb-3 block w-fit rounded-full bg-white/20 px-3 py-0.5 text-sm font-light">
          {category}
        </span>
        
        {
          originalPrice && <span className="block w-fit rounded-full text-xl line-through font-medium">
          ৳{originalPrice}
        </span>
        }
      </div>
        

        <motion.span
          initial={{ scale: 0.85 }}
          variants={{ hover: { scale: 1 } }}
          transition={{ duration: 1, ease: "backInOut" }}
          className="my-2 block origin-top-left font-mono text-4xl md:text-5xl font-black leading-[1.2]"
        >
          ৳{price}
          <span className="text-sm font-normal ml-1">{frequency}</span>
        </motion.span>

        <motion.span
          initial={{ scale: 0.85 }}
          variants={{ hover: { scale: 1 } }}
          transition={{ duration: 1, ease: "backInOut" }}
          className="my-2 block origin-top-left font-mono text-xl sm:text-2xl lg:text-3xl font-black leading-tight"
        >
          {title}
        </motion.span>

        {/* Feature list */}
        <ul className="mt-2 list-disc list-inside space-y-1 text-sm text-white">
          {features.map((feature, idx) => (
            <li key={idx}>{feature}</li>
          ))}
        </ul>
      </div>

      {/* CTA Button */}
      <Link
        to="/pricing"
        className="absolute bottom-4 left-4 right-4 z-20 rounded border-2 border-base-100 bg-base-100 py-2 text-center font-mono font-bold uppercase text-primary backdrop-blur transition-colors hover:bg-transparent hover:text-base-100"
      >
        {cta}
      </Link>

      <Background />
    </motion.div>
  );
};

const Background = () => {
  return (
    <motion.svg
      width="320"
      height="384"
      viewBox="0 0 320 384"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute inset-0 z-0"
      variants={{ hover: { scale: 1.5 } }}
      transition={{ duration: 1, ease: "backInOut" }}
    >
      <motion.circle
        variants={{ hover: { scaleY: 0.5, y: -25 } }}
        transition={{ duration: 1, ease: "backInOut", delay: 0.2 }}
        cx="160.5"
        cy="114.5"
        r="101.5"
        fill="var(--color-base-content)"
      />
      <motion.ellipse
        variants={{ hover: { scaleY: 2.25, y: -25 } }}
        transition={{ duration: 1, ease: "backInOut", delay: 0.2 }}
        cx="160.5"
        cy="265.5"
        rx="101.5"
        ry="43.5"
        fill="var(--color-base-content)"
      />
    </motion.svg>
  );
};

export default MiniPricingCard;
