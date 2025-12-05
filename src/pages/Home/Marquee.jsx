import Marquee from "react-fast-marquee";
import img1 from "../../assets/casio.png";
import img2 from "../../assets/amazon.png";
import img3 from "../../assets/moonstar.png";
import img4 from "../../assets/star.png";
import img5 from "../../assets/randstad.png";
import img6 from "../../assets/start-people.png";

const LogoMarquee = () => {
  const logos = [img1, img2, img3, img4, img5, img6];

  return (
    <section className="my-9 mb-13 sm:my-11 sm:mb-15 md:my-13 md:mb-17 lg:my-15 lg:mb-19 w-[90%] sm:w-[77%] max-w-5xl mx-auto">
      <div className="text-center mb-11 md:mb-15">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-secondary">
          We've helped thousands of sales teams
        </h2>
      </div>
      <div className="relative">
        <Marquee speed={40} gradient={false} pauseOnHover={true}>
          {logos.map((logo, index) => (
            <div
              key={index}
              className="mx-5 sm:mx-7 md:mx-10 flex items-center justify-center"
            >
              <img
                src={logo}
                alt="partner logo"
                className="h-5 sm:h-6 md:h-7 object-contain opacity-80 hover:opacity-100 transition-opacity duration-300"
              />
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
};

export default LogoMarquee;
