import { Link, Outlet } from "react-router";
import authimg from "../assets/auth-image.png";
import ScrollToTop from "../utility/ScrollToTop";

const AuthPage = () => {
  return (
    <>
      <ScrollToTop />
      <header></header>
      <main className="min-h-screen">
        <section className="min-h-screen flex">
          <div className="flex-1 min-h-screen bg-white">
            <div className="max-w-[640px] md:ml-auto h-full">
              <div className="fixed z-50 mt-3 sm:mt-3.5 md:mt-4 lg:mt-4.5 ml-auto w-[95%] lg:w-[97%] p-3.5 sm:p-4 md:p-4.5 lg:p-5">
                <Link to={"/"} className="flex items-end">
                  <img src="./Logo.png" alt="" />
                  <h1 className="text-2xl font-bold -ml-3.5">ZapShift</h1>
                </Link>
              </div>
              <div className="h-full w-screen md:w-full flex items-center justify-center">
                <Outlet />
              </div>
            </div>
          </div>
          <div className="hidden md:block flex-1 min-h-screen bg-[#fafdf0]">
            <div className="max-w-[640px] h-full flex items-center justify-center">
              <img src={authimg} alt="" />
            </div>
          </div>
        </section>
      </main>
      <footer></footer>
    </>
  );
};

export default AuthPage;
