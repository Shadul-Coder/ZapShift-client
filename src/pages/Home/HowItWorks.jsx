import {
  FaTruck,
  FaMoneyBillWave,
  FaHubspot,
  FaBuilding,
} from "react-icons/fa";

const HowItWorks = () => {
  const features = [
    {
      id: 1,
      title: "Booking Pick & Drop",
      description:
        "Schedule pickup and delivery with just a few clicks. Our app makes it easy to book services, track your package, and receive real-time updates on your shipment's journey.",
      icon: <FaTruck />,
    },
    {
      id: 2,
      title: "Cash On Delivery",
      description:
        "Secure and convenient payment option for your customers. We handle cash collection on delivery and ensure timely settlement to your account with complete transparency.",
      icon: <FaMoneyBillWave />,
    },
    {
      id: 3,
      title: "Delivery Hub",
      description:
        "Access our extensive network of delivery hubs across the country. Efficient sorting, storage, and distribution ensure your packages reach their destination faster.",
      icon: <FaHubspot />,
    },
    {
      id: 4,
      title: "Booking SME & Corporate",
      description:
        "Tailored logistics solutions for businesses of all sizes. Bulk shipping, dedicated account managers, and customized delivery plans to optimize your supply chain.",
      icon: <FaBuilding />,
    },
  ];
  return (
    <section className="my-9 sm:my-11 md:my-13 lg:my-15">
      <div className="text-center mb-11 md:mb-15">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-secondary mb-3 md:mb-5">
          How it Works
        </h2>
        <p className="md:text-lg text-gray-600 max-w-3xl mx-auto">
          Simple, reliable, and efficient delivery solutions for all your needs
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-7">
        {features.map((feature) => (
          <div
            key={feature.id}
            className="bg-white rounded-2xl p-5 md:p-7 border border-gray-200"
          >
            <div className="mb-5 md:mb-6">
              <div className="w-15 h-15 bg-secondary text-white rounded-2xl flex items-center justify-center text-2xl">
                {feature.icon}
              </div>
            </div>
            <h3 className="text-xl font-bold text-secondary mb-3">
              {feature.title}
            </h3>
            <p className="text-gray-600 leading-relaxed text-justify">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
