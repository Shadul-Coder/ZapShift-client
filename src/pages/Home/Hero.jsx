import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation, Keyboard } from "swiper/modules";
import Typewriter from "typewriter-effect";
import { HiArrowRight } from "react-icons/hi2";
import { useNavigate } from "react-router";
import img1 from "../../assets/banner 1.png";
import img2 from "../../assets/banner 2.png";
import img3 from "../../assets/banner 3.png";
import { FaInfoCircle } from "react-icons/fa";
import { BsBoxes } from "react-icons/bs";
import { PiPersonSimpleBikeBold } from "react-icons/pi";

const Hero = () => {
  const navigate = useNavigate();
  const banners = [
    {
      id: 1,
      image: img1,
      title: "We Make Sure Your Parcel Arrives On Time – No Fuss",
      description:
        "Reliable delivery with real-time tracking and instant updates",
      buttonText: "Send Parcel",
      action: () => navigate("/dashboard/send-parcel"),
      secondaryButtonText: "Join as Rider",
      secondaryAction: () => navigate("/be-a-rider"),
      secondaryIcon: <PiPersonSimpleBikeBold />,
    },
    {
      id: 2,
      image: img2,
      title: "Fastest Delivery & Easy Pickup",
      description:
        "Swift pickup and delivery across all districts of Bangladesh",
      buttonText: "Track Order",
      action: () => navigate("/track-order"),
      secondaryButtonText: "My Parcels",
      secondaryAction: () => navigate("/dashboard/my-parcels"),
      secondaryIcon: <BsBoxes />,
    },
    {
      id: 3,
      image: img3,
      title: "Delivery in 30 Minutes at your doorstep",
      description:
        "Express delivery service for urgent parcels within city limits",
      buttonText: "Check Coverage",
      action: () => navigate("/coverage"),
      secondaryButtonText: "About Us",
      secondaryAction: () => navigate("/about-us"),
      secondaryIcon: <FaInfoCircle />,
    },
  ];
  return (
    <section className="w-full mt-3 sm:mt-3.5 md:mt-4 lg:mt-4.5">
      <Swiper
        spaceBetween={0}
        slidesPerView={1}
        centeredSlides={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        keyboard={{
          enabled: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation, Keyboard]}
        loop={true}
        className="w-full rounded-2xl"
      >
        {banners.map((banner) => (
          <SwiperSlide key={banner.id}>
            <div className="w-full h-[600px] sm:h-[650px] md:h-[700px] lg:h-[650px] xl:h-[670px] rounded-2xl overflow-hidden bg-white">
              <div className="w-full h-full px-6 sm:px-8 md:px-10 lg:px-16 xl:px-20 pt-12 sm:pt-15 md:pt-18 lg:pt-20 pb-10 flex flex-col lg:flex-row items-center justify-between md:gap-10">
                <div className="w-full lg:w-1/2 text-center lg:text-left">
                  <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-secondary mb-4 sm:mb-5 md:mb-6 min-h-[1.2em]">
                    <Typewriter
                      options={{
                        strings: [banner.title],
                        autoStart: true,
                        loop: true,
                        delay: 70,
                        deleteSpeed: 50,
                        cursor: "",
                      }}
                    />
                  </h1>
                  <p className="text-gray-600 text-base sm:text-lg md:text-xl lg:text-xl xl:text-2xl mb-6 sm:mb-7 md:mb-8 max-w-xl mx-auto lg:mx-0">
                    {banner.description}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center items-center lg:justify-start">
                    <button
                      onClick={banner.action}
                      className="bg-primary hover:bg-[#c3e460] active:bg-[#bddc5c] text-secondary w-fit font-semibold px-6 sm:px-7 py-3 sm:py-3.5 rounded-xl border border-primary hover:scale-101 active:scale-99 transition-all duration-300 text-base md:text-lg xl:text-xl cursor-pointer flex items-center justify-center gap-3"
                    >
                      {banner.buttonText}
                      <HiArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />
                    </button>
                    <button
                      onClick={banner.secondaryAction}
                      className="bg-white border-2 border-secondary text-secondary w-fit hover:bg-primary/5 font-semibold px-6 sm:px-7 py-3 sm:py-3.5 rounded-xl transition-all duration-300 text-base md:text-lg xl:text-xl cursor-pointer flex items-center justify-center gap-3"
                    >
                      {banner.secondaryIcon}
                      {banner.secondaryButtonText}
                    </button>
                  </div>
                </div>
                <div className="w-full lg:w-1/2 flex items-center justify-center lg:justify-end mt-4 lg:mt-0">
                  <img
                    src={banner.image}
                    alt={`Banner ${banner.id}`}
                    className="max-h-[200px] sm:max-h-[250px] md:max-h-[300px] lg:max-h-[380px] xl:max-h-[420px] w-auto object-contain"
                  />
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Hero;
