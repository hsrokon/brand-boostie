import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/autoplay';
import { Autoplay } from 'swiper/modules';
import { Link } from 'react-router-dom';

const BannerSlider = () => {
  const banners = [
    'https://i.ibb.co/W498HgJr/1-reduced.png',
    'https://i.ibb.co/twNFzKCb/2-reduced.png',
    'https://i.ibb.co/R46N8sJt/3-reduced.png',
    'https://i.ibb.co/pBjFmshP/4-reduced.png',
    'https://i.ibb.co/7xY2Dxk4/5.png',
    'https://i.ibb.co/0dMpqyk/6-reduced.png',
    'https://i.ibb.co/qF3R2CMm/7-reduced.png',
  ];

  return (
    <div className="relative w-full h-44 md:h-96 lg:h-[31rem] xl:h-[40rem] overflow-hidden">
      {/* Swiper in background */}
      <Swiper
        modules={[Autoplay]}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop={true}
        className="absolute inset-0 z-0"
      >
        {banners.map((img, idx) => (
          <SwiperSlide key={idx}>
            <img
              src={img}
              className="w-full h-full object-cover"
              alt={`Banner ${idx + 1}`}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Static content on top */}
      <div className="absolute inset-0 bg-black/50 z-10 flex items-center justify-center">
        <div className="text-center text-white space-y-4">
          <h1 className="md:text-3xl lg:text-4xl font-bold">Grow your business online  with <br /> smart, tailored digital <br />marketing strategies.</h1>
          <Link to={'/about'}>
            <button className="btn btn-sm md:btn-md border-none md:px-6 md:py-6 text-xs md:text-sm lg:text-[1rem] bg-white text-primary font-semibold rounded-md shadow hover:bg-gray-100 transition">
              Learn More
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BannerSlider;