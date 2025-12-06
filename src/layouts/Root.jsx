import Navbar from "../pages/Shared/Navbar/Navbar";
import { Outlet } from "react-router";
import Footer from "../pages/Shared/Footer/Footer";
import ScrollToTop from "../utility/ScrollToTop";

const Root = () => {
  return (
    <>
      <ScrollToTop />
      <header className="sticky top-3 sm:top-3.5 md:top-4 lg:top-4.5 z-70">
        <Navbar />
      </header>
      <main>
        <Outlet />
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
};

export default Root;
