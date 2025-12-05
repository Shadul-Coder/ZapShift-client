import Navbar from "../pages/Shared/Navbar/Navbar";
import { Outlet } from "react-router";
import Footer from "../pages/Shared/Footer/Footer";
import ScrollToTop from "../utility/ScrollToTop";

const Root = () => {
  return (
    <>
      <ScrollToTop />
      <header>
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
