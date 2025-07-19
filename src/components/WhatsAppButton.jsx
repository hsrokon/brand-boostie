// src/components/WhatsAppButton.jsx
import { FaWhatsapp } from "react-icons/fa";

const WhatsAppButton = () => {
  const phone = "8801518989695";
  const message = encodeURIComponent("Hi, I'm interested in your services at BrandBoostie!");
  const link = `https://wa.me/${phone}?text=${message}`;

  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-18 lg:bottom-[5.3rem] right-[2rem] lg:right-[1.85rem] z-50 bg-green-500 text-white p-3 rounded-full shadow-lg hover:bg-green-600 transition duration-300"
    >
      <FaWhatsapp className=" lg:text-2xl" />
    </a>
  );
};

export default WhatsAppButton;
