import { Link } from "react-router";
import social1 from "../../../assets/facebook.png";
import social2 from "../../../assets/instagram.png";
import social3 from "../../../assets/linkedin.png";
import social4 from "../../../assets/x.png";
import social5 from "../../../assets/youtube.png";
import logo from "../../../assets/logo.png";

const Footer = () => {
  const footerlinks = [
    "Services",
    "Coverage",
    "About Us",
    "Pricing",
    "BLog",
    "Contact",
  ];
  const sociallink = [social1, social2, social3, social4, social5];
  return (
    <div className="bg-secondary text-white mb-3 sm:mb-3.5 md:mb-4 lg:mb-4.5 max-w-7xl mx-auto w-[95%] lg:w-[97%] rounded-2xl">
      <div className="space-y-7 md:space-y-9 xl:space-y-11 p-7 pb-0 sm:p-9 sm:pb-7 md:p-11 md:pb-0 lg:p-13 lg:pb-0 xl:p-15 xl:pb-0">
        <Link to={"/"} className="flex justify-center items-end cursor-default">
          <img src={logo} alt="" className="h-[60px] lg:h-[70px]" />
          <h1 className="text-3xl font-bold -ml-5 lg:text-4xl">ZapShift</h1>
        </Link>
        <p className="text-center mx-auto md:w-[70%] lg:w-[60%]">
          Enjoy fast, reliable parcel delivery with real-time tracking and zero
          hassle. From personal packages to business shipments — we deliver on
          time, every time.
        </p>
        <div className="border-y border-dashed py-3 sm:py-4 md:py-5 lg:py-6 border-gray-100/35 grid grid-cols-3 text-center gap-1.5 md:flex md:justify-center md:gap-7 lg:gap-9 xl:gap-11">
          {footerlinks.map((link, index) => (
            <Link
              key={index}
              to={"/"}
              className="hover:underline active:underline"
            >
              {link}
            </Link>
          ))}
        </div>
        <div className="flex justify-center gap-3">
          {sociallink.map((social, index) => (
            <img
              key={index}
              src={social}
              alt=""
              className="h-9 cursor-pointer"
            />
          ))}
        </div>
      </div>
      <small className="block py-7 text-center">
        © 2025 ZapShift. All rights reserved.
      </small>
    </div>
  );
};

export default Footer;
