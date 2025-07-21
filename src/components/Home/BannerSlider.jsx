import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/autoplay';
import { Autoplay } from 'swiper/modules';
import { Link } from 'react-router-dom';

const BannerSlider = () => {
  const banners = [
    'https://i.ibb.co/4R931WtB/1.webp',
    'https://i.ibb.co/LXBnLGRh/2.webp',
    'https://i.ibb.co/W4fgkqn5/3.webp',
    'https://i.ibb.co/wFjV1hy9/4.webp',
    'https://i.ibb.co/Z1cQK9js/5.webp',
    'https://i.ibb.co/xqLyXxWN/6.webp',
    'https://i.ibb.co/d418NZQs/7.webp',
  ];

  return (
    <div className="relative w-full overflow-hidden 
    h-[25vh]
    sm:h-[30vh]  
    md:h-[36vh]
    lg:h-[32rem] 
    xl:h-[40rem] ">

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
          <h1 className="text-xl md:text-3xl lg:text-4xl font-bold">Grow your business online  with <br /> smart, tailored digital <br />marketing strategies.</h1>
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