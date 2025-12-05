import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import topimg from "../../assets/customer-top.png";
import quote from "../../assets/reviewQuote.png";

const Reviews = () => {
  const reviews = [
    {
      user_email: "john.doe@example.com",
      userName: "John Doe",
      review:
        "Smooth delivery and polite staff. The tracking system kept me informed throughout the journey. Package arrived in perfect condition.",
      user_photoURL: "https://randomuser.me/api/portraits/men/10.jpg",
    },
    {
      user_email: "jane.smith@example.com",
      userName: "Jane Smith",
      review:
        "Took a bit longer than expected, but okay overall. Delivery personnel were courteous and professional during handover.",
      user_photoURL: "https://randomuser.me/api/portraits/women/25.jpg",
    },
    {
      user_email: "alex.brown@example.com",
      userName: "Alex Brown",
      review:
        "Excellent service! Fast and secure delivery with real-time updates. Will definitely use again for business shipments.",
      user_photoURL: "https://randomuser.me/api/portraits/men/34.jpg",
    },
    {
      user_email: "lisa.white@example.com",
      userName: "Lisa White",
      review:
        "Very responsive and professional. Customer support was helpful when I had questions about delivery options.",
      user_photoURL: "https://randomuser.me/api/portraits/women/12.jpg",
    },
    {
      user_email: "david.lee@example.com",
      userName: "David Lee",
      review:
        "Late delivery and no updates. Disappointed with the communication. Tracking wasn't updated for days.",
      user_photoURL: "https://randomuser.me/api/portraits/men/19.jpg",
    },
    {
      user_email: "nina.khan@example.com",
      userName: "Nina Khan",
      review:
        "Superb experience! Highly recommended. Seamless process from booking to delivery with careful handling.",
      user_photoURL: "https://randomuser.me/api/portraits/women/8.jpg",
    },
    {
      user_email: "michael.jordan@example.com",
      userName: "Michael Jordan",
      review:
        "Decent service but packaging could be better. Delivery was on time but external packaging showed wear.",
      user_photoURL: "https://randomuser.me/api/portraits/men/22.jpg",
    },
    {
      user_email: "emma.watson@example.com",
      userName: "Emma Watson",
      review:
        "Fast, safe, and friendly delivery service. Cash on delivery option worked perfectly for my online business.",
      user_photoURL: "https://randomuser.me/api/portraits/women/5.jpg",
    },
  ];
  return (
    <section className="my-9 sm:my-11 md:my-13 lg:my-15">
      <div className="text-center mb-11 md:mb-15">
        <img
          src={topimg}
          alt="Decorative"
          className="mx-auto mb-5 w-33 sm:w-35 md:w-37 lg:w-40 xl:w-45"
        />
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-secondary mb-3 md:mb-5">
          What our customers are saying
        </h2>
        <p className="md:text-lg text-gray-600 max-w-3xl mx-auto">
          Experience hassle-free delivery with reliable parcel services. From
          personal packages to business shipments — we deliver satisfaction on
          time, every time!
        </p>
      </div>
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        loop={true}
        pagination={{
          clickable: true,
        }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        breakpoints={{
          640: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
        }}
      >
        {reviews.map((review, index) => (
          <SwiperSlide key={index}>
            <div className="bg-white rounded-2xl p-5 sm:p-6 md:p-7 border border-gray-200 h-full flex flex-col mb-11 sm:mb-12 md:mb-13">
              <div>
                <img
                  src={quote}
                  alt="Quote"
                  className="w-10 h-10 sm:h-11 sm:w-11 md:h-12 md:w-12 lg:h-13 lg:w-13 mb-3"
                />
              </div>
              <div className="grow h-[90px] sm:h-[110px] mb-5">
                <p className="text-gray-600 leading-relaxed text-justify italic line-clamp-4">
                  "{review.review}"
                </p>
              </div>
              <div className="pt-5 border-t-2 border-[#33929d] border-dashed">
                <div className="flex items-center gap-3">
                  <img
                    src={review.user_photoURL}
                    alt={review.userName}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-semibold text-secondary">
                      {review.userName}
                    </h4>
                    <p className="text-sm text-gray-500">Customer</p>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Reviews;
