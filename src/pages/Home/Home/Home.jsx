import Benefits from "../Benefits";
import FAQ from "../FAQ";
import Hero from "../Hero";
import HowItWorks from "../HowItWorks";
import Marquee from "../Marquee";
import OurServices from "../OurServices";
import Reviews from "../Reviews";

const Home = () => {
  return (
    <div className="max-w-7xl mx-auto w-[95%] lg:w-[97%]">
      <Hero />
      <HowItWorks />
      <OurServices />
      <Marquee />
      <Reviews />
      <Benefits />
      <FAQ />
    </div>
  );
};

export default Home;
