import img1 from "../../assets/live-tracking.png";
import img2 from "../../assets/safe-delivery.png";
import img3 from "../../assets/center-support.png";

const Benefits = () => {
  const benefits = [
    {
      id: 1,
      title: "Live Parcel Tracking",
      description:
        "Stay updated in real-time with our live parcel tracking feature. From pick-up to delivery, monitor your shipment's journey and get instant status updates for complete peace of mind.",
      image: img1,
    },
    {
      id: 2,
      title: "100% Safe Delivery",
      description:
        "We ensure your parcels are handled with the utmost care and delivered securely to their destination. Our reliable process guarantees safe and damage-free delivery every time.",
      image: img2,
    },
    {
      id: 3,
      title: "24/7 Call Center Support",
      description:
        "Our dedicated support team is available around the clock to assist you with any questions, updates, or delivery concerns—anytime you need us.",
      image: img3,
    },
  ];
  return (
    <section className="my-9 sm:my-11 md:my-13 lg:my-15">
      <div className="text-center mb-11 md:mb-15">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-secondary mb-3 md:mb-5">
          Why Choose Our Service
        </h2>
        <p className="md:text-lg text-gray-600 max-w-3xl mx-auto">
          Experience unparalleled delivery services with features designed for
          your convenience and peace of mind
        </p>
      </div>
      <div className="max-w-6xl mx-auto space-y-5 sm:space-y-6 md:space-y-7">
        {benefits.map((benefit) => (
          <div
            key={benefit.id}
            className="bg-white rounded-2xl p-5 md:p-7 border border-gray-200 flex items-center gap-5 md:gap-7 min-h-[200px]"
          >
            <div className="w-1/5 md:w-1/6 lg:w-1/7 shrink-0">
              <div className="relative">
                <img
                  src={benefit.image}
                  alt={benefit.title}
                  className="h-15 w-15 sm:h-17 sm:w-17 md:h-23 md:w-23 lg:h-27 lg:w-27 object-contain mx-auto"
                />
                <div className="absolute right-0 top-1/2 pl-2 transform -translate-y-1/2 translate-x-1/2 w-0 h-3/4 border-r-2 border-dashed border-gray-300"></div>
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-xl md:text-2xl font-bold text-secondary mb-3 md:mb-4">
                {benefit.title}
              </h3>
              <p className="text-gray-600 leading-relaxed text-justify">
                {benefit.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Benefits;
