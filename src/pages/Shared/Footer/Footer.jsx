import { Link } from "react-router";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
  FaYoutube,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
} from "react-icons/fa";
import { IoEarthOutline } from "react-icons/io5";
import logo from "../../../assets/logo.png";

const Footer = () => {
  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "Track Order", path: "/track-order" },
    { name: "Coverage", path: "/coverage" },
    { name: "About Us", path: "/about-us" },
  ];
  const servicesLinks = [
    { name: "Send Parcel", path: "/dashboard/send-parcel" },
    { name: "My Parcels", path: "/dashboard/my-parcels" },
    { name: "Payment History", path: "/dashboard/payment-history" },
    { name: "Be a Rider", path: "/be-a-rider" },
  ];
  const companyLinks = [
    { name: "Sign In", path: "/signin" },
    { name: "Sign Up", path: "/signup" },
    { name: "Forgot Password", path: "/forgot-password" },
  ];
  const socialLinks = [
    { icon: <FaFacebookF />, name: "Facebook", path: "https://facebook.com" },
    { icon: <FaInstagram />, name: "Instagram", path: "https://instagram.com" },
    { icon: <FaLinkedinIn />, name: "LinkedIn", path: "https://linkedin.com" },
    { icon: <FaTwitter />, name: "Twitter", path: "https://twitter.com" },
    { icon: <FaYoutube />, name: "YouTube", path: "https://youtube.com" },
  ];
  return (
    <div className="bg-secondary text-white mb-3 sm:mb-3.5 md:mb-4 lg:mb-4.5 max-w-7xl mx-auto w-[95%] lg:w-[97%] rounded-2xl">
      <div className="space-y-7 md:space-y-9 xl:space-y-11 p-7 pb-0 sm:p-9 sm:pb-7 md:p-11 md:pb-0 lg:p-13 lg:pb-0 xl:p-15 xl:pb-0">
        <div className="text-center">
          <Link to="/" className="inline-flex items-end justify-center mb-4">
            <img
              src={logo}
              alt="ZapShift Logo"
              className="h-[60px] lg:h-[70px]"
            />
            <h1 className="text-3xl font-bold -ml-5 lg:text-4xl">ZapShift</h1>
          </Link>
          <p className="mx-auto md:w-[70%] lg:w-[60%] text-gray-200">
            Fast, reliable parcel delivery with real-time tracking. From
            personal packages to business shipments — we deliver on time, every
            time.
          </p>
        </div>
        <div className="max-w-7xl w-[95%] mx-auto lg:w-[97%]">
          <div className="grid grid-cols-1 gap-10 py-3 sm:grid-cols-2 lg:py-5 lg:grid-cols-4">
            <div>
              <h5 className="cursor-default text-xl font-semibold mb-4">
                Get Support
              </h5>
              <ul className="space-y-3 text-gray-200 text-sm">
                <li className="cursor-pointer flex items-center gap-1.5 hover:underline">
                  <FaMapMarkerAlt /> Dhanmondi, Dhaka
                </li>
                <li className="cursor-pointer flex items-center gap-1.5 hover:underline">
                  <FaPhoneAlt /> +8801990199709
                </li>
                <li className="cursor-pointer flex items-center gap-1.5 hover:underline">
                  <FaEnvelope /> support@zapshift.com
                </li>
                <li className="cursor-pointer flex items-center gap-1.5 hover:underline">
                  <IoEarthOutline /> www.zapshift.com
                </li>
              </ul>
            </div>
            <div>
              <h5 className="cursor-default text-xl font-semibold mb-4">
                About ZapShift
              </h5>
              <ul className="space-y-3 text-gray-200 text-sm">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <Link
                      to={link.path}
                      className="cursor-pointer hover:underline block"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h5 className="cursor-default text-xl font-semibold mb-4">
                Quick Links
              </h5>
              <ul className="space-y-3 text-gray-200 text-sm">
                {servicesLinks.map((link, index) => (
                  <li key={index}>
                    <Link
                      to={link.path}
                      className="cursor-pointer hover:underline block"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h5 className="cursor-default text-xl font-semibold mb-4">
                Company
              </h5>
              <ul className="space-y-3 text-gray-200 text-sm">
                {companyLinks.map((link, index) => (
                  <li key={index}>
                    <Link
                      to={link.path}
                      className="cursor-pointer hover:underline block"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="border-t border-dashed pb-5 pt-5 md:pt-6 lg:pt-7 border-gray-100/35">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex gap-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-primary hover:text-secondary transition-all duration-300"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
            <small className="text-gray-300 text-center md:text-right">
              © 2025 ZapShift. All rights reserved.
            </small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
