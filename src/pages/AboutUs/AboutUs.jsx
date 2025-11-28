import { useState } from "react";

const AboutUs = () => {
  const [select, setSelect] = useState("Story");
  const data = [
    [
      "Story",
      <>
        <p className="mb-5">
          ZapShift emerged from a fundamental need to revolutionize the parcel
          delivery industry. Founded in 2019 by logistics veterans Sarah Chen
          and Marcus Rodriguez, our journey began with a simple observation:
          traditional delivery systems were failing to keep pace with the
          digital age. While e-commerce was booming, last-mile delivery remained
          plagued by inefficiencies, poor communication, and unreliable
          timelines. Our founders, having experienced these challenges firsthand
          while managing their own e-commerce ventures, set out to build a
          solution that would bridge this critical gap.
        </p>
        <p>
          Starting with just three delivery vehicles and a small office in
          downtown Seattle, we focused on developing a proprietary tracking
          system that provided unprecedented visibility into the delivery
          process. Our breakthrough came with the development of our real-time
          GPS tracking and automated route optimization algorithms, which
          reduced delivery times by 35% in our first year of operation. As word
          spread about our reliable service and transparent operations, we
          quickly expanded from serving local businesses to partnering with
          major corporations across the country. Today, ZapShift stands as a
          testament to innovation meeting execution, having successfully
          delivered over 2.5 million packages while maintaining a 99.2% on-time
          delivery rate. Our story continues to evolve as we embrace emerging
          technologies like AI-powered logistics and sustainable delivery
          methods, always staying true to our core mission of making parcel
          delivery seamless, reliable, and completely stress-free for businesses
          and individuals alike.
        </p>
      </>,
    ],
    [
      "Mission",
      <>
        <p className="mb-5">
          At the heart of ZapShift lies an unwavering commitment to transforming
          the parcel delivery experience through technological innovation and
          operational excellence. Our mission extends beyond simply moving
          packages from point A to point B; we aim to create an ecosystem where
          logistics become a strategic advantage for businesses and a delightful
          experience for end-customers. We are dedicated to developing
          intelligent solutions that anticipate market needs, from our AI-driven
          delivery forecasting that helps businesses optimize their shipping
          schedules to our carbon-neutral delivery options that support
          environmental sustainability.
        </p>
        <p>
          Our comprehensive approach encompasses every aspect of the delivery
          journey: we've built a robust infrastructure that ensures 99.9% system
          uptime, implemented machine learning algorithms that continuously
          improve route efficiency, and established a customer service framework
          that resolves 95% of inquiries within 15 minutes. Beyond operational
          metrics, our mission drives us to foster economic growth by enabling
          small and medium businesses to compete on equal footing with larger
          corporations through affordable, reliable logistics. We measure our
          success not just in packages delivered, but in businesses empowered,
          customer relationships strengthened, and communities connected through
          seamless delivery experiences that build trust and drive commerce
          forward in an increasingly digital world.
        </p>
      </>,
    ],
    [
      "Success",
      <>
        <p className="mb-5">
          ZapShift's success story is written in the numbers that matter most to
          our clients and partners. Since our inception, we have achieved
          remarkable milestones that underscore our position as an industry
          leader in innovative logistics solutions. Our operational excellence
          is demonstrated through consistent performance metrics: we maintain a
          98.7% on-time delivery rate across all service tiers, process over
          75,000 parcels monthly with 99.9% accuracy, and have achieved a
          customer satisfaction rating of 4.8 stars across all review platforms.
        </p>
        <p>
          The implementation of our digital proof-of-delivery system has
          revolutionized accountability in last-mile delivery, reducing delivery
          disputes by 92% and providing businesses with instant confirmation and
          documentation for every shipment. Our technological advancements have
          yielded significant efficiencies across the board – our automated
          booking system has reduced processing time by 67%, while our smart
          routing technology has decreased fuel consumption by 28% and improved
          delivery capacity by 45%. Perhaps most importantly, our success is
          reflected in the growth of our partner businesses, with 83% of our
          commercial clients reporting increased customer satisfaction and 67%
          experiencing growth in repeat orders directly attributable to our
          reliable delivery services.
        </p>
      </>,
    ],
    [
      "Team & Others",
      <>
        <p className="mb-5">
          The ZapShift team represents the perfect synergy of logistics
          expertise and technological innovation, comprising over 200 dedicated
          professionals across multiple disciplines. Our leadership team brings
          together decades of combined experience in supply chain management,
          software development, and customer experience design, while our ground
          operations crew includes certified logistics professionals trained in
          handling everything from sensitive documents to specialized commercial
          shipments. What truly sets our team apart is our culture of continuous
          improvement and collaborative problem-solving.
        </p>
        <p>
          We've established the ZapShift Innovation Lab where cross-functional
          teams work on developing next-generation delivery solutions, resulting
          in 15 patented technologies that have redefined industry standards.
          Beyond our core operations, ZapShift maintains a strong commitment to
          corporate social responsibility through multiple community
          initiatives. Our 'ZAPCARE' program provides pro-bono delivery services
          to over 150 non-profit organizations annually, while 'ZAPGROW' offers
          subsidized shipping solutions to emerging small businesses.
          Environmental responsibility remains a key focus, with 65% of our
          delivery fleet now comprising electric vehicles and our packaging
          optimization system reducing material waste by 42%.
        </p>
      </>,
    ],
  ];
  return (
    <>
      <title>About Us | ZapShift</title>
      <section className="bg-white my-3 sm:my-3.5 md:my-4 lg:my-4.5 p-6 sm:p-9 md:p-11 lg:p-13 xl:p-15 max-w-7xl mx-auto w-[95%] lg:w-[97%] rounded-2xl">
        <h1 className="text-3xl md:text-start my-7 lg:text-5xl sm:my-9 md:mt-0 lg:mb-11 font-bold text-center sm:text-4xl">
          About Us
        </h1>
        <p className="text-center lg:w-[60%] sm:text-lg md:text-start pb-7 sm:pb-9 lg:pb-11">
          ZapShift ensures fast, reliable parcel delivery with real-time
          tracking and seamless logistics for businesses and individuals.
        </p>
        <div className="border-b border-gray-200"></div>
        <div className="flex justify-between pt-5 pb-7 sm:pt-7 sm:pb-9 lg:pt-9 lg:pb-11 lg:max-w-3xl">
          {data.map((info, index) => (
            <button
              key={index}
              onClick={() => setSelect(info[0])}
              className={`text-lg cursor-pointer sm:text-xl md:text-2xl lg:text-3xl ${
                select === info[0] && "font-bold"
              }`}
            >
              {info[0]}
            </button>
          ))}
        </div>
        <div className="text-justify sm:text-lg">
          {select === "Story" && data[0][1]}
          {select === "Mission" && data[1][1]}
          {select === "Success" && data[2][1]}
          {select === "Team & Others" && data[3][1]}
        </div>
      </section>
    </>
  );
};

export default AboutUs;
