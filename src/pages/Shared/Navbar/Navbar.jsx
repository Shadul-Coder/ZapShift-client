import { CgMenuRightAlt } from "react-icons/cg";
import { FaInfoCircle } from "react-icons/fa";
import { LuBadgeDollarSign, LuClipboardList } from "react-icons/lu";
import { PiMapPinAreaBold, PiPersonSimpleBikeBold } from "react-icons/pi";
import { Link, NavLink } from "react-router";
import useAuth from "../../../hooks/useAuth";

const Navbar = () => {
  const { user, signOutuser } = useAuth();
  const navlinks = [
    ["Services", "services", <LuClipboardList className="text-lg" />],
    ["Coverage", "coverage", <PiMapPinAreaBold className="text-lg" />],
    ["About Us", "about-us", <FaInfoCircle className="text-lg" />],
    ["Pricing", "pricing", <LuBadgeDollarSign className="text-lg" />],
    [
      "Be a Rider",
      "be-a-rider",
      <PiPersonSimpleBikeBold className="text-lg" />,
    ],
  ];
  const handleSignOut = () => {
    signOutuser().then().catch();
  };
  return (
    <>
      <nav className="bg-white mt-3 sm:mt-3.5 md:mt-4 lg:mt-4.5 max-w-7xl mx-auto w-[95%] lg:w-[97%] flex justify-between items-center rounded-2xl p-3.5 sm:p-4 md:p-4.5 lg:p-5">
        <Link to={"/"} className="flex items-end">
          <img src="./Logo.png" alt="" />
          <h1 className="text-2xl font-bold -ml-3.5">ZapShift</h1>
        </Link>
        <div className="hidden lg:block space-x-5 text-[#606060] font-medium">
          {navlinks.map((link, index) => (
            <NavLink
              key={index}
              to={`/${link[1]}`}
              className={"px-3 py-1.5 rounded-lg transition-all duration-300"}
            >
              {link[0]}
            </NavLink>
          ))}
        </div>
        <div>
          <div className="lg:hidden">
            <div className="drawer-content">
              <label htmlFor="drawer">
                <CgMenuRightAlt className="text-[27px]" />
              </label>
            </div>
          </div>
          <div className="hidden lg:block">
            {user ? (
              <span
                onClick={handleSignOut}
                className="border border-primary bg-primary hover:bg-[#c3e460] active:bg-[#bddc5c] text-secondary font-semibold px-4.5 py-2.5 rounded-xl cursor-pointer active:scale-99 duration-300 transition-all"
              >
                Sign Out
              </span>
            ) : (
              <>
                <Link
                  to={"/signin"}
                  className="border border-[#dadada] text-[#606060] hover:bg-[#F5F5F5] active:bg-[#EAEAEA] font-semibold px-4.5 py-2.5 rounded-xl cursor-pointer active:scale-99 duration-300 transition-all"
                >
                  Sign In
                </Link>
                <Link
                  to={"/signup"}
                  className="ml-2 border border-primary bg-primary hover:bg-[#c3e460] active:bg-[#bddc5c] text-secondary font-semibold px-4.5 py-2.5 rounded-xl cursor-pointer active:scale-99 duration-300 transition-all"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
      <div className="drawer drawer-end">
        <input id="drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-side z-9999">
          <label
            htmlFor="drawer"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <div className="bg-base-200 menu min-h-full w-55 p-4 sm:w-75">
            <div className="flex flex-col gap-1.5 sm:gap-2 text-[#606060] font-medium">
              {navlinks.map((link, index) => (
                <NavLink
                  key={index}
                  to={`/${link[1]}`}
                  className={
                    "px-5 py-3 rounded-xl flex items-center gap-3 transition-all duration-300"
                  }
                >
                  {link[2]} {link[0]}
                </NavLink>
              ))}
            </div>
            <div className="absolute bottom-4 flex flex-col gap-1.5 sm:gap-2">
              {user ? (
                <span
                  onClick={handleSignOut}
                  className="w-[188px] sm:w-[268px] border border-primary bg-primary hover:bg-[#c3e460] active:bg-[#bddc5c] text-secondary font-semibold px-4.5 py-2.5 rounded-xl cursor-pointer active:scale-99 duration-300 transition-all"
                >
                  Sign Out
                </span>
              ) : (
                <>
                  <Link
                    to={"/signin"}
                    className="w-[188px] sm:w-[268px] border border-[#dadada] text-[#606060] hover:bg-[#F5F5F5] active:bg-[#EAEAEA] font-semibold px-4.5 py-2.5 rounded-xl cursor-pointer active:scale-99 duration-300 transition-all"
                  >
                    Sign In
                  </Link>
                  <Link
                    to={"/signup"}
                    className="w-[188px] sm:w-[268px] border border-primary bg-primary hover:bg-[#c3e460] active:bg-[#bddc5c] text-secondary font-semibold px-4.5 py-2.5 rounded-xl cursor-pointer active:scale-99 duration-300 transition-all"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
