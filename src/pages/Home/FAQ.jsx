import { motion } from "motion/react";

const FAQ = () => {
  const faqs = [
    {
      id: 1,
      question: "How does the delivery process work?",
      answer:
        "Our delivery process is simple and efficient. After booking, we pick up your package, process it at our nearest hub, and deliver it to the destination within the promised timeframe. You can track your shipment in real-time through our app or website.",
    },
    {
      id: 2,
      question: "Is your service available nationwide in Bangladesh?",
      answer:
        "Yes, we provide nationwide coverage with home delivery in every district. Whether you're in Dhaka, Chittagong, Sylhet, Khulna, Rajshahi, or any other district, we ensure your packages reach within 48–72 hours.",
    },
    {
      id: 3,
      question: "How does Cash on Delivery (COD) work?",
      answer:
        "With our COD service, customers pay in cash when receiving their packages. We collect the payment and transfer it to your account within our settlement cycle, providing complete transparency and guaranteed safety for your products.",
    },
    {
      id: 4,
      question: "Do you offer corporate or bulk shipping solutions?",
      answer:
        "Absolutely! We provide customized corporate services including warehouse support, inventory management, dedicated account managers, and tailored delivery plans to optimize your business's supply chain and logistics needs.",
    },
    {
      id: 5,
      question: "What is your parcel return policy?",
      answer:
        "Through our reverse logistics facility, customers can return or exchange products with online business merchants. We handle the pickup, processing, and delivery of returns, making the process hassle-free for both merchants and customers.",
    },
    {
      id: 6,
      question: "How can I track my shipment?",
      answer:
        "You can track your shipment in real-time using our mobile app or website. Simply enter your tracking number to get live updates on your package's location and estimated delivery time.",
    },
  ];
  return (
    <section className="my-9 sm:my-11 md:my-13 lg:my-15">
      <motion.div
        className="text-center mb-11 md:mb-15"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-secondary mb-3 md:mb-5">
          Frequently Asked Questions
        </h2>
        <p className="md:text-lg text-gray-600 max-w-3xl mx-auto">
          Get answers to common questions about our delivery services, tracking,
          payments, and more. Experience hassle-free logistics with reliable
          parcel delivery solutions.
        </p>
      </motion.div>
      <motion.div
        className="max-w-4xl mx-auto"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="space-y-3 md:space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={faq.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <div className="group">
                <motion.div
                  className="collapse collapse-arrow bg-white border border-gray-200 rounded-2xl group-hover:shadow-sm transition-all duration-300"
                  whileHover={{ scale: 1.005 }}
                >
                  <input
                    type="radio"
                    name="faq-accordion"
                    defaultChecked={index === 0}
                  />
                  <div className="collapse-title font-semibold text-secondary text-lg">
                    <motion.div
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      {faq.question}
                    </motion.div>
                  </div>
                  <motion.div
                    className="collapse-content text-gray-600"
                    initial={false}
                  >
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className="pt-2"
                    >
                      {faq.answer}
                    </motion.p>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default FAQ;
