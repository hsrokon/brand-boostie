import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUp } from "lucide-react";

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 200);
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <motion.button
      onClick={scrollToTop}
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.4 }}
      className="fixed bottom-6 right-8 lg:right-6 z-50 rounded-full bg-primary text-white p-3 shadow-lg 
                 hover:shadow-[0_0_20px_rgba(18,84,161,0.7)] transition-shadow duration-300
                 group"
      title="Back to top" // ✅ Tooltip
    >
      <motion.div
        animate={{
          y: [0, -5, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 1.5,
        }}
      >
        <ArrowUp className="w-4 h-4 lg:w-7 lg:h-7 group-hover:scale-110 transition-transform" />
      </motion.div>
    </motion.button>
  );
};

export default ScrollToTopButton;