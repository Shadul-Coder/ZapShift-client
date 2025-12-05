import {
  FaRocket,
  FaMapMarkedAlt,
  FaBoxOpen,
  FaMoneyBillWave,
  FaBuilding,
  FaExchangeAlt,
} from "react-icons/fa";

const OurServices = () => {
  const services = [
    {
      id: 1,
      title: "Express & Standard Delivery",
      description:
        "We deliver parcels within 24–72 hours in Dhaka, Chittagong, Sylhet, Khulna, and Rajshahi. Express delivery available in Dhaka within 4–6 hours from pick-up to drop-off.",
      icon: <FaRocket />,
    },
    {
      id: 2,
      title: "Nationwide Delivery",
      description:
        "We deliver parcels nationwide with home delivery in every district, ensuring your products reach customers within 48–72 hours.",
      icon: <FaMapMarkedAlt />,
    },
    {
      id: 3,
      title: "Fulfillment Solution",
      description:
        "We also offer customized service with inventory management support, online order processing, packaging, and other sales support.",
      icon: <FaBoxOpen />,
    },
    {
      id: 4,
      title: "Cash on Home Delivery",
      description:
        "100% cash on delivery anywhere in Bangladesh with guaranteed safety of your product.",
      icon: <FaMoneyBillWave />,
    },
    {
      id: 5,
      title: "Corporate Service",
      description:
        "Customized corporate services which includes warehouse and inventory management support.",
      icon: <FaBuilding />,
    },
    {
      id: 6,
      title: "Parcel Return",
      description:
        "Through our reverse logistics facility we allow customers to return or exchange their products with online business merchants.",
      icon: <FaExchangeAlt />,
    },
  ];
  return (
    <section className="my-9 sm:my-11 md:my-13 lg:my-15 bg-secondary rounded-2xl p-5 sm:p-7 md:p-9 lg:p-11 xl:p-13">
      <div className="text-center mb-11 md:mb-15">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-5 text-white">
          Our Services
        </h2>
        <p className="md:text-lg max-w-3xl mx-auto text-gray-200">
          Enjoy fast reliable parcel delivery with real-time tracking and
          zero-hassle. From personal packages to business shipments — we deliver
          on time, every time.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-7">
        {services.map((service) => (
          <div
            key={service.id}
            className="bg-white hover:bg-[#FDFEF9] transition-colors duration-200 rounded-2xl p-5 md:p-7"
          >
            <div className="mb-5 md:mb-6">
              <div className="w-15 h-15 bg-gray-200 mx-auto text-secondary rounded-2xl flex items-center justify-center text-2xl">
                {service.icon}
              </div>
            </div>
            <h3 className="text-xl font-bold text-secondary text-center mb-3">
              {service.title}
            </h3>
            <p className="text-gray-600 leading-relaxed text-center">
              {service.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default OurServices;
